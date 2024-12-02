const handleSendEmail = (req, res) => {
    console.log("Sending Email...");

    //     const { name, email, message } = req.body;

    //     if (!name || !email || !message) {
    //         console.log("Form data not provided");
    //         return res.status(400).json({ msg: "Data not received" });
    //     }

    return res.status(403).json({ msg: "This route is not in usage" });
};

module.exports = { handleSendEmail };
