require("dotenv").config();
const express = require("express");
const { connection } = require("./configs/connectDB");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

const { cart } = require("./allRoutes/cart.route");
const { home } = require("./allRoutes/home.route");
const { account } = require("./allRoutes/account.route");
const { wishlist } = require("./allRoutes/wishlist.route");
const { collections } = require("./allRoutes/collections.route");
const { addproducts } = require("./allRoutes/addproducts.route");

app.use("/home", home);
app.use("/cart", cart);
app.use("/account", account);
app.use("/wishlist", wishlist);
app.use("/collections", collections);
app.use("/addproducts", addproducts);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Atlas, server is running on PORT » ${PORT}`);
  } catch (err) {
    console.log("connection failed");
  }
});
