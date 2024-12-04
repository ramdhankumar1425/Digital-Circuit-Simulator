import React, { memo } from "react";
import { useCircuit } from "../../../context/CircuitContext";
import { Handle } from "@xyflow/react";

const LEDNode = (props) => {
    const { handlePositions, handleLimitConnections } = useCircuit();

    return (
        <div className="relative">
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
        </div>
    );
};

export default memo(LEDNode);
