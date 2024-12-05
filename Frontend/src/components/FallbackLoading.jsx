import React from "react";
import { FadeLoader } from "react-spinners";

function FallbackLoading({ loadingText = "Loading...", color = "#4A90E2" }) {
    return (
        <div
            className="w-full min-h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-gray-50 z-50"
            aria-label="Loading content"
        >
            <FadeLoader color={color} />
            {loadingText && (
                <p className="mt-4 text-sm text-gray-600">{loadingText}</p>
            )}
        </div>
    );
}

export default FallbackLoading;
