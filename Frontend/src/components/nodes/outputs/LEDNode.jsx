import React, { memo, useState } from "react";
import { useCircuit } from "../../../context/CircuitContext";
import { Handle } from "@xyflow/react";

const LEDNode = (props) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const {
        handlePositions,
        handleLimitConnections,
        theme,
        handleNodeNameChange,
    } = useCircuit();

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
                <path
                    d="M45 25
                       C45 18, 40 13, 33 13
                       C28 13, 24 15, 21 19
                       L16 19
                       V31
                       L21 31
                       C24 35, 28 37, 33 37
                       C40 37, 45 32, 45 25
                       Z
                       M 16 25 L 0 25"
                    fill={props.data?.outputs?.out == 1 ? "yellow" : "#333333"}
                    stroke="black"
                    strokeWidth="0.6"
                />
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="in1"
                position={handlePositions.left[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "in1",
                    1
                )}
            />

            {/* Name */}
            <p
                className={`absolute left-1/2 -translate-x-1/2 ${
                    props?.data?.rotation == 270 ? "bottom-[95%]" : "top-[85%]"
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

export default memo(LEDNode);
