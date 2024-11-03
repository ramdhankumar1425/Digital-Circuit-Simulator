import React from "react";
import { Handle, Position } from "@xyflow/react";

const JKFFNode = () => {
    return (
        <div className="relative bg-red- 500">
            {/* SVG */}
            <svg width="150" height="200" viewBox="0 0 150 200">
                <path
                    d="M 1 1 L 149 1 L 149 199 L 1 199 L 1 1 M 0 85 L 15 100 L 0 115"
                    fill="white"
                    stroke="black"
                    strokeWidth="4"
                />
                {/* Labels */}
                <text
                    x="10"
                    y="55"
                    fill="black"
                    fontSize="20px"
                    fontWeight="500"
                >
                    J
                </text>
                <text
                    x="20"
                    y="108"
                    fill="black"
                    fontSize="20px"
                    fontWeight="500"
                >
                    Clk
                </text>
                <text
                    x="10"
                    y="158"
                    fill="black"
                    fontSize="20px"
                    fontWeight="500"
                >
                    K
                </text>
                <text
                    x="120"
                    y="55"
                    fill="black"
                    fontSize="20px"
                    fontWeight="500"
                >
                    Q
                </text>
                <text
                    x="120"
                    y="158"
                    fill="black"
                    fontSize="20px"
                    fontWeight="500"
                >
                    Q'
                </text>
            </svg>

            {/* Input handle on the left side */}
            <Handle
                type="target"
                id="J"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="target"
                id="CLK"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="target"
                id="K"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "150px" }}
            />
            {/* Output handle on the right side */}
            <Handle
                type="source"
                id="Q"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="source"
                id="Q_not"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "150px" }}
            />
        </div>
    );
};

export default JKFFNode;
