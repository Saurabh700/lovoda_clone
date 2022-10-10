import React from "react";
import Home from "../components/home/Home";
import JewelryPage from "../pages/JewelryPage";
import { Route, Routes } from "react-router-dom";
import Collection from "../components/category/Collection";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import Cart from "../pages/Cart/Cart";
import Billing from "../pages/Billing/Billing";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/billings" element={<Billing />} />

        <Route path="/account/login" element={<Login />} />

        <Route path="/account/register" element={<Register />} />

        <Route path="/collections/:cat" element={<Collection />} />

        <Route path="/collections/product/:id" element={<JewelryPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
