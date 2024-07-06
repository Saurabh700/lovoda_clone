const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const wishlist = Router();

wishlist.post("/", async (req, res) => {
  const { token, itemId, front, flash, title, category, cost } = req.body;
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        await UserModel.updateOne(
          { email: decoded.email },
          {
            $push: {
              wishlist: { itemId, front, flash, title, category, cost },
            },
          }
        );
        res.send({ msg: "item added to wishlist" });
      }
    }
  );
});

wishlist.delete("/", async (req, res) => {
  const { token, itemId } = req.body;
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        await UserModel.updateMany(
          { email: decoded.email },
          { $pull: { wishlist: { itemId: itemId } } },
          { multi: true }
        );
        res.send({ msg: "item added to wishlist" });
      }
    }
  );
});

module.exports = { wishlist };
