import React from "react";
import { CircuitProvider } from "../context/CircuitContext";
// Import components
import Header from "../components/Header";
import MainCanvas from "../components/simulator/MainCanvas";
import Palette from "../components/simulator/Palette";

function Simulator() {
    return (
        <div className="w-full h-screen flex flex-col overflow-hidden relative">
            <CircuitProvider>
                {/* <Header /> */}
                <MainCanvas />
                <Palette />
            </CircuitProvider>
        </div>
    );
}

export default Simulator;
