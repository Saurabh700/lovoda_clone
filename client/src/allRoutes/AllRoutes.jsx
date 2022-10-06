import React from "react";
import { Route, Routes } from "react-router-dom";
import Collection from "../components/category/Collection";
import Home from "../components/home/Home";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact={true} path="/home" element={<Home />} />
        <Route path="/collections/:cat" element={<Collection />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
