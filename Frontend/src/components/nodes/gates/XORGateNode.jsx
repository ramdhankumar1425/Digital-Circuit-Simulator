import React, { memo, useMemo } from "react";
import { Handle } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const XorGateNode = (props) => {
    const { handlePositions } = useCircuit();
    const rotation = useMemo(() => props.data.rotation, [props.data.rotation]);

    // Calculate dynamic handle positions
    const handleStyles = useMemo(() => {
        return {
            in1: {
                ...(rotation === 0 && { top: "13px" }),
                ...(rotation === 90 && { left: "13px" }),
                ...(rotation === 180 && { top: "13px" }),
                ...(rotation === 270 && { left: "13px" }),
            },
            in2: {
                ...(rotation === 0 && { top: "37px" }),
                ...(rotation === 90 && { left: "37px" }),
                ...(rotation === 180 && { top: "37px" }),
                ...(rotation === 270 && { left: "37px" }),
            },
            out: {
                ...(rotation === 0 && { top: "25px" }),
                ...(rotation === 90 && { left: "25px" }),
                ...(rotation === 180 && { top: "25px" }),
                ...(rotation === 270 && { left: "25px" }),
            },
        };
    }, [rotation]);

    return (
        <div className="relative">
            {/* SVG */}
            <svg
                width="50"
                height={rotation === 90 || rotation === 270 ? "50" : "50.025"}
                style={{ transform: `rotate(${rotation}deg)` }}
                viewBox="0 0 50 50"
            >
                <path
                    d="M 5 1 C 5 1, 25 1, 50 25 C 50 25, 25 49, 5 49 C 5 49, 20 25, 5 1"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                />
                <path
                    d="M 0 1 C 0 1, 15 25, 0 49"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
            </svg>

            {/* Input handle on the left side */}
            <Handle
                type="target"
                id="in1"
                position={handlePositions.left[rotation]}
                className="bg-[#555] hover:bg-green-500 absolute"
                style={handleStyles.in1}
            />
            <Handle
                type="target"
                id="in2"
                position={handlePositions.left[rotation]}
                className="bg-[#555] hover:bg-green-500 absolute"
                style={handleStyles.in2}
            />

            {/* Output handle on the right side */}
            <Handle
                type="source"
                id="out"
                position={handlePositions.right[rotation]}
                className="bg-[#555] hover:bg-green-500 absolute"
                style={handleStyles.out}
            />
        </div>
    );
};

export default memo(XorGateNode);
