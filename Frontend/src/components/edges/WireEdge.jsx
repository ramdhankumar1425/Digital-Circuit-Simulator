import React, { memo, useEffect, useMemo, useState } from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";
import { useCircuit } from "../../context/CircuitContext";

const WireEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
}) => {
    const { nodes, setNodes, edges, setEdges } = useCircuit();
    const [edgeValue, setEdgeValue] = useState(false);
    const [edgePath] = useMemo(
        () =>
            getSmoothStepPath({
                sourceX,
                sourceY,
                sourcePosition,
                targetX,
                targetY,
                targetPosition,
            }),
        [sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition]
    );

    const edge = useMemo(() => edges.find((edge) => edge.id == id), [edges]);
    const sourceNode = useMemo(
        () => nodes.find((node) => node.id == edge?.source),
        [nodes]
    );
    const targetNode = useMemo(
        () => nodes.find((node) => node.id == edge?.target),
        [nodes]
    );

    // To get the edgeValue when sourceNode updated
    useEffect(() => {
        const val = sourceNode?.data?.outputs[edge.sourceHandle];
        if (val != edgeValue) {
            setEdgeValue(val);
            setEdges((eds) =>
                eds.map((edge) => {
                    return edge?.id == id
                        ? {
                              ...edge,
                              data: {
                                  ...edge.data,
                                  value: val,
                              },
                          }
                        : edge;
                })
            );
        }
    }, [sourceNode, edgeValue, id, setEdges]);

    // To update the target node when edge updated
    useEffect(() => {
        // Update the target node using the edge value
        setNodes((nds) =>
            nds.map((node) => {
                if (node?.id == targetNode?.id) {
                    // Update the input which matches the targetHandle name
                    node.data.inputs[edge.targetHandle] = edgeValue;
                    const newInputs = node.data?.inputs;
                    const newOutputs = node.data?.logic(newInputs);
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            inputs: newInputs,
                            outputs: newOutputs,
                        },
                    };
                } else {
                    return node;
                }
            })
        );
    }, [edgeValue]);

    // To update the target node when edge unmounts
    useEffect(() => {
        return () =>
            setNodes((nds) =>
                nds.map((node) => {
                    if (node?.id == targetNode?.id) {
                        const newInputs = {
                            ...node.data.inputs,
                        };
                        newInputs[edge.targetHandle] = false;
                        const newOutputs = node.data.logic(newInputs);

                        return {
                            ...node,
                            data: {
                                ...node.data,
                                inputs: newInputs,
                                outputs: newOutputs,
                            },
                        };
                    } else {
                        return node;
                    }
                })
            );
    }, []);

    return (
        <BaseEdge
            path={edgePath}
            style={{
                ...style,
                stroke: edgeValue ? "#07ed44" : "#6b6261",
                strokeWidth: 3,
                overlay: "revert",
            }}
        />
    );
};

export default memo(WireEdge);
