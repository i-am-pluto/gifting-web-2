const express = require("express");
const mongoose = require("mongoose");
const {
  generateAutoCompleteSearch,
  searchByRevelency,
} = require("../../Services/SearchEngineService");

const router = express.Router();

router.get("/lookup", async (req, res) => {
  try {
    const data = await generateAutoCompleteSearch(req.query.term);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ message: error, success: false });
  }
});

router.get("/:pgeno", async (req, res) => {
  try {
    const data = await searchByRevelency(
      req.query.query,
      Number(req.params.pgeno)
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ message: error, success: false });
  }
});

module.exports = router;
