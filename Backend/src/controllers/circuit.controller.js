const { Circuit } = require("../models/circuit.model");
const { User } = require("../models/user.model");

const handleSaveCircuit = async (req, res) => {
    console.log("Saving circuit...");
    const { circuit } = req.body;

    try {
        const userId = req.user.userId;
        let userData = await User.findById(userId);

        if (!userData) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        userData = await userData.populate("circuits");

        const existingCircuit = userData.circuits.find(
            (cir) => cir.name == circuit.name
        );

        if (existingCircuit) {
            // Update the existing circuit
            existingCircuit.data = JSON.stringify({
                nodes: circuit.nodes,
                edges: circuit.edges,
            });

            await existingCircuit.save();

            console.log("Circuit updated successfully");
            return res
                .status(200)
                .json({ msg: "Circuit updated successfully" });
        } else {
            // Create a new circuit and save it
            const newCircuit = new Circuit({
                user: userId,
                name: circuit.name,
                data: JSON.stringify({
                    nodes: circuit.nodes,
                    edges: circuit.edges,
                }),
            });

            await newCircuit.save();

            // Add the new circuit to the user's circuits array
            userData.circuits.push(newCircuit);
            await userData.save();

            console.log("Circuit created successfully");
            return res
                .status(201)
                .json({ msg: "Circuit created successfully" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const handleGetCircuit = async (req, res) => {
    console.log("Retrieving circuit");
    const { circuitId } = req.query;

    try {
        const userId = req.user.userId;

        // Fetch the circuit
        const circuit = await Circuit.findById(circuitId);

        if (!circuit) {
            console.log("Circuit not found");
            return res.status(404).json({ msg: "Circuit not found" });
        }

        // check if circuit belongs to logged in user
        if (circuit.user != userId) {
            console.log("Unauthorized request to access circuit");
            return res
                .status(401)
                .json({ msg: "Unauthorized request to access circuit" });
        }

        console.log("Circuit retrieved successfully");
        return res.status(200).json({
            msg: "Circuit retrieved successfully",
            circuit,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const handleDeleteCircuit = async (req, res) => {
    console.log("Deleting Circuit...");
    const { circuitId } = req.body;

    try {
        const userId = req.user.userId;

        // Fetch the circuit
        const circuit = await Circuit.findById(circuitId);

        if (!circuit) {
            console.log("Circuit not found");
            return res.status(404).json({ msg: "Circuit not found" });
        }

        // check if circuit belongs to logged in user
        if (circuit.user != userId) {
            console.log("Unauthorized request to delete circuit");
            return res
                .status(401)
                .json({ msg: "Unauthorized request to delete circuit" });
        }

        await circuit.deleteOne();
        console.log("Circuit deleted successfully");

        return res.status(200).json({
            msg: "Circuit deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { handleSaveCircuit, handleGetCircuit, handleDeleteCircuit };
