import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const EightToOneMuxNode = (props) => {
    return (
        <div className="relative">
            {/* SVG */}
            <svg width="100" height="225" viewBox="0 0 100 225">
                <polygon
                    points="0,0 0,225 100,225 100,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    D7
                </text>
                <text x="5" y="54" fontSize="10px">
                    D6
                </text>
                <text x="5" y="79" fontSize="10px">
                    D5
                </text>
                <text x="5" y="104" fontSize="10px">
                    D4
                </text>
                <text x="5" y="129" fontSize="10px">
                    D3
                </text>
                <text x="5" y="154" fontSize="10px">
                    D2
                </text>
                <text x="5" y="179" fontSize="10px">
                    D1
                </text>
                <text x="5" y="204" fontSize="10px">
                    D0
                </text>
                <text x="20" y="217" fontSize="10px">
                    S2
                </text>
                <text x="45" y="217" fontSize="10px">
                    S1
                </text>
                <text x="70" y="217" fontSize="10px">
                    S0
                </text>
                <text x="78" y="53.5" fontSize="10px">
                    out
                </text>
                <text x="23" y="17" fontWeight="650" fontSize="12px">
                    8×1 MUX
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="D7"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="D6"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="target"
                id="D5"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="target"
                id="D4"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="target"
                id="D3"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "125px" }}
            />
            <Handle
                type="target"
                id="D2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "150px" }}
            />
            <Handle
                type="target"
                id="D1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "175px" }}
            />
            <Handle
                type="target"
                id="D0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "200px" }}
            />
            <Handle
                type="target"
                id="S2"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "25px", bottom: "2px" }}
            />
            <Handle
                type="target"
                id="S1"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "50px", bottom: "2px" }}
            />
            <Handle
                type="target"
                id="S0"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "75px", bottom: "2px" }}
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

export default EightToOneMuxNode;
