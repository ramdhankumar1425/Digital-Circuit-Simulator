import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Context for circuit
const CircuitContext = createContext();

const nodeRegistry = {
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
    ConstantInput: {
        category: "input",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 }),
    },
    CLK: {
        category: "clock",
        inputs: [{ name: "in1" }],
        outputs: [{ name: "out" }],
        logic: (inputs) => ({ out: inputs.in1 }),
    },
    LED: {
        category: "output",
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
                console.log("initialInputs:", initialInputs);
                console.log("initialOutputs:", initialOutputs);

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
