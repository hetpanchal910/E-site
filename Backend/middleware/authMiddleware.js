const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (ensure user is logged in)
const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];


            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            req.user = await User.findById(decoded.user.id).select("-password");

            const fs = require('fs');
            const path = require('path');
            const logPath = path.join(__dirname, '..', 'debug_error.log');
            fs.appendFileSync(logPath, `${new Date().toISOString()} - Auth - User lookup for ${decoded.user.id}: ${req.user ? req.user._id : "NULL"}\n`);

            if (!req.user) {
                return res.status(401).json({ message: "User not found, please log in again" });
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// Middleware to check if user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, admin };