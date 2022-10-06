import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";
import InstaImg from "../../assets/allAboutEffects/InstaImg/InstaImg";
import Footer1 from "../../assets/footer/Footer1";
import Footer2 from "../../assets/footer/Footer2";
import styles from "./home.module.css";
import data from "./ImgCrate.json";

const Home = () => {
  return (
    <div>
      <div>
        <Box justifyContent={"end"} className={styles.banner} pb={10}>
          <Text>NEW NEW NEW</Text>
          <h2>Check out the new beauties!</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavLink to="/collections/allproducts">
              <button className={styles.btn}>Shop All</button>
            </NavLink>
          </div>
        </Box>
      </div>
      <Grid
        w={["269px", "583px", "540px", "807px", "1076px"]}
        m="auto"
        mt={20}
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={1}
      >
        {data.map((item) => (
          <ImgCrate key={item.id} {...item} />
        ))}
      </Grid>
      <Box>
        <h1 className={styles.shopfeed}>SHOP THE FEED</h1>
        <p className={styles.tag}>Tag us on instagram @LavodaShop or #Lavoda</p>
        <div className={styles.hoverComponent}>
          <InstaImg />
        </div>
      </Box>
      <Footer1 />
      <Footer2 />
    </div>
  );
};

export default Home;
