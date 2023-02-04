const mongoose = require("mongoose");

const reqString = { type: String, required: true };

const userSchema = new mongoose.Schema(
  {
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    password: reqString,
    cart: [
      {
        itemId: String,
        count: Number,
        category: String,
        cost: String,
        flash: String,
        front: String,
        title: String,
      },
    ],
    wishlist: [
      {
        itemId: String,
        category: String,
        cost: String,
        flash: String,
        front: String,
        title: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//  token,
//           itemId: id,
//           count: count,
//           category: jewel[0].category,
//           cost: jewel[0].cost,
//           flash: jewel[0].flash,
//           front: jewel[0].front,
//           title: jewel[0].title,

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
