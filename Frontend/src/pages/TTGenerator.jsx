import { useState } from "react";
import { toast } from "react-toastify";

function TruthTableGenerator() {
    const [booleanExpression, setBooleanExpression] = useState("");
    const [truthTable, setTruthTable] = useState([]);
    const hints = [
        { symbol: "&&", meaning: "AND (logical conjunction)" },
        { symbol: "||", meaning: "OR (logical disjunction)" },
        { symbol: "!", meaning: "NOT (logical negation)" },
    ];

    const generateTruthTable = () => {
        // Safety checks
        if (!booleanExpression.length > 0) {
            toast("Provide boolean expression");
            return;
        }

        const table = [];

        // get input varibles
        const variableRegex = /[A-Za-z]/g;
        let inputVariables = [
            ...new Set(booleanExpression.match(variableRegex)),
        ];

        // count total no. of rows in truth table
        const totalRows = Math.pow(2, inputVariables.length);

        // fill the truth table for input variables
        for (let i = 0; i < totalRows; i++) {
            const rowNumBinaryEq = i
                .toString(2)
                .padStart(inputVariables.length, "0");

            let row = {};

            inputVariables.map((variable, idx) => {
                row[variable] = rowNumBinaryEq[idx];
            });

            table.push(row);
        }

        try {
            // fill the truth table for output variable
            for (let i = 0; i < totalRows; i++) {
                const row = table[i];
                const keys = Object.keys(row);

                let evalExpression = booleanExpression;

                keys.forEach((key) => {
                    const val = row[key];
                    evalExpression = evalExpression.replaceAll(key, val);
                });

                const out = eval(evalExpression) ? 1 : 0;
                row["Out"] = out;
            }
        } catch (error) {
            toast("Invalid Expression!");
        }

        console.log(table);
        setTruthTable(table);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 my-10">
            <h1 className="text-3xl font-bold text-center mb-6">
                Truth Table Generator
            </h1>

            {/* Hints */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm max-w-lg mx-auto my-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Hints for Boolean Expressions
                </h2>
                <ul className="space-y-2">
                    {hints.map((hint, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
                        >
                            <span className="font-mono text-blue-600 text-lg font-bold">
                                {hint.symbol}
                            </span>
                            <span className="text-gray-600 text-sm">
                                {hint.meaning}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="mt-2">
                    <strong>Note:</strong> Always use parentheses to enhance
                    clarity and prevent errors.
                </p>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter boolean expression (e.g., A && B || C)"
                    value={booleanExpression}
                    onChange={(e) => setBooleanExpression(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                    onClick={generateTruthTable}
                    className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
                >
                    Generate Truth Table
                </button>
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
        </div>
    );
}

export default TruthTableGenerator;
