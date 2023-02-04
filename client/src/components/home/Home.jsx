import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";
import InstaImg from "../../assets/allAboutEffects/InstaImg/InstaImg";
import styles from "./home.module.css";
import { getHome } from "../../redux/appReducer/action";
import { getUsersData } from "../../redux/authReducer/action";
import { Wishlist } from "../../assets/wishlist/WishlistTag";

const Home = () => {
  const dispatch = useDispatch();
  const { jewelryItems } = useSelector((store) => store.AppReducer);
  const { isLoading } = useSelector((store) => store.AppReducer);
  const { token } = useSelector((store) => store.AuthReducer);
  console.log(isLoading, "home");

  useEffect(() => {
    dispatch(getHome);
    if (token) {
      dispatch(getUsersData(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <div>
        <Box justifyContent={"end"} className={styles.banner} pb={10}>
          <Text mt={200}>NEW NEW NEW</Text>
          <h2>Check out the new beauties!</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavLink to="/collections/All-Products">
              <button className={styles.btn}>Shop All</button>
            </NavLink>
          </div>
        </Box>
      </div>

      {isLoading && (
        <Box
          m={"auto"}
          mt={400}
          w={["269px", "583px", "540px", "807px", "1076px"]}
          h={"600px"}
        >
          <Spinner m={"auto"} />
        </Box>
      )}

      {!isLoading && (
        <Grid
          w={["269px", "269px", "540px", "807px", "1076px"]}
          m="auto"
          mt={20}
          templateColumns={[
            "repeat(1,1fr)",
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
          ]}
          gap={1}
        >
          {jewelryItems?.map((item) => (
            <ImgCrate key={item._id} {...item} />
          ))}
        </Grid>
      )}

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
      <Wishlist />
    </div>
  );
};

export default Home;
