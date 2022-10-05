const mongoose = require("mongoose");

const reqString = { type: String, required: true };

const userSchema = new mongoose.Schema(
  {
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    password: reqString,
    gender: { ...reqString, enum: ["male", "female", "other"] },
    dateOfBirth: reqString,
    cart: [String],
    wishlist: [String],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { userSchema };
