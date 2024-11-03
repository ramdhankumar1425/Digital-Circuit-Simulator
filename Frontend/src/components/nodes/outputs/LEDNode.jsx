import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useCircuit } from "../../../context/CircuitContext";

const LEDNode = (props) => {
    const [value, setValue] = useState(0);

    // To set the ON/OFF state of LED
    useEffect(() => {
        setValue(props.data.outputs.out);
    }, [props]);

    return (
        <div className="relative w-[50px] h-[50px]">
            {/* SVG */}
            <svg width="50" height="50" viewBox="0 0 50 50">
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
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
            />
        </div>
    );
};

export default LEDNode;
