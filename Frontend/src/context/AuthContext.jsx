import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // backend endpoints
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const ENDPOINTS = {
        signup: `${BASE_URL}/auth/signup`,
        login: `${BASE_URL}/auth/login`,
        logout: `${BASE_URL}/auth/logout`,
        getUser: `${BASE_URL}/user`,
        saveCircuit: `${BASE_URL}/circuit`,
        getCircuit: `${BASE_URL}/circuit`,
        deleteCircuit: `${BASE_URL}/circuit`,
        deleteAccount: `${BASE_URL}/user`,
        changePassword: `${BASE_URL}/user/change-password`,
        sendEmail: `${BASE_URL}/util/send-email`,
    };

    // auth methods
    const handleSignup = async (e) => {
        console.log("Signing Up...");
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.signup, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);
                throw new Error("Signup failed. Please try again.");
            }

            const data = await response.json();

            console.log("Signup successful:", data.msg);

            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogin = async (e) => {
        console.log("Logging In...");
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.login, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();

            console.log("Login successful:", data.msg);
            // save the user info in local storage
            localStorage.setItem(
                "user",
                JSON.stringify({ email, username: data.username })
            );
            setUser({ email, username: data.username });

            setIsLoggedIn(true);

            navigate("/");
        } catch (error) {
            console.error("Error during login:", error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogout = async () => {
        console.log("Logging Out...");

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.logout, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);
                throw new Error("Logout failed. Please try again.");
            }

            const data = await response.json();

            console.log("Logout successful:", data.msg);

            localStorage.removeItem("user");
            setUser(null);
            setIsLoggedIn(false);

            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // check for logged in user
    useEffect(() => {
        // localStorage.removeItem("user");
        const savedUser = localStorage.getItem("user");

        if (!savedUser) return;

        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
    }, []);

    // Function to fetch user data from the backend
    const handleGetUserData = async () => {
        console.log("Getting user data...");
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.getUser, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Error in getting user data");
            }

            const data = await response.json();

            // Successfully fetched user data
            return data.user;
        } catch (error) {
            console.error("Error fetching user data:", error.message);

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Function to save circuit to backend
    const handleSaveCircuit = async (circuit) => {
        console.log("Saving circuit...");
        // if user not logged in
        if (!isLoggedIn) {
            toast.info("Login first to save circuit");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.saveCircuit, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ circuit }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Save failed. Please try again.");
            }

            const data = await response.json();

            toast.success("Circuit saved successfully!");
        } catch (error) {
            console.error("Error saving circuit:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to get circuit from backend
    const handleGetCircuit = async (circuitId) => {
        console.log("Getting circuit...");
        try {
            setIsLoading(true);
            const response = await fetch(
                `${ENDPOINTS.getCircuit}?circuitId=${circuitId}`,
                {
                    method: "GET",
                    credentials: "include",

                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Get failed. Please try again.");
            }

            const data = await response.json();

            return data.circuit;
        } catch (error) {
            console.error("Error in getting circuit:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to delete circuit
    const handleDeleteCircuit = async (circuitId) => {
        console.log("Deleting circuit...");

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.deleteCircuit, {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({ circuitId }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Deletion failed. Please try again.");
            }

            // successfully deleted
            const { msg } = await response.json();
            // toast(msg);

            return true;
        } catch (error) {
            console.error("Error in deleting circuit:", error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Function to delete user account
    const handleDeleteAccount = async (password) => {
        console.log("Deleting account...");

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.deleteAccount, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Account deletion failed. Please try again.");
            }

            const data = await response.json();
            console.log("Account deleted successfully:", data.msg);
            // toast("Account deleted successfully !");

            // remove all info saved
            await handleLogout();
        } catch (error) {
            console.error("Error in deleting account:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to change user password
    const handleChangePassword = async (currPassword, newPassword) => {
        console.log("Changing password...");

        try {
            setIsLoading(true);
            const response = await fetch(ENDPOINTS.changePassword, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currPassword, newPassword }),
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Password changing failed. Please try again.");
            }

            const { msg } = await response.json();
            toast.success(msg);
        } catch (error) {
            console.error("Error in changing password:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to send email ****** not in use
    const handleSendEmail = async (e) => {
        console.log("Sending email...");
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        try {
            const response = await fetch(ENDPOINTS.sendEmail, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                const { msg } = await response.json();
                toast.error(msg);

                throw new Error("Email sending failed. Please try again");
            }

            const { msg } = await response.json();
            toast.success(msg);
        } catch (error) {
            console.error("Error in sending email:", error.message);
        }
    };

    const values = useMemo(
        () => ({
            isLoading,
            setIsLoading,
            isLoggedIn,
            user,
            handleSignup,
            handleLogin,
            handleLogout,
            handleGetUserData,
            handleSaveCircuit,
            handleGetCircuit,
            handleDeleteCircuit,
            handleDeleteAccount,
            handleChangePassword,
        }),
        [
            isLoading,
            setIsLoading,
            isLoggedIn,
            user,
            handleSignup,
            handleLogin,
            handleLogout,
            handleGetUserData,
            handleSaveCircuit,
            handleGetCircuit,
            handleDeleteCircuit,
            handleDeleteAccount,
            handleChangePassword,
        ]
    );

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

// Custom Hook to Access Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};
