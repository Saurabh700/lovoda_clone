const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cart = Router();

cart.post("/", async (req, res) => {
  console.log("cart trigerred");
  const { token, itemId, count } = req.body;
  console.log(req.body);
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        await UserModel.updateOne(
          { email: decoded.email },
          { $push: { cart: { itemId, count } } }
        );
        res.send({ msg: "item added to cart" });
      }
    }
  );
});

cart.post("/count", async (req, res) => {
  console.log("count trigerred");
  const { token, itemId, count } = req.body;
  console.log(req.body);
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        await UserModel.updateOne(
          { email: decoded.email, "cart.itemId": itemId },
          { $set: { "cart.$.count": count } }
        );
        res.send({ msg: "count incremented in cart" });
      }
    }
  );
});

module.exports = { cart };
