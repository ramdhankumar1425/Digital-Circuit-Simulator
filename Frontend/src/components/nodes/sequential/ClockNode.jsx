import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const ClockNode = (props) => {
    const { setNodes } = useCircuit();
    const [freq, setFreq] = useState(1);
    const [showToolbar, setShowToolbar] = useState(false);

    // Function to toogle b/w 0-1
    const handleToggleOutput = () => {
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
    };
    useEffect(() => {
        const interval = setInterval(() => {
            handleToggleOutput();
        }, 1000 / freq);

        return () => clearInterval(interval);
    }, [freq]);

    return (
        <div
            className="relative w-[50px] h-[50px]"
            onDoubleClick={() => setShowToolbar((prev) => !prev)}
        >
            {/* SVG */}
            <svg width="50" height="50" viewBox="0 0 50 50">
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
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
            />

            {/* Value */}
            <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium text-3xl">
                {props.data.outputs.out ? 1 : 0}
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
                        onChange={(e) =>
                            setFreq(
                                +e.target.value > 0 ? +e.target.value : freq
                            )
                        }
                        max={1000}
                        min={0.1}
                        className="block w-24 p-1 mt-1 border rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default ClockNode;
