import React from "react";
import { useCircuit } from "../../context/CircuitContext";
import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// Import Nodes and Edges
import NotGateNode from "../nodes/gates/NOTGateNode";
import WireEdge from "../edges/WireEdge";
import ConstantInputNode from "../nodes/inputs/ConstantInput";
import LEDNode from "../nodes/outputs/LEDNode";
import OrGateNode from "../nodes/gates/ORGateNode";
import AndGateNode from "../nodes/gates/ANDGateNode";
import ClockNode from "../nodes/sequential/ClockNode";
import NandGateNode from "../nodes/gates/NANDGateNode";
import NorGateNode from "../nodes/gates/NORGateNode";
import TffNode from "../nodes/sequential/TFFNode";
import JKFFNode from "../nodes/sequential/JKFFNode";
import DFFNode from "../nodes/sequential/DFFNode";

// Define NodeTypes and EdgeTypes
const nodeTypes = {
    NOTGate: NotGateNode,
    ORGate: OrGateNode,
    ANDGate: AndGateNode,
    NANDGate: NandGateNode,
    NORGate: NorGateNode,
    ConstantInput: ConstantInputNode,
    CLK: ClockNode,
    LED: LEDNode,
    TFlipFlop: TffNode,
    JKFlipFlop: JKFFNode,
    DFlipFlop: DFFNode,
};
const edgeTypes = {
    Wire: WireEdge,
};

function MainCanvas() {
    // Import circuit from CircuitContext
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDrop,
        onDragOver,
        onSelectionChange,
        onNodeDragStop,
    } = useCircuit();

    return (
        <div className="w-full grow bg-zinc-950">
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onSelectionChange={onSelectionChange}
                defaultEdgeOptions={{ type: "Wire" }}
                onNodeDragStop={onNodeDragStop}
                minZoom={0.1}
                maxZoom={3}
            >
                <Controls />
                <Background
                    id="1"
                    gap={25}
                    color="#384b49"
                    lineWidth={0.1}
                    offset={0}
                    variant={BackgroundVariant.Lines}
                />
            </ReactFlow>
        </div>
    );
}

export default MainCanvas;
