import { Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <Box>
        <div className={styles.banner}>
          <h1>NEW NEW NEW</h1>
          <h2>Check out the new beauties!</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavLink to="/collections/allproducts">
              <button className={styles.btn}>Shop All</button>
            </NavLink>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;
