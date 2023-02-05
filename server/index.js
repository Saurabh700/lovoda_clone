require("dotenv").config();
var cors = require("cors");
const express = require("express");
const { connection } = require("./configs/connectDB");

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8080;

const { cart } = require("./allRoutes/cart.route");
const { home } = require("./allRoutes/home.route");
const { search } = require("./allRoutes/search.route");
const { account } = require("./allRoutes/account.route");
const { wishlist } = require("./allRoutes/wishlist.route");
const { usersdata } = require("./allRoutes/usersdata.route");
const { collections } = require("./allRoutes/collections.route");
const { addproducts } = require("./allRoutes/addproducts.route");
const { razorpay } = require("./allRoutes/razorpay");

app.use("/home", home);
app.use("/cart", cart);
app.use("/search", search);
app.use("/account", account);
app.use("/wishlist", wishlist);
app.use("/usersdata", usersdata);
app.use("/collections", collections);
app.use("/addproducts", addproducts);
app.use("/razorpay", razorpay);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Atlas, server is running on PORT » ${PORT}`);
  } catch (err) {
    console.log("connection failed");
  }
});
