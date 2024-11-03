import React from "react";
import { Handle, Position } from "@xyflow/react";

const NandGateNode = () => {
    return (
        <div className="relative w-[50px] h-[50px] flex items-center justify-center">
            {/* SVG */}
            <svg width="50" height="50" viewBox="0 0 50 50">
                <path
                    d="M 20 1 L 0 1 L 0 49 L 20 49 M 20 1 A 20 24 0 0 1 20 49"
                    fill="white"
                    stroke="black"
                    strokeWidth="3.5"
                />
                {/* Circle at the output */}
                <circle
                    cx="42"
                    cy="25"
                    r="4"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>

            {/* Input handle on the left side */}
            <Handle
                type="target"
                id="in1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "13px" }}
            />
            <Handle
                type="target"
                id="in2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "37px" }}
            />

            {/* Output handle on the right side */}
            <Handle
                type="source"
                id="out"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
            />
        </div>
    );
};

export default NandGateNode;
