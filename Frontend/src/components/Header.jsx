import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiChevronDown } from "react-icons/hi";

function Header() {
    const { isLoggedIn } = useAuth();

    return (
        <nav className="w-full h-16 bg-gray-900 flex items-center justify-between px-20 text-gray-300 border-b border-gray-700">
            {/* Logo */}
            <div className="text-xl font-bold">
                <Link to="/" className="cursor-pointer">
                    DigitalVerse
                </Link>
            </div>
            {/* Links */}
            <ul className="flex items-center gap-20 text-lg">
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
        </nav>
    );
}

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
