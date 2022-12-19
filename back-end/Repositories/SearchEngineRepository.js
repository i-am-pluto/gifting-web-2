const { default: mongoose } = require("mongoose");
const SearchLookup = require("../Models/searchEngine/SearchLookup");

const searchByRevelency = async (query, pge_no) => {
  const results = await SearchLookup.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(50)
    .skip(pge_no * 50);
  return results;
};

const searchByPriceAscending = async (query, pge_no) => {
  const results = await SearchLookup.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ price: "asc" })
    .limit(50)
    .skip(pge_no * 50);
  return results;
};

const searchByPriceDescending = async (query, pge_no) => {
  const results = await SearchLookup.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ price: "desc" })
    .limit(50)
    .skip(pge_no * 50);
  return results;
};
const generateAutoCompleteSearch = async (query) => {
  // const result = await SearchLookup.find({:{$search:{}}})
};

module.exports = {
  searchByRevelency,
  searchByPriceAscending,
  searchByPriceDescending,
  generateAutoCompleteSearch,
};
