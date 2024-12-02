import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="w-full bg-blue-600 text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to Digital Verse
                    </h1>
                    <p className="text-lg mb-6">
                        A powerful and intuitive tool for designing and learning
                        digital logic circuits. Simplify your workflow with a
                        host of innovative features!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/simulator"
                            className="px-6 py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition"
                        >
                            Circuit Simulator
                        </Link>
                        <Link
                            to="/boolean-expression-generator"
                            className="px-6 py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition"
                        >
                            Truth Table to Boolean Expression
                        </Link>
                        <Link
                            to="/truth-table-generator"
                            className="px-6 py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition"
                        >
                            Boolean Expression to Truth Table
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Features
                    </h2>
                    <ul className="space-y-4">
                        <li className="bg-white shadow-md p-4 rounded-md">
                            <h3 className="text-xl font-semibold">
                                Circuit Simulation
                            </h3>
                            <p>
                                Design and simulate digital circuits using an
                                interactive visual interface.
                            </p>
                        </li>
                        <li className="bg-white shadow-md p-4 rounded-md">
                            <h3 className="text-xl font-semibold">
                                Truth Table to Boolean Expression
                            </h3>
                            <p>
                                Generate boolean expressions from truth tables
                                with ease and precision.
                            </p>
                        </li>
                        <li className="bg-white shadow-md p-4 rounded-md">
                            <h3 className="text-xl font-semibold">
                                Boolean Expression to Truth Table
                            </h3>
                            <p>
                                Create truth tables from complex boolean
                                expressions seamlessly.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 px-6 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">About</h2>
                    <p className="text-lg">
                        This simulator is crafted for students, engineers, and
                        hobbyists who want to dive deep into the world of
                        digital logic. From simple circuits to advanced
                        analysis, it’s your go-to platform for learning and
                        experimentation.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
