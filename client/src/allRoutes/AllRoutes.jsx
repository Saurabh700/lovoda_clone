import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
