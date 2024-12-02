import React, { useEffect, useState } from "react";
import getBooleanExpression from "../Utils/BooleanExpressionGenerator";

function BooleanExpGenerator() {
    const [numVariable, setNumVariable] = useState(2);
    const [truthTable, setTruthTable] = useState([]);
    const [booleanExpression, setBooleanExpression] = useState("");

    const generateTruthTable = (numVariable) => {
        let table = [];
        setNumVariable(numVariable);

        const totalRows = Math.pow(2, numVariable);

        for (let i = 0; i < totalRows; i++) {
            const rowNumBinaryEq = i.toString(2).padStart(numVariable, "0");

            let row = {};

            for (let j = 0; j < numVariable; j++) {
                row[String.fromCharCode(65 + j)] = rowNumBinaryEq[j];
            }

            row["Out"] = 0;

            table.push(row);
        }

        // console.log(table);
        setTruthTable(table);
    };

    const updateTruthTable = (rowIdx) => {
        setTruthTable((prevTT) =>
            prevTT.map((prevRow, prevRowIdx) => {
                if (prevRowIdx == rowIdx) {
                    return { ...prevRow, Out: prevRow["Out"] == 1 ? 0 : 1 };
                } else return prevRow;
            })
        );
    };

    const generateBooleanExpression = () => {
        const expression = getBooleanExpression(truthTable);
        setBooleanExpression(expression);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(booleanExpression);
    };

    useEffect(() => {
        generateTruthTable(numVariable);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 my-10">
            <h1 className="text-3xl font-bold text-center mb-6">
                Boolean Expression Generator
            </h1>

            {/* Note */}
            <p className="bg-gray-100 p-4 rounded-lg shadow-sm max-w-lg mx-auto my-6">
                <strong>Note:</strong> Click on any row to toogle output value.
            </p>

            {/* Select Dropdown */}
            <div className="flex items-center justify-center gap-5 my-10">
                <p>Select No. of Input Variables</p>
                <select
                    id="countries"
                    onChange={(e) => generateTruthTable(e.target.value)}
                    className="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>

            {/* Truth Table Display */}
            {truthTable.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {Object.keys(truthTable[0]).map((key) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 p-2 text-center bg-gray-100"
                                    >
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {truthTable.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    {Object.values(row).map(
                                        (value, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                onClick={() =>
                                                    updateTruthTable(rowIdx)
                                                }
                                                className="border border-gray-300 p-2 text-center"
                                            >
                                                {value}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Button */}
            <div className="flex items-center justify-center my-10">
                <button
                    onClick={generateBooleanExpression}
                    className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
                >
                    Get Boolean Expression
                </button>
            </div>

            {/* Boolean Expression */}
            {booleanExpression.length > 0 && (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-lg font-semibold text-gray-700">
                        Boolean Expression:
                    </p>
                    <span
                        onClick={handleCopy}
                        className="bg-blue-100 hover:bg-blue-200 cursor-pointer text-blue-700 font-mono py-1 px-4 rounded shadow-sm border border-blue-200"
                    >
                        {booleanExpression}
                    </span>
                </div>
            )}
        </div>
    );
}

export default BooleanExpGenerator;
