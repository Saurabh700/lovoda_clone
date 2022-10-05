const express = require("express");
const { connection } = require("./configs/connectDB");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const { home } = require("./allRoutes/home.route");
const { collections } = require("./allRoutes/collections.route");
const { account } = require("./allRoutes/account.route");
const { cart } = require("./allRoutes/cart.route");
const { addproducts } = require("./allRoutes/addproducts.route");

app.use("/", home);
app.use("/collections", collections);
app.use("/account", account);
app.use("/cart", cart);
app.use("/addproducts", addproducts);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Atlas, server is running on PORT » ${PORT}`);
  } catch (err) {
    console.log("connection failed");
  }
});
