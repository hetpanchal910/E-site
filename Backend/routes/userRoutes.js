const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//   Register a new user
//   POST /api/users/register
//  Public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

 
    try {
      
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        
        user = new User({ name, email, password })
        await user.save()

        const payload = { user: { id: user._id, role: user.role } }
        
        jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: "40h" },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        token,
                    });
                }
            );

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

})





   

//    Authenticate user & get token
//   POST /api/users/login
//  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Match password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//   Get logged-in user's profile
//  GET /api/users/profile
//  Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;