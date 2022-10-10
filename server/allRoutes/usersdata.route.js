const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const usersdata = Router();

usersdata.get("/:token", async (req, res) => {
  const { token } = req.params;
  jwt.verify(
    token,
    process.env.COMPANY_SECRET_KEY,
    async function (err, decoded) {
      if (err) {
        res.send({ msg: "session timed out" });
      } else if (decoded) {
        const user = await UserModel.findOne({ email: decoded.email });
        res.send({ msg: "user details", user });
      }
    }
  );
});

module.exports = { usersdata };
