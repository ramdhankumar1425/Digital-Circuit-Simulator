import React, { memo } from "react";
import { Handle } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const NotGateNode = (props) => {
    const { handlePositions } = useCircuit();

    return (
        <div className="relative">
            {/* SVG for NOT gate */}
            <svg
                width="50"
                // To update the edge path on rotation (no other method found...)
                height={
                    props.data.rotation === 90 || props.data.rotation === 270
                        ? "50"
                        : "50.025"
                }
                viewBox="0 0 50 50"
                transform={`rotate(${props.data.rotation})`}
            >
                {/* Triangle for NOT gate */}
                <polygon
                    points="0,0 40,25 0,50"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Circle at the output */}
                <circle
                    cx="42"
                    cy="25"
                    r="4.5"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="in1"
                position={handlePositions.left[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
            />

            {/* Output handle */}
            <Handle
                type="source"
                id="out"
                position={handlePositions.right[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
            />
        </div>
    );
};

export default memo(NotGateNode);
