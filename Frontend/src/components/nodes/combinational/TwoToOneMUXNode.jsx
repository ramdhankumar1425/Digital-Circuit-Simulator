import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const TwoToOneMuxNode = () => {
    return (
        <div className="relative">
            {/* SVG */}
            <svg width="75" height="100" viewBox="0 0 75 100">
                <polygon
                    points="0,0 0,100 75,100 75,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    D1
                </text>
                <text x="5" y="79" fontSize="10px">
                    D0
                </text>
                <text x="35" y="93" fontSize="10px">
                    S
                </text>
                <text x="54" y="53.5" fontSize="10px">
                    out
                </text>
                <text x="11" y="17" fontWeight="650" fontSize="12px">
                    2×1 MUX
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="D1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="D0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="target"
                id="S"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute" }}
            />
            {/* Output handles */}
            <Handle
                type="source"
                id="out"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
        </div>
    );
};

export default memo(TwoToOneMuxNode);
