import React from "react";
import { useAuth } from "../context/AuthContext";
import { FadeLoader } from "react-spinners";

function Loading() {
    const { isLoading } = useAuth();

    if (!isLoading) return null;

    return (
        <div className="w-full h-screen fixed top-0 flex items-center justify-center">
            <FadeLoader />
        </div>
    );
}

export default Loading;
