const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        // Fetch all products from the database without any specific filters
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching admin products:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            countInStock,
            sku,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
        } = req.body;

        const product = new Product({
            user: req.user._id, // Assumes middleware sets req.user
            name,
            description,
            price,
            category,
            countInStock,
            sku,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.sku = req.body.sku || product.sku;
            product.brand = req.body.brand || product.brand;
            product.sizes = req.body.sizes || product.sizes;
            product.colors = req.body.colors || product.colors;
            product.collections = req.body.collections || product.collections;
            product.material = req.body.material || product.material;
            product.gender = req.body.gender || product.gender;
            product.images = req.body.images || product.images;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;