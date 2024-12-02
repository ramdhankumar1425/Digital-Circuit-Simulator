import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { nodeRegistry, useCircuit } from "../context/CircuitContext";
import { useAuth } from "../context/AuthContext";
// Import components
import MainCanvas from "../components/simulator/MainCanvas";
import Palette from "../components/simulator/Palette";
import Toolbar from "../components/simulator/Toolbar";

function Simulator() {
    const { handleGetCircuit } = useAuth();
    const { setNodes, setEdges, clearCircuit } = useCircuit();
    const { circuitId } = useParams();

    useEffect(() => {
        function scrollToMain() {
            const headerHeight = 64;
            setTimeout(() => {
                window.scrollTo({
                    top: headerHeight,
                    behavior: "smooth",
                });
            }, 1000);
        }
        async function setCircuit() {
            let circuit = await handleGetCircuit(circuitId);
            circuit = JSON.parse(circuit.data);

            const edges = circuit.edges;

            const nodes = circuit.nodes.map((node) => {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        logic: nodeRegistry[node.type].logic,
                    },
                };
            });

            setNodes(nodes);
            setEdges(edges);
        }

        // scrollToMain();
        if (circuitId) setCircuit();

        return () => clearCircuit();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden relative">
            <MainCanvas />
            <Palette />
            <Toolbar />
        </div>
    );
}

export default Simulator;
