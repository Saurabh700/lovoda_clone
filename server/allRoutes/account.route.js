const { Router } = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const account = Router();

account.post("/register", (req, res) => {
  const { firstName, lastName, email, password, gender, dateOfBirth } =
    req.body;
  bcrypt
    .hash(password, 6)
    .then(async (hash) => {
      const user = new UserModel({
        email: email,
        password: hash,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        cart: [],
        wishlist: [],
      });
      await user.save();
      res.send("signup successfull");
    })
    .catch((err) => {
      res.send("something went wrong");
    });
});

account.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const isValid = await UserModel.findOne({ email });
  if (isValid) {
    let hash = isValid.password;
    bcrypt.compare(password, hash, (err, result) => {
      if (result) {
        let token = jwt.sign(
          { email: isValid.email },
          process.env.COMPANY_SECRET_KEY,
          {
            expiresIn: "3h",
          }
        );
        console.log(token);
        res.send({ msg: "Login successfull", token: token });
      } else if (err) {
        res.send({
          msg: "Login failed in valid credentials » password doesnt match » forgot password?",
        });
      }
    });
  } else {
    res.send({ msg: "user not found, please login first" });
  }
});

module.exports = { account };
