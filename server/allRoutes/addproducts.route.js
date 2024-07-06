const { Router } = require("express");
const { JewelryModel } = require("../models/allProducts.model");

const addproducts = Router();

addproducts.post("/", async (req, res) => {
  const products = req.body;
  try {
    await JewelryModel.insertMany(products);
    res.send({ msg: "uploaded" });
  } catch (err) {
    console.log(err)
    res.send({ msg: "please enter data in required schema" });
  }
});

module.exports = { addproducts };
