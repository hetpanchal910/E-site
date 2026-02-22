const mongoose = require("mongoose")


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connect succesfully");

        
    }
    catch (err) {
        console.log("connection failed", err);
        process.exit(1)
        
    }
}

module.exports = connectDb