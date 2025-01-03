import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useCircuit } from "../../context/CircuitContext";
import SaveCircuitPopup from "./SaveCircuitPopup";
// import icons used
import { IoMoveSharp, IoSaveOutline } from "react-icons/io5";
import { TbMagnet, TbMagnetOff } from "react-icons/tb";
import {
    MdCleaningServices,
    MdOutlineGridOn,
    MdOutlineGridOff,
    MdRedo,
    MdUndo,
} from "react-icons/md";
import { CiDark, CiLight, CiExport } from "react-icons/ci";

function Toolbar() {
    const {
        theme,
        setTheme,
        handleExport,
        clearCircuit,
        gridVisible,
        setGridVisible,
        snappingEnable,
        setSnappingEnable,
    } = useCircuit();
    const [isSaveCircuitPopupOpen, setIsSaveCircuitPopupOpen] = useState(false);

    // For keyboard shortcuts of all toolbar actions
    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key.toLowerCase();
            const ctrlKey = e.ctrlKey;
            const altKey = e.altKey;
            const shiftKey = e.shiftKey;

            if (ctrlKey && altKey && key == "r") {
                clearCircuit();
            } else if (ctrlKey && altKey && key == "j") {
                setSnappingEnable((prev) => !prev);
            } else if (ctrlKey && altKey && key == "k") {
                setGridVisible((prev) => !prev);
            } else if (ctrlKey && altKey && key == "l") {
                setTheme((prev) => (prev == "light" ? "dark" : "light"));
            } else if (ctrlKey && shiftKey && key == "e") {
                handleExport();
            } else if (ctrlKey && shiftKey && key == "s") {
                setIsSaveCircuitPopupOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <>
            <Draggable
                handle=".drag-handle"
                bounds="parent"
                defaultPosition={{
                    x: visualViewport.width / 2,
                    y: 50,
                }}
            >
                <aside className="absolute px-2 py-1 text-center bg-gray-900 border border-gray-700 flex gap-2 sm:gap-4 items-center">
                    {/* Drag */}
                    <IoMoveSharp className="drag-handle text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-grab" />

                    {/* Clear Canvas */}
                    <MdCleaningServices
                        onClick={clearCircuit}
                        title="Clear circuit (Ctrl+Alt+R)"
                        className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                    />

                    {/* Toogle snapping */}
                    {snappingEnable ? (
                        <TbMagnetOff
                            onClick={() => setSnappingEnable(false)}
                            title="Disable snapping  (Ctrl+Alt+J)"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <TbMagnet
                            onClick={() => setSnappingEnable(true)}
                            title="Enable snapping  (Ctrl+Alt+J)"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Toogle Grid Visibility */}
                    {gridVisible ? (
                        <MdOutlineGridOff
                            onClick={() => setGridVisible(false)}
                            title="Disable grid  (Ctrl+Alt+K)"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <MdOutlineGridOn
                            onClick={() => setGridVisible(true)}
                            title="Enable grid  (Ctrl+Alt+K)"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Theme */}
                    {theme == "dark" ? (
                        <CiLight
                            title="Light theme  (Ctrl+Alt+L)"
                            onClick={() => setTheme("light")}
                            className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <CiDark
                            title="Dark theme  (Ctrl+Alt+L)"
                            onClick={() => setTheme("dark")}
                            className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Export */}
                    <CiExport
                        onClick={handleExport}
                        title="Export to PNG  (Ctrl+Shift+E)"
                        className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                    />

                    {/* Save */}
                    <IoSaveOutline
                        title="Save circuit  (Ctrl+Shift+S)"
                        onClick={() => setIsSaveCircuitPopupOpen(true)}
                        className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                    />
                </aside>
            </Draggable>

            <SaveCircuitPopup
                isOpen={isSaveCircuitPopupOpen}
                setIsPopupOpen={setIsSaveCircuitPopupOpen}
            />
        </>
    );
}

export default Toolbar;
