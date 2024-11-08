import React from "react";
import { Handle } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const ConstantInputNode = (props) => {
    const { setNodes, handlePositions } = useCircuit();

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
                          },
                      }
                    : node
            )
        );
    };

    return (
        <div className="relative" onClick={handleToggleOutput}>
            {/* SVG */}
            <svg
                width="50"
                height={
                    props.data.rotation === 90 || props.data.rotation === 270
                        ? "50"
                        : "50.025"
                }
                viewBox="0 0 50 50"
                transform={`rotate(${props.data.rotation})`}
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
            <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-semibold text-2xl">
                {props.data.outputs.out ? 1 : 0}
            </p>
        </div>
    );
};

export default ConstantInputNode;
