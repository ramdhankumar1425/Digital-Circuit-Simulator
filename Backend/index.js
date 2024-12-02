const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = require("./src/app");

// connect db
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
        console.error("Error in connecting MongoDB:", err);
    });

// start the server
app.listen(process.env.SERVER_PORT || 5000 || 4000, () => {
    console.log(
        "Server started successfully at PORT:",
        process.env.SERVER_PORT || 5000 || 4000
    );
});
