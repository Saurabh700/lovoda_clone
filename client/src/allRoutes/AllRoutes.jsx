import React from "react";
import Home from "../components/home/Home";
import JewelryPage from "../pages/JewelryPage";
import { Route, Routes } from "react-router-dom";
import Collection from "../components/category/Collection";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import Cart from "../pages/Cart/Cart";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/account/login" element={<Login />} />

        <Route path="/account/register" element={<Register />} />

        <Route path="/collections/:cat" element={<Collection />} />

        <Route path="/collections/product/:id" element={<JewelryPage />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
