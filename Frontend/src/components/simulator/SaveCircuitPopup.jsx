import React, { memo, useState } from "react";
import { useCircuit } from "../../context/CircuitContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const SaveCircuitPopup = ({ isOpen, setIsPopupOpen }) => {
    const { nodes, edges } = useCircuit();
    const [circuitName, setCircuitName] = useState("");
    const { handleSaveCircuit } = useAuth();

    const handleSave = () => {
        if (!circuitName) {
            toast.info("Circuit name is required");
            return;
        }
        const circuit = { name: circuitName, nodes, edges };
        handleSaveCircuit(circuit);
        setIsPopupOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center px-1 items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Save Circuit</h2>
                <p className="mb-4">Please name your circuit before saving:</p>
                <input
                    type="text"
                    placeholder="Enter circuit name"
                    value={circuitName}
                    onChange={(e) => setCircuitName(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setIsPopupOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(SaveCircuitPopup);
