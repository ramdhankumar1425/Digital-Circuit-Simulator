const jwt = require("jsonwebtoken");

// protect routes for logged in users only
const authGuard = (req, res, next) => {
    console.log("authGuard running...");
    const authToken = req.cookies.authToken;

    if (!authToken)
        return res
            .status(401)
            .json({ msg: "Authentication required. Please log in." });

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.error("Error verifying token in authGuard:", error.message);
        return res.status(403).json({
            msg: "Invalid or expired token. Please log in again.",
        });
    }
};

module.exports = { authGuard };
