const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cart = Router();

cart.post("/", async (req, res) => {
  console.log("cart trigerred");
  const { token, itemId } = req.body;
  // console.log(itemId);
  // console.log(req.body);
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        await UserModel.updateOne(
          { _id: "6341e409a95679a23ca86fb6" },
          { $push: { cart: itemId } }
        );
        res.send({ msg: "item added to cart" });
      }
    }
  );
});

module.exports = { cart };
