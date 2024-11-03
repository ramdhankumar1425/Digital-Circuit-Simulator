const express = require("express");

const app = express();

// get for getting
// post for saving

app.get("/circuit", (req, res) => {
    res.json({ msg: "OK" });
});
app.post("/circuit");

module.exports = app;
