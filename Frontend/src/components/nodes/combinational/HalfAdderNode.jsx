import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const HalfAdderNode = (props) => {
    return (
        <div className="relative">
            {/* SVG */}
            <svg width="125" height="100" viewBox="0 0 125 100">
                <polygon
                    points="0,0 0,100 125,100 125,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    A
                </text>
                <text x="5" y="79" fontSize="10px">
                    B
                </text>
                <text x="113" y="29" fontSize="10px">
                    S
                </text>
                <text x="113" y="79" fontSize="10px">
                    C
                </text>
                <text x="22" y="55" fontWeight="600">
                    Half Adder
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="A"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="B"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            {/* Output handles */}
            <Handle
                type="source"
                id="S"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="source"
                id="C"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
        </div>
    );
};

export default HalfAdderNode;
