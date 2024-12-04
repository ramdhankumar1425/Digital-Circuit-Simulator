import React, { memo, useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const ClockNode = (props) => {
    const {
        setNodes,
        handlePositions,
        freqBounds,
        handleNodeNameChange,
        theme,
    } = useCircuit();
    const [showToolbar, setShowToolbar] = useState(false);
    const [freq, setFreq] = useState(1);

    // Function to toogle b/w 0-1
    const handleToggleOutput = useCallback(() => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id == props.id
                    ? {
                          ...node,
                          data: {
                              ...node.data,
                              outputs: {
                                  ...node.data.outputs,
                                  out: !node.data.outputs.out,
                              },
                              freq,
                          },
                      }
                    : node
            )
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (+freq != 0) handleToggleOutput();
        }, 1000 / freq);

        return () => clearInterval(interval);
    }, [freq]);

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

            {/* Output handle */}
            <Handle
                type="source"
                id="out"
                position={handlePositions.right[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
            />

            {/* Value */}
            <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium text-3xl">
                {props.data.outputs.out ? 1 : 0}
            </p>

            {/* Name */}
            <p
                className={`absolute left-1/2 -translate-x-1/2 ${
                    props?.data?.rotation == 90 ? "bottom-[105%]" : "top-[105%]"
                } font-semibold text-base ${
                    theme == "dark" ? "text-gray-200" : "text-gray-800"
                }`}
            >
                {props.data?.name}
            </p>

            {/* Toolbar to change frequency */}
            {showToolbar && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white p-2 w-fit shadow-lg rounded">
                    <label className="text-sm font-semibold">
                        Frequency (Hz)
                    </label>
                    <input
                        type="text"
                        value={freq}
                        onChange={(e) => {
                            const inputValue = e.target.value;

                            if (
                                /^\d*\.?\d*$/.test(inputValue) &&
                                inputValue >= freqBounds.min &&
                                inputValue <= freqBounds.max
                            ) {
                                setFreq(inputValue);
                            }
                        }}
                        className="block w-24 p-1 mt-1 border rounded"
                    />
                    <label className="text-sm font-semibold">Name:</label>
                    <input
                        type="text"
                        value={props.data?.name}
                        onChange={(e) =>
                            handleNodeNameChange(props.id, e.target.value)
                        }
                        className="block w-24 p-1 mt-1 border rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default memo(ClockNode);
