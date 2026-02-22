const mongoose = require("mongoose");

// Schema for individual items within the cart
const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: String,
        image: String,
        price: Number,
        size: String,
        color: String,
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { _id: false } // Prevents Mongoose from creating a separate _id for each item in the array
);

// Main Cart Schema
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        guestId: {
            type: String,
        },
        products: [cartItemSchema], // Array of products using the cartItemSchema
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema) ;