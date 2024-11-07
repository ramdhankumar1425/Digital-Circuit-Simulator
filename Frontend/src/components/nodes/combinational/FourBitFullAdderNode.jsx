import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const FourBitFullAdderNode = (props) => {
    return (
        <div className="relative bg-red-500">
            {/* SVG */}
            <svg width="125" height="225" viewBox="0 0 125 225">
                <polygon
                    points="0,0 0,225 125,225 125,0"
                    fill="white"
                    stroke="black"
                    strokeWidth="5"
                />
                <text x="5" y="29" fontSize="10px">
                    A0
                </text>
                <text x="5" y="54" fontSize="10px">
                    A1
                </text>
                <text x="5" y="79" fontSize="10px">
                    A2
                </text>
                <text x="5" y="104" fontSize="10px">
                    A3
                </text>
                <text x="5" y="129" fontSize="10px">
                    B0
                </text>
                <text x="5" y="154" fontSize="10px">
                    B1
                </text>
                <text x="5" y="179" fontSize="10px">
                    B2
                </text>
                <text x="5" y="204" fontSize="10px">
                    B3
                </text>
                <text x="109" y="54" fontSize="10px">
                    S0
                </text>
                <text x="109" y="79" fontSize="10px">
                    S1
                </text>
                <text x="109" y="104" fontSize="10px">
                    S2
                </text>
                <text x="109" y="129" fontSize="10px">
                    S3
                </text>
                <text x="98" y="179" fontSize="10px">
                    Cout
                </text>
                <text x="56" y="217" fontSize="10px">
                    Cin
                </text>
                <text x="43" y="100" fontWeight="600">
                    4 bit
                </text>
                <text x="40" y="120" fontWeight="600">
                    Adder
                </text>
            </svg>

            {/* Input handles */}
            <Handle
                type="target"
                id="A0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "25px" }}
            />
            <Handle
                type="target"
                id="A1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="target"
                id="A2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="target"
                id="A3"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="target"
                id="B0"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "125px" }}
            />
            <Handle
                type="target"
                id="B1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "150px" }}
            />
            <Handle
                type="target"
                id="B2"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "175px" }}
            />
            <Handle
                type="target"
                id="B3"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "200px" }}
            />
            <Handle
                type="target"
                id="Cin"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", bottom: "2px" }}
            />
            {/* Output handles */}
            <Handle
                type="source"
                id="S0"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "50px" }}
            />
            <Handle
                type="source"
                id="S1"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "75px" }}
            />
            <Handle
                type="source"
                id="S2"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "100px" }}
            />
            <Handle
                type="source"
                id="S3"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "125px" }}
            />
            <Handle
                type="source"
                id="Cout"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", top: "175px" }}
            />
        </div>
    );
};

export default FourBitFullAdderNode;
