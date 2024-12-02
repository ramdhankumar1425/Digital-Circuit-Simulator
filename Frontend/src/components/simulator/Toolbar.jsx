import React, { useState } from "react";
import Draggable from "react-draggable";
import { useCircuit } from "../../context/CircuitContext";
import SaveCircuitPopup from "./SaveCircuitPopup";
// import icons used
import { IoMoveSharp } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { TbMagnet } from "react-icons/tb";
import { TbMagnetOff } from "react-icons/tb";
import { MdOutlineGridOff } from "react-icons/md";
import { MdOutlineGridOn } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

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
                    <RxReset
                        onClick={clearCircuit}
                        title="Clear circuit"
                        className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                    />

                    {/* Toogle snapping */}
                    {snappingEnable ? (
                        <TbMagnetOff
                            onClick={() => setSnappingEnable(false)}
                            title="Disable snapping"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <TbMagnet
                            onClick={() => setSnappingEnable(true)}
                            title="Enable snapping"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Toogle Grid Visibility */}
                    {gridVisible ? (
                        <MdOutlineGridOff
                            onClick={() => setGridVisible(false)}
                            title="Disable grid"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <MdOutlineGridOn
                            onClick={() => setGridVisible(true)}
                            title="Enable grid"
                            className="text-gray-300 hover:text-gray-400 font-light transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Theme */}
                    {theme == "dark" ? (
                        <CiLight
                            title="Light theme"
                            onClick={() => setTheme("light")}
                            className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                        />
                    ) : (
                        <CiDark
                            title="Dark theme"
                            onClick={() => setTheme("dark")}
                            className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                        />
                    )}

                    {/* Export */}
                    <CiExport
                        onClick={handleExport}
                        title="Export to PNG"
                        className="text-gray-300 hover:text-gray-400 transition text-3xl py-1 cursor-pointer"
                    />

                    {/* Save */}
                    <IoSaveOutline
                        title="Save circuit"
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
