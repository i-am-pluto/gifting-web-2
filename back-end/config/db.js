const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://pluto:NDPPuJBrYLr9CnPR@cluster0.ojndtwk.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connection Successful");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = connectDB;
