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
import WireEdge from "../edges/WireEdge";
import NotGateNode from "../nodes/gates/NOTGateNode";
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
import XorGateNode from "../nodes/gates/XORGateNode";
import XnorGateNode from "../nodes/gates/XNORGateNode";
import SevenSegmentDisplayNode from "../nodes/outputs/SevenSegmentDisplay";
import HalfAdderNode from "../nodes/combinational/HalfAdderNode";
import FullAdderNode from "../nodes/combinational/FullAdderNode";
import FourBitFullAdderNode from "../nodes/combinational/FourBitFullAdderNode";
import TwoToOneMuxNode from "../nodes/combinational/TwoToOneMUXNode";
import FourToOneMuxNode from "../nodes/combinational/FourToOneMUXNode";
import EightToOneMuxNode from "../nodes/combinational/EightToOneMUXNode";
import BCDTo7SegmentDecoderNode from "../nodes/combinational/BCDTo7SegmentDecoderNode";

// Define NodeTypes and EdgeTypes
const nodeTypes = {
    // Inputs
    ConstantInput: ConstantInputNode,
    // Outputs
    LED: LEDNode,
    SevenSegmentDisplay: SevenSegmentDisplayNode,
    // Gates
    NOTGate: NotGateNode,
    ORGate: OrGateNode,
    ANDGate: AndGateNode,
    NANDGate: NandGateNode,
    NORGate: NorGateNode,
    XORGate: XorGateNode,
    XNORGate: XnorGateNode,
    // Combinationals
    HalfAdder: HalfAdderNode,
    FullAdder: FullAdderNode,
    FourBitFullAdder: FourBitFullAdderNode,
    TwoToOneMUX: TwoToOneMuxNode,
    FourToOneMUX: FourToOneMuxNode,
    EightToOneMUX: EightToOneMuxNode,
    BCDTo7SegmentDecoder: BCDTo7SegmentDecoderNode,
    // Sequentials
    CLK: ClockNode,
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
        <div className="w-full grow bg-zinc-900">
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
                maxZoom={4}
                fitView
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
