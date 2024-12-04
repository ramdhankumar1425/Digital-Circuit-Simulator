import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const SevenSegmentDisplayNode = (props) => {
    const { handleLimitConnections } = useCircuit();
    const [values, setValues] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        dp: false,
    });

    useEffect(() => {
        setValues(props.data.outputs);
    }, [props.data.outputs]);

    return (
        <div className="relative">
            {/* SVG */}
            <svg width="75" height="100" viewBox="0 0 75 100">
                {/* Boundary */}
                <polygon
                    points="0,0 0,100 75,100 75,0"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="3"
                />
                {/* a */}
                <path
                    d="M 19 15 L 56 15"
                    fill="none"
                    stroke={values.a ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* b */}
                <path
                    d="M 60 15 L 60 47"
                    fill="none"
                    stroke={values.b ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* c */}
                <path
                    d="M 60 53 L 60 85"
                    fill="none"
                    stroke={values.c ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* d */}
                <path
                    d="M 19 85 L 56 85"
                    fill="none"
                    stroke={values.d ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* e */}
                <path
                    d="M 15 53 L 15 85"
                    fill="none"
                    stroke={values.e ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* f */}
                <path
                    d="M 15 15 L 15 47"
                    fill="none"
                    stroke={values.f ? "red" : "#4a4747"}
                    strokeWidth="5"
                />
                {/* g */}
                <path
                    d="M 15 50 L 20 47.5 L 55 47.5 L 60 50 L 55 52.5 L 20 52.5 L 15 50"
                    fill={values.g ? "red" : "#4a4747"}
                    stroke="none"
                    strokeWidth="5"
                />
                {/* dp */}
                <circle
                    cx="67"
                    cy="90"
                    r="3.6"
                    fill={values.dp ? "red" : "#4a4747"}
                    stroke="none"
                    strokeWidth="2"
                />
                {/* Input pin labels */}{" "}
                <text x="10" y="8" fontSize="5px">
                    g
                </text>
                <text x="28" y="8" fontSize="5px">
                    f
                </text>
                <text x="43" y="8" fontSize="5px">
                    a
                </text>
                <text x="59" y="8" fontSize="5px">
                    b
                </text>
                <text x="10" y="95" fontSize="5px">
                    e
                </text>
                <text x="27" y="95" fontSize="5px">
                    d
                </text>
                <text x="43" y="95" fontSize="5px">
                    c
                </text>
                <text x="58" y="95" fontSize="5px">
                    dp
                </text>
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="a"
                position={Position.Top}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "45px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "a",
                    1
                )}
            />
            <Handle
                type="target"
                id="b"
                position={Position.Top}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "61px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "b",
                    1
                )}
            />
            <Handle
                type="target"
                id="c"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "45px", bottom: "1px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "c",
                    1
                )}
            />
            <Handle
                type="target"
                id="d"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "29px", bottom: "1px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "d",
                    1
                )}
            />
            <Handle
                type="target"
                id="e"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "12px", bottom: "1px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "e",
                    1
                )}
            />
            <Handle
                type="target"
                id="f"
                position={Position.Top}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "29px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "f",
                    1
                )}
            />
            <Handle
                type="target"
                id="g"
                position={Position.Top}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "12px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "g",
                    1
                )}
            />
            <Handle
                type="target"
                id="dp"
                position={Position.Bottom}
                className="bg-[#555] hover:bg-green-500"
                style={{ position: "absolute", left: "61px", bottom: "1px" }}
                isConnectable={handleLimitConnections(
                    "target",
                    props.id,
                    "dp",
                    1
                )}
            />
        </div>
    );
};

export default memo(SevenSegmentDisplayNode);
