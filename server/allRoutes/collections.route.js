const { Router } = require("express");
const { JewelryModel } = require("../models/allProducts.model");

const collections = Router();

collections.get("/New", async (req, res) => {
  const products = await JewelryModel.find();
  res.send({ msg: "collections", products });
});

collections.get("/All-Products", async (req, res) => {
  const products = await JewelryModel.find();
  res.send({ msg: "collections", products });
});

collections.get("/Earrings", async (req, res) => {
  const products = await JewelryModel.find({ category: "earrings" });
  res.send({ msg: "collections", products });
});

collections.get("/Necklaces", async (req, res) => {
  const products = await JewelryModel.find({ category: "necklace" });
  res.send({ msg: "collections", products });
});

collections.get("/Bracelets", async (req, res) => {
  const products = await JewelryModel.find({ category: "bracelet" });
  res.send({ msg: "collections", products });
});

collections.get("/Rings", async (req, res) => {
  const products = await JewelryModel.find({ category: "ring" });
  res.send({ msg: "collections", products });
});

collections.get("/shop-instagram", (req, res) => {
  res.send({ msg: "collections" });
});

module.exports = { collections };
