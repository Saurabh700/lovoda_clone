import React from "react";
import Home from "../components/home/Home";
import JewelryPage from "../pages/JewelryPage";
import { Route, Routes } from "react-router-dom";
import Collection from "../components/category/Collection";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import Cart from "../pages/Cart/Cart";
import Billing from "../pages/Billing/Billing";
import Razorpay from "../pages/Payment/Razorpay";
import OrderComplete from "../pages/Billing/OrderComplete";
import Profile from "../pages/LoginRegister/Profile";
import ShopSocial from "../components/category/ShopSocial";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/billings" element={<Billing />} />

        <Route path="/account/login" element={<Login />} />

        <Route path="/account/profile" element={<Profile />} />

        <Route path="/billing/payment" element={<Razorpay />} />

        <Route path="/account/register" element={<Register />} />

        <Route path="/ordercomplete" element={<OrderComplete />} />

        <Route path="/collections/:cat" element={<Collection />} />

        <Route path="/pages/shop-instagram" element={<ShopSocial />} />

        <Route path="/collections/product/:id" element={<JewelryPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
