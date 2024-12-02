import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
    const navigate = useNavigate();
    const { user, handleGetUserData, handleLogout, handleDeleteCircuit } =
        useAuth();
    const [userData, setUserData] = useState({});
    const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] =
        useState(false);
    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] =
        useState(false);

    // to delete circuit
    const deleteCircuit = (circuitId) => {
        const isDeleted = handleDeleteCircuit(circuitId);

        // if deleted successfully from backend => remove from saved userData
        if (isDeleted)
            setUserData((prevData) => {
                return {
                    ...prevData,
                    circuits: userData.circuits?.filter(
                        (cir) => cir._id != circuitId
                    ),
                };
            });
    };

    // to fetch profile data from backend
    useEffect(() => {
        async function getData() {
            const data = await handleGetUserData();
            setUserData(data);
            // console.log(data);
        }

        getData();
    }, []);

    return (
        <>
            <main className="flex flex-col justify-between min-h-[calc(100vh-128px)] p-8 max-w-4xl mx-auto bg-gray-50">
                {/* User Information */}
                <div className="bg-gray-100 shadow rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Welcome, {user?.username}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Manage your circuits and account settings below.
                    </p>
                </div>

                {/* Saved Circuits */}
                <div className="bg-white shadow rounded-lg p-6 mb-8 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Saved Circuits
                    </h3>
                    {userData?.circuits?.length > 0 ? (
                        <ul className="space-y-3">
                            {userData.circuits.map((circuit) => (
                                <li
                                    key={circuit._id}
                                    className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                                >
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-500">
                                            Created on{" "}
                                            {new Date(
                                                circuit.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {/* Open Button */}
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/simulator/${circuit._id}`
                                                )
                                            }
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                                        >
                                            Open
                                        </button>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() =>
                                                deleteCircuit(circuit._id)
                                            }
                                            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center my-10 text-gray-500">
                            <p>No circuits saved yet.</p>
                            <p>
                                Start creating your first circuit to see it
                                here.
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                    <button
                        onClick={() => setIsChangePasswordPopupOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setIsDeleteAccountPopupOpen(true)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </div>
            </main>
            <DeleteAccountPopup
                isOpen={isDeleteAccountPopupOpen}
                setIsDeleteAccountPopupOpen={setIsDeleteAccountPopupOpen}
            />
            <ChangePasswordPopup
                isOpen={isChangePasswordPopupOpen}
                setIsChangePasswordPopupOpen={setIsChangePasswordPopupOpen}
            />
        </>
    );
}

const DeleteAccountPopup = ({ isOpen, setIsDeleteAccountPopupOpen }) => {
    const [password, setPassword] = useState("");
    const { handleDeleteAccount } = useAuth();

    useEffect(() => {
        const handleUnload = () => {
            setPassword("");
            setIsDeleteAccountPopupOpen(false);
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-1 bg-black bg-opacity-50">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-red-600">
                    Delete Account
                </h2>
                <p className="mt-2 text-gray-700">
                    Are you sure you want to delete your account? This action is
                    irreversible.
                </p>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Enter your password:
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setIsDeleteAccountPopupOpen(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDeleteAccount(password)}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        disabled={!password}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

const ChangePasswordPopup = ({ isOpen, setIsChangePasswordPopupOpen }) => {
    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { handleChangePassword } = useAuth();

    useEffect(() => {
        const handleUnload = () => {
            setCurrPassword("");
            setNewPassword("");
            setIsChangePasswordPopupOpen(false);
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-1 bg-black bg-opacity-50">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-red-600">
                    Change Password
                </h2>
                <div className="mt-4 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-600">
                        Enter your current password:
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={currPassword}
                        onChange={(e) => setCurrPassword(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-600">
                        Enter new password:
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setIsChangePasswordPopupOpen(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleChangePassword(currPassword, newPassword);
                            setCurrPassword("");
                            setNewPassword("");
                            setIsChangePasswordPopupOpen(false);
                        }}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        disabled={!currPassword || !newPassword}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
