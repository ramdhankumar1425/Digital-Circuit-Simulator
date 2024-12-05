import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiChevronDown } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    // detect navigations
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <nav className="w-full h-16 bg-gray-900 flex items-center justify-between px-5 md:px-20 text-gray-300 border-b border-gray-700">
            {/* Logo */}
            <div className="text-xl font-bold">
                <Link to="/" className="cursor-pointer">
                    DigitalVerse
                </Link>
            </div>

            {/* Hamburger Menu Button for Small Screens */}
            <div className="md:hidden z-[1000]">
                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="text-gray-300 focus:outline-none flex items-center"
                >
                    <SlMenu className="font-bold text-lg" />
                </button>
            </div>

            {/* Links for larger screens */}
            <ul className="hidden md:flex items-center gap-10 text-lg">
                <li className="hover:text-gray-400 duration-100 cursor-pointer">
                    <Link to="/" className="block">
                        Home
                    </Link>
                </li>
                <li className="hover:text-gray-400 duration-100 cursor-pointer">
                    <Link to="/simulator" className="block">
                        Simulator
                    </Link>
                </li>
                <li className="hover:text-gray-400 duration-100 cursor-pointer">
                    <Link to="/contact" className="block">
                        Contact Us
                    </Link>
                </li>
                <li className="hover:text-gray-400 duration-100 cursor-pointer">
                    {isLoggedIn ? (
                        <UserDropDown />
                    ) : (
                        <Link
                            to="/login"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center"
                        >
                            Login
                        </Link>
                    )}
                </li>
            </ul>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 shadow-lg md:hidden z-[100]">
                    <ul className="flex flex-col items-center gap-5 py-5 text-lg">
                        <li className="hover:text-gray-400 duration-100 cursor-pointer">
                            <Link to="/" className="block">
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 duration-100 cursor-pointer">
                            <Link to="/simulator" className="block">
                                Simulator
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 duration-100 cursor-pointer">
                            <Link to="/contact" className="block">
                                Contact Us
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 duration-100 cursor-pointer">
                            {isLoggedIn ? (
                                <UserDropDown />
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

function UserDropDown() {
    const { user, handleLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target !== dropdownRef.current) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <button
                ref={dropdownRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-white bg-zinc-800 hover:bg-zinc-800 focus:ring-2 focus:outline-none focus:ring-zinc-900 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                type="button"
            >
                {user?.username?.length > 7
                    ? user?.username?.slice(0, 7) + "..."
                    : user?.username}
                <HiChevronDown className="text-xl font-extrabold ml-1" />
            </button>

            <div
                style={isOpen ? { display: "block" } : { display: "none" }}
                className="absolute top-16 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                >
                    <li>
                        <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <p
                            onClick={handleLogout}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Logout
                        </p>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;
