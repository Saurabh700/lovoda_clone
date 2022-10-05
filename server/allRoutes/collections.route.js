const { Router } = require("express");
const { JewelryModel } = require("../models/allProducts.model");

const collections = Router();

collections.get("/new", async (req, res) => {
  const products = await JewelryModel.find();
  res.send({ msg: "collections", products });
});

collections.get("/all-products", async (req, res) => {
  const products = await JewelryModel.find();
  res.send({ msg: "collections", products });
});

collections.get("/earrings", async (req, res) => {
  const products = await JewelryModel.find({ category: "earrings" });
  res.send({ msg: "collections", products });
});

collections.get("/necklaces", async (req, res) => {
  const products = await JewelryModel.find({ category: "necklace" });
  res.send({ msg: "collections", products });
});

collections.get("/bracelets", async (req, res) => {
  const products = await JewelryModel.find({ category: "bracelet" });
  res.send({ msg: "collections", products });
});

collections.get("/rings", async (req, res) => {
  const products = await JewelryModel.find({ category: "ring" });
  res.send({ msg: "collections", products });
});

collections.get("/shop-instagram", (req, res) => {
  res.send({ msg: "collections" });
});

module.exports = { collections };
