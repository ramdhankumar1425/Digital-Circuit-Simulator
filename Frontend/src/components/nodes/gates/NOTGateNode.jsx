import React from "react";
import { Handle, Position } from "@xyflow/react";

const NotGateNode = () => {
    return (
        <div className="relative w-[50px] h-[50px]">
            {/* SVG for NOT gate */}
            <svg width="50" height="50" viewBox="0 0 50 50">
                {/* Triangle for NOT gate */}
                <polygon
                    points="0,0 40,25 0,50"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Circle at the output */}
                <circle
                    cx="42"
                    cy="25"
                    r="4.5"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>

            {/* Input handle */}
            <Handle
                type="target"
                id="in1"
                position={Position.Left}
                className="bg-[#555] hover:bg-green-500"
            />

            {/* Output handle */}
            <Handle
                type="source"
                id="out"
                position={Position.Right}
                className="bg-[#555] hover:bg-green-500"
            />
        </div>
    );
};

export default NotGateNode;
