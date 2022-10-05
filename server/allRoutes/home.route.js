const { Router } = require("express");

const home = Router();

home.get("/", (req, res) => {
  res.send({ msg: "products" });
});

module.exports = { home };
