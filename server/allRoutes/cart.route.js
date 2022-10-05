const { Router } = require("express");

const cart = Router();

cart.get("/", (req, res) => {
  res.send({ msg: "cart" });
});

module.exports = { cart };
