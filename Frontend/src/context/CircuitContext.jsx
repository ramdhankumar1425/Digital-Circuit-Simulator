import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Context for circuit
const CircuitContext = createContext();

const nodeRegistry = {
    // Inputs
    ConstantInput: {
        category: "input",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 }),
    },
    // Outputs
    LED: {
        category: "output",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 }),
    },
    SevenSegmentDisplay: {
        category: "display",
        inputs: [
            { name: "a" },
            { name: "b" },
            { name: "c" },
            { name: "d" },
            { name: "e" },
            { name: "f" },
            { name: "g" },
            { name: "dp" },
        ],
        outputs: [
            { name: "a" },
            { name: "b" },
            { name: "c" },
            { name: "d" },
            { name: "e" },
            { name: "f" },
            { name: "g" },
            { name: "dp" },
        ],
        logic: (inputs) => ({
            a: inputs.a || false,
            b: inputs.b || false,
            c: inputs.c || false,
            d: inputs.d || false,
            e: inputs.e || false,
            f: inputs.f || false,
            g: inputs.g || false,
            dp: inputs.dp || false,
        }),
    },
    // Gates
    NOTGate: {
        category: "gate",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: !inputs.in1 }),
    },
    ANDGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 && inputs.in2 }),
    },
    ORGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 || inputs.in2 }),
    },
    NANDGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: !(inputs.in1 && inputs.in2) }),
    },
    NORGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: !(inputs.in1 || inputs.in2) }),
    },
    XORGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 !== inputs.in2 }),
    },
    XNORGate: {
        category: "gate",
        inputs: [{ name: "in1" }, { name: "in2" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 === inputs.in2 }),
    },
    // Combinationals
    HalfAdder: {
        category: "adder",
        inputs: [{ name: "A" }, { name: "B" }],
        outputs: [{ name: "S" }, { name: "C" }],
        logic: (inputs) => ({
            S: inputs.A !== inputs.B,
            C: inputs.A && inputs.B,
        }),
    },
    FullAdder: {
        category: "adder",
        inputs: [{ name: "A" }, { name: "B" }, { name: "Cin" }],
        outputs: [{ name: "S" }, { name: "Cout" }],
        logic: (inputs) => {
            const sum = (inputs.A !== inputs.B) !== inputs.Cin;
            const carryOut =
                (inputs.A && inputs.B) ||
                (inputs.B && inputs.Cin) ||
                (inputs.A && inputs.Cin);
            return { S: sum, Cout: carryOut };
        },
    },
    FourBitFullAdder: {
        category: "adder",
        inputs: [
            { name: "A0" },
            { name: "A1" },
            { name: "A2" },
            { name: "A3" },
            { name: "B0" },
            { name: "B1" },
            { name: "B2" },
            { name: "B3" },
            { name: "Cin" },
        ],
        outputs: [
            { name: "S0" },
            { name: "S1" },
            { name: "S2" },
            { name: "S3" },
            { name: "Cout" },
        ],
        logic: (inputs) => {
            let carry = inputs.Cin;
            const sum = [];

            for (let i = 0; i < 4; i++) {
                const A = inputs[`A${i}`];
                const B = inputs[`B${i}`];
                sum[i] = (A !== B) !== carry;
                carry = (A && B) || (A && carry) || (B && carry);
            }

            return {
                S0: sum[0],
                S1: sum[1],
                S2: sum[2],
                S3: sum[3],
                Cout: carry,
            };
        },
    },
    TwoToOneMUX: {
        category: "mux",
        inputs: [{ name: "D0" }, { name: "D1" }, { name: "S" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({
            out: inputs.S ? inputs.D1 : inputs.D0,
        }),
    },
    FourToOneMUX: {
        category: "mux",
        inputs: [
            { name: "D0" },
            { name: "D1" },
            { name: "D2" },
            { name: "D3" },
            { name: "S0" },
            { name: "S1" },
        ],
        outputs: [{ name: "out" }],
        logic: (inputs) => {
            const select = (inputs.S1 << 1) | inputs.S0;
            return {
                out: [inputs.D0, inputs.D1, inputs.D2, inputs.D3][select],
            };
        },
    },
    EightToOneMUX: {
        category: "mux",
        inputs: [
            { name: "D0" },
            { name: "D1" },
            { name: "D2" },
            { name: "D3" },
            { name: "D4" },
            { name: "D5" },
            { name: "D6" },
            { name: "D7" },
            { name: "S0" },
            { name: "S1" },
            { name: "S2" },
        ],
        outputs: [{ name: "out" }],
        logic: (inputs) => {
            const select = (inputs.S2 << 2) | (inputs.S1 << 1) | inputs.S0;
            return {
                out: [
                    inputs.D0,
                    inputs.D1,
                    inputs.D2,
                    inputs.D3,
                    inputs.D4,
                    inputs.D5,
                    inputs.D6,
                    inputs.D7,
                ][select],
            };
        },
    },
    BCDTo7SegmentDecoder: {
        category: "decoder",
        inputs: [
            { name: "A3" },
            { name: "A2" },
            { name: "A1" },
            { name: "A0" },
        ],
        outputs: [
            { name: "a" },
            { name: "b" },
            { name: "c" },
            { name: "d" },
            { name: "e" },
            { name: "f" },
            { name: "g" },
        ],
        logic: (inputs) => {
            const A3 = inputs.A3;
            const A2 = inputs.A2;
            const A1 = inputs.A1;
            const A0 = inputs.A0;

            const segmentMap = {
                0: {
                    a: true,
                    b: true,
                    c: true,
                    d: true,
                    e: true,
                    f: true,
                    g: false,
                },
                1: {
                    a: false,
                    b: true,
                    c: true,
                    d: false,
                    e: false,
                    f: false,
                    g: false,
                },
                2: {
                    a: true,
                    b: true,
                    c: false,
                    d: true,
                    e: true,
                    f: false,
                    g: true,
                },
                3: {
                    a: true,
                    b: true,
                    c: true,
                    d: true,
                    e: false,
                    f: false,
                    g: true,
                },
                4: {
                    a: false,
                    b: true,
                    c: true,
                    d: false,
                    e: false,
                    f: true,
                    g: true,
                },
                5: {
                    a: true,
                    b: false,
                    c: true,
                    d: true,
                    e: false,
                    f: true,
                    g: true,
                },
                6: {
                    a: true,
                    b: false,
                    c: true,
                    d: true,
                    e: true,
                    f: true,
                    g: true,
                },
                7: {
                    a: true,
                    b: true,
                    c: true,
                    d: false,
                    e: false,
                    f: false,
                    g: false,
                },
                8: {
                    a: true,
                    b: true,
                    c: true,
                    d: true,
                    e: true,
                    f: true,
                    g: true,
                },
                9: {
                    a: true,
                    b: true,
                    c: true,
                    d: true,
                    e: false,
                    f: true,
                    g: true,
                },
            };

            const inputValue = (A3 << 3) | (A2 << 2) | (A1 << 1) | A0;

            return (
                segmentMap[inputValue] || {
                    a: false,
                    b: false,
                    c: false,
                    d: false,
                    e: false,
                    f: false,
                    g: false,
                }
            );
        },
    },
    // Sequentials
    CLK: {
        category: "clock",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 }),
    },
    TFlipFlop: {
        category: "flip-flop",
        inputs: [{ name: "T" }, { name: "CLK" }],
        outputs: [{ name: "Q" }, { name: "Q_not" }],
        state: { Q: false },
        logic: function (inputs) {
            const { T, CLK } = inputs;

            if (CLK && this.lastClockState === false) {
                if (T) {
                    this.state.Q = !this.state.Q;
                }
            }
            this.lastClockState = CLK;

            return {
                Q: this.state.Q,
                Q_not: !this.state.Q,
            };
        },
        lastClockState: false,
    },
    JKFlipFlop: {
        category: "flip-flop",
        inputs: [{ name: "J" }, { name: "K" }, { name: "CLK" }],
        outputs: [{ name: "Q" }, { name: "Q_not" }],
        state: { Q: false },
        logic: function (inputs) {
            const { J, K, CLK } = inputs;

            if (CLK && this.lastClockState === false) {
                if (J && !K) {
                    this.state.Q = true; // Set
                } else if (!J && K) {
                    this.state.Q = false; // Reset
                } else if (J && K) {
                    this.state.Q = !this.state.Q;
                }
            }
            this.lastClockState = CLK;

            return {
                Q: this.state.Q,
                Q_not: !this.state.Q,
            };
        },
        lastClockState: false,
    },
    DFlipFlop: {
        category: "flip-flop",
        inputs: [{ name: "D" }, { name: "CLK" }],
        outputs: [{ name: "Q" }, { name: "Q_not" }],
        state: { Q: false },
        logic: function (inputs) {
            const { D, CLK } = inputs;

            if (CLK && this.lastClockState === false) {
                this.state.Q = D;
            }
            this.lastClockState = CLK;

            return {
                Q: this.state.Q,
                Q_not: !this.state.Q,
            };
        },
        lastClockState: false,
    },
};

// Circuit Provider for "CircuitContext"
export const CircuitProvider = ({ children }) => {
    // Circuit state variables
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);
    const [copiedNodes, setCopiedNodes] = useState([]);
    const [copiedEdges, setCopiedEdges] = useState([]);

    // Handle positions for nodes based on rotation state
    const handlePositions = {
        // default positions
        top: {
            // rotation
            0: Position.Top,
            90: Position.Right,
            180: Position.Bottom,
            270: Position.Left,
        },
        bottom: {
            0: Position.Bottom,
            90: Position.Left,
            180: Position.Top,
            270: Position.Right,
        },
        left: {
            0: Position.Left,
            90: Position.Top,
            180: Position.Right,
            270: Position.Bottom,
        },
        right: {
            0: Position.Right,
            90: Position.Bottom,
            180: Position.Left,
            270: Position.Top,
        },
    };

    // Functions to handle Canvas change
    // For any change in nodes
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    // For any change in edges
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    // For new edge creation
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        data: {
                            value: 0,
                        },
                    },
                    eds
                )
            ),
        [nodes]
    );
    // For new node creation
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = event.target.getBoundingClientRect();
            const nodeType = event.dataTransfer.getData(
                "application/reactflow"
            );

            const position = {
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            };

            const config = nodeRegistry[nodeType];
            if (!config) return;

            setNodes((nds) => {
                const initialInputs = Object.fromEntries(
                    config.inputs.map((input) => [input.name, false])
                );
                const initialOutputs = config.logic(initialInputs);

                if (config.category === "flip-flop") {
                    const state = config.state;
                    const newNode = {
                        id: `${nodeType}-${+new Date()}`,
                        type: nodeType,
                        position,
                        data: {
                            label: nodeType,
                            inputs: initialInputs,
                            outputs: initialOutputs,
                            logic: config.logic,
                            state,
                            rotation: 0,
                        },
                    };
                    return nds.concat(newNode);
                } else {
                    const newNode = {
                        id: `${nodeType}-${+new Date()}`,
                        type: nodeType,
                        position,
                        data: {
                            label: nodeType,
                            inputs: initialInputs,
                            outputs: initialOutputs,
                            logic: config.logic,
                            rotation: 0,
                        },
                    };

                    return nds.concat(newNode);
                }
            });
        },
        [setNodes]
    );
    // To handle dropping of nodes from palette
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);
    // Function to handle node and edge selection
    const onSelectionChange = useCallback((params) => {
        const selected_nodes = params.nodes.map((node) => node.id);
        const selected_edges = params.edges.map((edge) => edge.id);

        setSelectedNodes(selected_nodes);
        setSelectedEdges(selected_edges);
    }, []);
    // Function to delete selected nodes and edges
    const onDelete = useCallback(() => {
        const newNodes = nodes.filter(
            (node) => !selectedNodes.includes(node.id)
        );
        const newEdges = edges.filter(
            (edge) => !selectedEdges.includes(edge.id)
        );
        setNodes(newNodes);
        setEdges(newEdges);
    }, [nodes, edges, selectedNodes, selectedEdges]);
    // Function to copy selected nodes and edges
    const onCopy = () => {
        setCopiedNodes(selectedNodes);
        setCopiedEdges(selectedEdges);
    };
    // Function to paste copied nodes and edges
    const onPaste = () => {
        const oldNodes = copiedNodes.map((copiedNodeId) =>
            nodes.find((node) => node.id == copiedNodeId)
        );
        const oldEdges = copiedEdges.map((copiedEdgeId) =>
            edges.find((edge) => edge.id == copiedEdgeId)
        );

        const oldVSNewNodes = [];
        const newNodes = oldNodes.map((oldNode) => {
            const oldId = oldNode.id;
            const newId = `${oldNode.type}-${+new Date()}`;

            oldVSNewNodes.push({ oldId, newId });

            return {
                ...oldNode,
                position: {
                    x: oldNode.position.x + 100,
                    y: oldNode.position.y + 100,
                },
                id: newId,
            };
        });

        const newEdges = oldEdges.map((oldEdge) => {
            const newTargetNodeId = oldVSNewNodes.find(
                (oldVSNewNode) => oldVSNewNode.oldId == oldEdge.target
            )?.newId;
            const newSourceNodeId = oldVSNewNodes.find(
                (oldVSNewNode) => oldVSNewNode.oldId == oldEdge.source
            )?.newId;

            return {
                ...oldEdge,
                id: oldEdge.id + `copy-${+new Date()}`,
                target: newTargetNodeId ? newTargetNodeId : oldEdge.target,
                source: newSourceNodeId ? newSourceNodeId : oldEdge.source,
            };
        });

        setNodes((nds) => nds.concat(newNodes));
        setEdges((eds) => eds.concat(newEdges));

        setCopiedNodes([]);
        setCopiedEdges([]);
    };
    // Function to handle node rotation
    const handleNodeRotation = () => {
        setNodes((nds) =>
            nds.map((node) =>
                selectedNodes.includes(node.id)
                    ? {
                          ...node,
                          data: {
                              ...node.data,
                              rotation: (node?.data?.rotation + 90) % 360,
                          },
                          measured: {
                              ...node.measured,
                              width: node.measured.width + 1,
                          },
                      }
                    : node
            )
        );
    };
    // Keydown event to handle key presses
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Delete") {
                onDelete();
            } else if (
                event.ctrlKey &&
                (event.key === "C" || event.key === "c")
            ) {
                onCopy();
            } else if (
                event.ctrlKey &&
                (event.key === "V" || event.key === "v")
            ) {
                onPaste();
            } else if (event.key === "R" || event.key === "r") {
                handleNodeRotation();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onDelete, onCopy, onPaste]);
    // To snap nodes to background grid
    const onNodeDragStop = (event, node) => {
        const gridSize = 25;
        const snappedX = Math.round(node.position.x / gridSize) * gridSize;
        const snappedY = Math.round(node.position.y / gridSize) * gridSize;

        setNodes((nds) =>
            nds.map((nd) =>
                nd.id == node.id
                    ? { ...nd, position: { x: snappedX, y: snappedY } }
                    : nd
            )
        );
    };
    // To retrieve circuit saved in local storage
    useEffect(() => {
        // localStorage.removeItem("circuit");
        const savedCircuit = localStorage.getItem("circuit");

        if (savedCircuit !== null) {
            const circuit = JSON.parse(savedCircuit);
            // logic funtion needs to redefined as localstorage can't store functions
            const nds = circuit.nodes.map((node) => {
                const config = nodeRegistry[node.type];
                if (!config) return;

                return {
                    ...node,
                    data: {
                        ...node.data,
                        logic: config.logic,
                    },
                };
            });

            setNodes(nds);
            setEdges(circuit.edges);
        }
    }, []);
    // To store circuit in local storage
    useEffect(() => {
        // Save nodes and edges
        const circuit = {
            nodes,
            edges,
        };

        localStorage.setItem("circuit", JSON.stringify(circuit));
        // localStorage.removeItem("circuit");
    }, [nodes, edges]);

    // Values to export
    const value = useMemo(
        () => ({
            nodes,
            edges,
            onNodesChange,
            onEdgesChange,
            onConnect,
            onDrop,
            onDragOver,
            onSelectionChange,
            onNodeDragStop,
            selectedNodes,
            selectedEdges,
            setNodes,
            setEdges,
            handlePositions,
        }),
        [
            nodes,
            edges,
            selectedNodes,
            selectedEdges,
            onNodesChange,
            onEdgesChange,
            onConnect,
            onDrop,
            onSelectionChange,
            onNodeDragStop,
            handlePositions,
        ]
    );

    return (
        <CircuitContext.Provider value={value}>
            {children}
        </CircuitContext.Provider>
    );
};

// Custom hook to use circuit everywhere
export const useCircuit = () => {
    return useContext(CircuitContext);
};
