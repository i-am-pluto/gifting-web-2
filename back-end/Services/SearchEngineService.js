const mongoose = require("mongoose");
const SearchLookup = require("../Models/searchEngine/SearchLookup");
const { getArtistById } = require("../Repositories/ArtistRepository");
const { findAllProducts } = require("../Repositories/ProductRepository");

const indexAllProducts = async () => {
  const allProducts = await findAllProducts();

  allProducts.forEach(async (el, i) => {
    const savedLookup = await indexAproduct(el);
  });
  return true;
};

const indexAproduct = async (product) => {
  const artist = getArtistById(product.artist_id);

  const searchLookup = new SearchLookup({
    p_name: product.product_name,
    p_id: product.id,
    artist_name: artist.artist_name,
    categories: product.categories,
    price:product.varients[0].price,
  });
  const savedLookup = await searchLookup.save();
  return savedLookup;
};

const searchByRevelency = async (query) => {
  const results = await 
};
const searchByPriceAscending = async (query) => {};
const searchByPriceDescending = async (query) => {};
const generateAutoCompleteSearch = async (query) => {};

module.exports = {
  indexAllProducts,
  indexAproduct,
  searchByRevelency,
  searchByPriceAscending,
  searchByPriceDescending,
  generateAutoCompleteSearch,
};
