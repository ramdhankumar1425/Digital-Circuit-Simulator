const express = require("express");
// Import controllers
const {
    handleSaveCircuit,
    handleGetCircuit,
} = require("./controllers/circuit.controller");
const {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout,
} = require("./controllers/auth.controller");
const {
    handleGetBooleanFromTruthTable,
    handleGetTruthTableFromBoolean,
} = require("./controllers/util.controller");

const app = express();

// Routes
app.post("/auth/signup", handleUserSignUp);
app.post("/auth/login", handleUserLogin);
app.post("/auth/logout", handleUserLogout);
app.post("/circuit", handleSaveCircuit);
app.get("/circuit", handleGetCircuit);
app.post("/util/tt-to-boolean", handleGetBooleanFromTruthTable);
app.post("/util/boolean-to-tt", handleGetTruthTableFromBoolean);

app.get("/test", (req, res) => {
    res.json({ msg: "This is a test message from server" });
});

module.exports = app;
