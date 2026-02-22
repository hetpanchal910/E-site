const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        // Fetch all orders and populate user information (name and email)
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Update the status based on request body
            order.status = req.body.status || order.status;

            // If status is "Delivered", update isDelivered and deliveredAt fields
            if (req.body.status === "Delivered") {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Delete an order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.deleteOne();
            res.json({ message: "Order removed" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;