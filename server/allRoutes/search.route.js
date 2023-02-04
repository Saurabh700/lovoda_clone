const { Router } = require("express");
const { JewelryModel } = require("../models/allProducts.model");

const search = Router();

search.post("/", async (req, res) => {
  const { query } = req.body;
  console.log(query, "query");
  const products = await JewelryModel.find({
    title: new RegExp(query, "i"),
  }).limit(5);
  //   console.log(products);
  res.send({ msg: "collections", products });
});

module.exports = {
  search,
};
