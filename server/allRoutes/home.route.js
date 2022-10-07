const { Router } = require("express");
const { JewelryModel } = require("../models/allProducts.model");

const home = Router();

home.get("/", async (req, res) => {
  const products = await JewelryModel.find({ category: "homeJewels" });
  res.send({ msg: "collections", products });
});

module.exports = { home };
