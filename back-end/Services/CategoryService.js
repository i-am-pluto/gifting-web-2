const mongoose = require("mongoose");
const categoryRepository = require("../Repositories/CategoryRepository");

const getACategory = async(cat_id) => {
    try {
        const category = await categoryRepository.getCategoryById(cat_id);
        return category;
    } catch (error) {
        console.log(error);
    }
};
const getAllCategories = async() => {
    try {
        return await categoryRepository.getAllCategories();
    } catch (error) {
        console.log(error);
    }
};
const getAllProducts = async(cat_id) => {
    try {
        return await categoryRepository.getAllProducts(cat_id);
    } catch (error) {
        console.log(error);
    }
};
module.exports = { getACategory, getAllCategories, getAllProducts };