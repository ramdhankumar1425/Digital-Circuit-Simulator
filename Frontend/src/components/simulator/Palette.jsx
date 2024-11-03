import React, { useState } from "react";
import Draggable from "react-draggable";

const Palette = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };
    const [gatesOpen, setGatesOpen] = useState(false);
    const [inputsOpen, setInputsOpen] = useState(false);
    const [outputsOpen, setOutputsOpen] = useState(false);
    const [sequentialsOpen, setSequentialsOpen] = useState(false);

    return (
        <Draggable
            handle=".drag-handle"
            bounds="parent"
            defaultPosition={{ x: 10, y: 70 }}
        >
            <aside className="absolute w-40 h-fit py-2 px-1 text-center bg-gray-900 border-r border-gray-700 flex flex-col gap-1">
                <h1 className="text-gray-200 text-xl font-semibold font-sans cursor-pointer drag-handle">
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
                    {/* Clock */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "CLK")}
                        draggable
                    >
                        Clock
                    </div>
                    {/* D Flip Flop */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "DFlipFlop")}
                        draggable
                    >
                        D flip flop
                    </div>
                    {/* T Flip Flop */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) => onDragStart(event, "TFlipFlop")}
                        draggable
                    >
                        T flip flop
                    </div>
                    {/* JK Flip Flop */}
                    <div
                        className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
                        onDragStart={(event) =>
                            onDragStart(event, "JKFlipFlop")
                        }
                        draggable
                    >
                        JK flip flop
                    </div>
                </div>
            </aside>
        </Draggable>
    );
};

export default Palette;

{
    /* NOT Gate */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "NOTGate")}
    draggable
>
    NOT Gate
</div>;
{
    /* OR Gate */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "ORGate")}
    draggable
>
    OR Gate
</div>;
{
    /* AND Gate */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "ANDGate")}
    draggable
>
    AND Gate
</div>;
{
    /* NAND Gate */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "NANDGate")}
    draggable
>
    NAND Gate
</div>;
{
    /* NOR Gate */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "NORGate")}
    draggable
>
    NOR Gate
</div>;
{
    /* Constant Input */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "ConstantInput")}
    draggable
>
    Input
</div>;
{
    /* LED */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "CLK")}
    draggable
>
    Clock
</div>;
{
    /* LED */
}
<div
    className="p-2 text-center bg-gray-200 border rounded-md cursor-pointer shadow hover:bg-gray-300 hover:scale-105 duration-100"
    onDragStart={(event) => onDragStart(event, "LED")}
    draggable
>
    LED
</div>;
