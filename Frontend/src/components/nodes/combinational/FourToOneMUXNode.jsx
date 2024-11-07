import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const FourToOneMuxNode = (props) => {
    return (
        <div className="relative">
            {/* SVG */}
            <svg width="75" height="125" viewBox="0 0 75 125">
                <polygon
                    points="0,0 0,125 75,125 75,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    D3
                </text>
                <text x="5" y="54" fontSize="10px">
                    D2
                </text>
                <text x="5" y="79" fontSize="10px">
                    D1
                </text>
                <text x="5" y="104" fontSize="10px">
                    D0
                </text>
                <text x="20" y="117" fontSize="10px">
                    S1
                </text>
                <text x="45" y="117" fontSize="10px">
                    S0
                </text>
                <text x="54" y="53.5" fontSize="10px">
                    out
                </text>
                <text x="11" y="17" fontWeight="650" fontSize="12px">
                    4×1 MUX
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="D3"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="D2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="target"
                id="D1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="target"
                id="D0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="target"
                id="S1"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "25px", bottom: "2px" }}
            />
            <Handle
                type="target"
                id="S0"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "50px", bottom: "2px" }}
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

export default FourToOneMuxNode;
