import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";
import InstaImg from "../../assets/allAboutEffects/InstaImg/InstaImg";
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
        <Text
          mt={"100px"}
          fontSize={"40px"}
          fontWeight={"400"}
          letterSpacing={"0.6px"}
          lineHeight={"52px"}
        >
          SHOP THE FEED
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight="400"
          letterSpacing={"0.6px"}
          lineHeight="28px"
          mt={"20px"}
          mb={"50px"}
        >
          Tag us on instagram @LavodaShop or #Lavoda
        </Text>
        <Box m={"auto"} mb={"150px"}>
          <InstaImg />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
