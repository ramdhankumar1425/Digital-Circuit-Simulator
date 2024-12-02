const mongoose = require("mongoose");

const circuitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        data: {
            type: String,
        },
    },
    { timestamps: true }
);

const Circuit = mongoose.model("Circuit", circuitSchema);

module.exports = { Circuit };
