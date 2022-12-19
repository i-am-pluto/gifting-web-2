const { default: mongoose } = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1/mydb");
    console.log("Connection Successful");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const Model = mongoose.Model;
console.log(
  mongoose.Model.aggregate([{ $match: { $text: { $search: "balls" } } }])
);
