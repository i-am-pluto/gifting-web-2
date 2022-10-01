const { default: mongoose } = require("mongoose");
const Category = require("../Models/product/CategoryModel");
const Products = require("../Models/product/ProductModel");

// get products of cat*
const getAllProducts = async(cat_id) => {
    const category = await Category.findById(cat_id);
    return category.Products;
};
// get category from id
const getCategoryById = async(cat_id) => {
    const category = await Category.findById(cat_id);
    return category;
};
// get all categories
const getAllCategories = async() => {
    const categories = await Category.find({});
    return categories;
};

module.exports = {
    getAllProducts,
    getCategoryById,
    getAllCategories,
};