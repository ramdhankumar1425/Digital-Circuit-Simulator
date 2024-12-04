import React, { useState } from "react";
import { Handle } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const OutputNode = (props) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const { handleNodeNameChange, handlePositions, theme } = useCircuit();

    return (
        <div
            className="relative"
            onDoubleClick={() => setShowToolbar((prev) => !prev)}
        >
            {/* SVG */}
            <svg
                width="50"
                height={
                    props.data.rotation === 90 || props.data.rotation === 270
                        ? "50"
                        : "50.025"
                }
                transform={`rotate(${props.data.rotation})`}
                viewBox="0 0 50 50"
            >
                <polygon
                    points="0,0 0,50 50,50 50,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="in1"
                position={handlePositions.left[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
            />

            {/* Value */}
            <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-semibold text-2xl">
                {props.data?.inputs?.in1 ? 1 : 0}
            </p>

            {/* Name */}
            <p
                className={`absolute left-1/2 -translate-x-1/2 ${
                    props?.data?.rotation == 270
                        ? "bottom-[105%]"
                        : "top-[105%]"
                } font-semibold text-base ${
                    theme == "dark" ? "text-gray-200" : "text-gray-800"
                }`}
            >
                {props.data?.name}
            </p>

            {/* Toolbar to change name */}
            {showToolbar && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white p-2 w-fit shadow-lg rounded">
                    <label className="text-sm font-semibold">Name:</label>
                    <input
                        type="text"
                        value={props.data?.name}
                        onChange={(e) => {
                            handleNodeNameChange(props.id, e.target.value);
                        }}
                        className="block w-24 p-1 mt-1 border rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default OutputNode;
