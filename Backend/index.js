console.log("Hello");
const app = require("./src/app");

app.listen(process.env.PORT || 5000, () => {
    console.log(
        "Server started successfully at PORT:",
        process.env.PORT || 5000
    );
});
