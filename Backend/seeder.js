const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

const seedData = async () => {
    try {
        // 1. Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        // 2. Clear existing data to avoid duplicates (Optional but recommended)
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // 3. Create an initial Admin User
        const adminUser = await User.create({ 
            name: "Admin User",
            email: "admin@example.com",
            password: "password123", 
            role: "admin",
        });

        // 4. Assign the Admin User ID to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser._id };
        });

        // 5. Insert products into the database
        await Product.insertMany(sampleProducts);

        console.log("Data Seeded Successfully!");
        process.exit();
    } catch (error) {
        console.error("Error Seeding Data:", error);
        process.exit(1);
    }
};

seedData();