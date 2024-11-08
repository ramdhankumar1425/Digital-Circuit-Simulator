import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const LEDNode = (props) => {
    const { handlePositions } = useCircuit();
    const [value, setValue] = useState(0);

    // To set the ON/OFF state of LED
    useEffect(() => {
        setValue(props.data.outputs.out);
    }, [props]);

    return (
        <div className="relative">
            {/* SVG */}
            <svg
                width="50"
                height={
                    props.data.rotation === 90 || props.data.rotation === 270
                        ? "50"
                        : "50.025"
                }
                transform={`rotate(${props.data.rotation})`}
                viewBox="0 0 50 50"
            >
                <polygon
                    points="0,0 0,50 50,50 50,0"
                    fill={value == 1 ? "red" : "#333333"}
                    stroke="black"
                    strokeWidth="5"
                />
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="in1"
                position={handlePositions.left[props.data.rotation]}
                className="bg-[#555] hover:bg-green-500"
            />
        </div>
    );
};

export default LEDNode;
