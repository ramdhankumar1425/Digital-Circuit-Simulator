const express = require("express");
// import middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authGuard } = require("./middlewares/auth.middleware.js");
// import controllers
const {
    handleSignUp,
    handleLogin,
    handleLogout,
} = require("./controllers/auth.controller.js");
const {
    handleSaveCircuit,
    handleGetCircuit,
    handleDeleteCircuit,
} = require("./controllers/circuit.controller.js");
const {
    handleGetUser,
    handleDeleteUser,
    handleChangePassword,
} = require("./controllers/user.controller.js");
// const { handleSendEmail } = require("./controllers/utils.controller.js");

// initialize express
const app = express();

// middlewares
app.options(
    "*",
    cors({
        origin: process.env.CLIENT_URI,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Include credentials (cookies)
    })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.post("/auth/signup", handleSignUp);
app.post("/auth/login", handleLogin);
app.get("/auth/logout", authGuard, handleLogout);

app.get("/user", authGuard, handleGetUser);
app.delete("/user", authGuard, handleDeleteUser);
app.post("/user/change-password", authGuard, handleChangePassword);

app.get("/circuit", authGuard, handleGetCircuit);
app.post("/circuit", authGuard, handleSaveCircuit);
app.delete("/circuit", authGuard, handleDeleteCircuit);

// app.post("/util/send-email", handleSendEmail);

app.get("/", (req, res) => {
    console.log("Request received on server");
    res.status(200).json({ msg: "Server is working fine." });
});

app.get("/test", (req, res) => {
    console.log("Request received on test route");
    res.json({ msg: "This is a test message from server." });
});

module.exports = app;
