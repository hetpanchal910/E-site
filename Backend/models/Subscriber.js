const mongoose = require("mongoose");

// Define the schema for newsletter subscribers
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);