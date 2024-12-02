const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const { Circuit } = require("../models/circuit.model");

const handleGetUser = async (req, res) => {
    console.log("Getting UserData...");
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId)
            .populate("circuits")
            .select("-password");

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
};

const handleDeleteUser = async (req, res) => {
    console.log("Deleting user...");

    try {
        const { password } = req.body;

        if (!password) {
            console.log("Password not provided");
            return res.status(400).json({ msg: "Password is required" });
        }

        const userId = req.user.userId;

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        // Verify the provided password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Incorrect password provided");
            return res.status(401).json({ msg: "Incorrect password" });
        }

        // Delete all circuits associated with this user
        await Circuit.deleteMany({ user: userId });
        console.log("All circuits associated with the user have been deleted");

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        console.log("User deleted successfully");
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error(err);

        res.status(500).json({ msg: "Internal server error" });
    }
};

const handleChangePassword = async (req, res) => {
    console.log("Changing Password...");

    try {
        const { currPassword, newPassword } = req.body;

        // Validate input
        if (!currPassword || !newPassword) {
            console.log("Both current and new passwords are required");
            return res
                .status(400)
                .json({ msg: "Both current and new passwords are required" });
        }

        const userId = req.user.userId;

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        // Verify the current password
        const isPasswordCorrect = await bcrypt.compare(
            currPassword,
            user.password
        );
        if (!isPasswordCorrect) {
            console.log("Incorrect current password");
            return res.status(401).json({ msg: "Incorrect current password" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        console.log("Password updated successfully");
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);

        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { handleGetUser, handleDeleteUser, handleChangePassword };
