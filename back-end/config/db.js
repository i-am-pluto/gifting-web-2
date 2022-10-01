const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1/mydb");
        console.log("Connection Successful");
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

module.exports = connectDB;