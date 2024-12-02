const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");

const handleSignUp = async (req, res) => {
    console.log("Signing Up...");
    const { username, email, password } = req.body;

    // Check if all credentials are provided
    if (!username || !email || !password) {
        console.log("Credentials not provided");
        return res.status(400).json({ msg: "Credentials required" });
    }

    try {
        // Check for an already existing user with the same email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Email already registered");
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log("User registered successfully");
        return res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const handleLogin = async (req, res) => {
    console.log("Logging In...");
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        console.log("Credentials not provided");
        return res.status(400).json({ msg: "Credentials required" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Invalid credentials");
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generate a JWT token (authToken)
        const authToken = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        // Set the token as a cookie
        res.cookie("authToken", authToken, {
            httpOnly: true, // Prevents access to the cookie via JavaScript
            secure: false,
            sameSite: "Lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        console.log("Login successful");
        return res
            .status(200)
            .json({ msg: "Login successful", username: user.username });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const handleLogout = (req, res) => {
    console.log("Logging Out...");

    try {
        // Clear the authentication cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: false,
        });

        console.log("Logout successful");
        return res.status(200).json({ msg: "Logout successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { handleSignUp, handleLogin, handleLogout };
