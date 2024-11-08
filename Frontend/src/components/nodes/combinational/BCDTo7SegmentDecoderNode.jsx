import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const BCDTo7SegmentDecoderNode = (props) => {
    return (
        <div className="relative">
            {/* SVG */}
            <svg width="75" height="200" viewBox="0 0 75 200">
                <polygon
                    points="0,0 0,200 75,200 75,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    A3
                </text>
                <text x="5" y="54" fontSize="10px">
                    A2
                </text>
                <text x="5" y="79" fontSize="10px">
                    A1
                </text>
                <text x="5" y="104" fontSize="10px">
                    A0
                </text>
                <text x="63" y="29" fontSize="10px">
                    g
                </text>
                <text x="63" y="54" fontSize="10px">
                    f
                </text>
                <text x="63" y="79" fontSize="10px">
                    a
                </text>
                <text x="63" y="104" fontSize="10px">
                    b
                </text>
                <text x="63" y="129" fontSize="10px">
                    c
                </text>
                <text x="63" y="154" fontSize="10px">
                    d
                </text>
                <text x="63" y="179" fontSize="10px">
                    e
                </text>
                <text x="24" y="17" fontWeight="650" fontSize="12px">
                    BCD
                </text>
                <text x="31.5" y="30" fontWeight="650" fontSize="12px">
                    to
                </text>
                <text x="24" y="43" fontWeight="650" fontSize="12px">
                    7seg
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="A3"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="A2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="target"
                id="A1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="target"
                id="A0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            {/* Output handles */}
            <Handle
                type="source"
                id="g"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="source"
                id="f"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="source"
                id="a"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="source"
                id="b"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="source"
                id="c"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "125px" }}
            />
            <Handle
                type="source"
                id="d"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "150px" }}
            />
            <Handle
                type="source"
                id="e"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "175px" }}
            />
        </div>
    );
};

export default BCDTo7SegmentDecoderNode;
