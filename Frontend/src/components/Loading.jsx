import React from "react";
import { useAuth } from "../context/AuthContext";
import { FadeLoader } from "react-spinners";

function Loading() {
    const { isLoading } = useAuth();

    if (!isLoading) return null;

    return (
        <div
            className="w-full min-h-screen fixed top-0 left-0 flex flex-col items-center justify-center"
            aria-label="Loading content"
        >
            <FadeLoader color="4A90E2" />
        </div>
    );
}

export default Loading;
