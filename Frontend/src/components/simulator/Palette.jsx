import React, { useState } from "react";
import Draggable from "react-draggable";

const Palette = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };
    const [inputsOpen, setInputsOpen] = useState(false);
    const [outputsOpen, setOutputsOpen] = useState(false);
    const [gatesOpen, setGatesOpen] = useState(false);
    const [combinationalOpen, setCombinationalOpen] = useState(false);
    const [sequentialsOpen, setSequentialsOpen] = useState(false);

    return (
        <Draggable
            handle=".drag-handle"
            bounds="parent"
            defaultPosition={{ x: 10, y: 70 }}
        >
            <aside className="absolute w-40 h-fit py-2 text-center bg-gray-900 border-r border-gray-700 flex flex-col gap-1">
                <h1 className="text-gray-200 text-xl font-semibold font-sans cursor-move drag-handle">
                    Components
                    <hr className="my-1" />
                </h1>
                {/* Inputs */}
                <p
                    className="text-gray-300 bg-gray-700 hover:bg-gray-600 duration-100 px-3 py-2 cursor-pointer"
                    onClick={() => setInputsOpen((prev) => !prev)}
                >
                    Inputs
                </p>
                <div
                    className="w-full flex flex-col gap-2 px-1 overflow-hidden duration-150"
                    style={inputsOpen ? { height: "auto" } : { height: "0px" }}
                >
                    {/* Constant Input */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "ConstantInput")
                        }
                        draggable
                    >
                        Input
                    </div>
                </div>
                {/* Outputs */}
                <p
                    className="text-gray-300 bg-gray-700 hover:bg-gray-600 duration-100 px-3 py-2 cursor-pointer"
                    onClick={() => setOutputsOpen((prev) => !prev)}
                >
                    Outputs
                </p>
                <div
                    className="w-full flex flex-col gap-2 px-1 overflow-hidden duration-150"
                    style={outputsOpen ? { height: "auto" } : { height: "0px" }}
                >
                    {/* LED */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "LED")}
                        draggable
                    >
                        LED
                    </div>
                    {/* Seven Segment Display */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "SevenSegmentDisplay")
                        }
                        draggable
                    >
                        7 Segment Display
                    </div>
                </div>
                {/* Gates */}
                <p
                    className="text-gray-300 bg-gray-700 hover:bg-gray-600 duration-100 px-3 py-2 cursor-pointer"
                    onClick={() => setGatesOpen((prev) => !prev)}
                >
                    Gates
                </p>
                <div
                    className="w-full flex flex-col gap-2 px-1 overflow-hidden duration-150"
                    style={gatesOpen ? { height: "auto" } : { height: "0px" }}
                >
                    {/* NOT Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "NOTGate")}
                        draggable
                    >
                        NOT Gate
                    </div>
                    {/* OR Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "ORGate")}
                        draggable
                    >
                        OR Gate
                    </div>
                    {/* AND Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "ANDGate")}
                        draggable
                    >
                        AND Gate
                    </div>
                    {/* NAND Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "NANDGate")}
                        draggable
                    >
                        NAND Gate
                    </div>
                    {/* NOR Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "NORGate")}
                        draggable
                    >
                        NOR Gate
                    </div>
                    {/* XOR Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "XORGate")}
                        draggable
                    >
                        XOR Gate
                    </div>
                    {/* XNOR Gate */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "XNORGate")}
                        draggable
                    >
                        XNOR Gate
                    </div>
                </div>
                {/* Combinational */}
                <p
                    className="text-gray-300 bg-gray-700 hover:bg-gray-600 duration-100 px-3 py-2 cursor-pointer"
                    onClick={() => setCombinationalOpen((prev) => !prev)}
                >
                    Combinational
                </p>
                <div
                    className="w-full flex flex-col gap-2 px-1 overflow-hidden duration-150"
                    style={
                        combinationalOpen
                            ? { height: "auto" }
                            : { height: "0px" }
                    }
                >
                    {/* Half Adder */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "HalfAdder")}
                        draggable
                    >
                        Half Adder
                    </div>
                    {/* Full Adder */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "FullAdder")}
                        draggable
                    >
                        Full Adder
                    </div>
                    {/* FourBitFullAdder */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "FourBitFullAdder")
                        }
                        draggable
                    >
                        4 bit Adder
                    </div>
                    {/* TwoToOneMUX */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "TwoToOneMUX")
                        }
                        draggable
                    >
                        2 to 1 MUX
                    </div>
                    {/* FourToOneMUX */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "FourToOneMUX")
                        }
                        draggable
                    >
                        4 to 1 MUX
                    </div>
                    {/* EightToOneMUX */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "EightToOneMUX")
                        }
                        draggable
                    >
                        8 to 1 MUX
                    </div>
                    {/* BCDTo7SegmentDecoder */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "BCDTo7SegmentDecoder")
                        }
                        draggable
                    >
                        BCD to 7segment
                    </div>
                </div>
                {/* Sequentials */}
                <p
                    className="text-gray-300 bg-gray-700 hover:bg-gray-600 duration-100 px-3 py-2 cursor-pointer"
                    onClick={() => setSequentialsOpen((prev) => !prev)}
                >
                    Sequentials
                </p>
                <div
                    className="w-full flex flex-col gap-2 px-1 overflow-hidden duration-150"
                    style={
                        sequentialsOpen ? { height: "auto" } : { height: "0px" }
                    }
                >
                    <p className="text-gray-200">Coming soon...</p>
                    {/* Clock */}
                    {/* <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "CLK")}
                        draggable
                    >
                        Clock
                    </div> */}
                    {/* D Flip Flop */}
                    {/* <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "DFlipFlop")}
                        draggable
                    >
                        D flip flop
                    </div> */}
                    {/* T Flip Flop */}
                    {/* <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "TFlipFlop")}
                        draggable
                    >
                        T flip flop
                    </div> */}
                    {/* JK Flip Flop */}
                    {/* <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "JKFlipFlop")
                        }
                        draggable
                    >
                        JK flip flop
                    </div> */}
                </div>
            </aside>
        </Draggable>
    );
};

export default Palette;
