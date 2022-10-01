const mongoose = require("mongoose");
const Products = require("./ProductModel");
const ReviewSchema = require("./ReviewSchema");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    cat_name: {
        type: String,
        required: true,
    },
    // images  { to be added}

    description: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
    },
    products: [{
        product_id: mongoose.mongo.ObjectId,
    }, ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;