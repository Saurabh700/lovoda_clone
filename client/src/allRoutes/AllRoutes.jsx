import React from "react";
import { Route, Routes } from "react-router-dom";
import Collection from "../components/category/Collection";
import Home from "../components/home/Home";
import JewelryPage from "../pages/JewelryPage";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/collections/:cat" element={<Collection />} />
        <Route path="/collections/product/:id" element={<JewelryPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
