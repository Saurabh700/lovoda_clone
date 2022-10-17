import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  const { token } = useSelector((store) => store.AuthReducer);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const updateWishlist = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    //this is rerendering jewelryItems when any item is removed from wishlist
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [count]);

  useEffect(() => {
    dispatch(getHome);
    if (token) {
      dispatch(getUsersData(token));
    }
  }, [dispatch, token]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <div>
      <div>
        <Box justifyContent={"end"} className={styles.banner} pb={10}>
          <Text>NEW NEW NEW</Text>
          <h2>Check out the new beauties!</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavLink to="/collections/All-Products">
              <button className={styles.btn}>Shop All</button>
            </NavLink>
          </div>
        </Box>
      </div>

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
        {loading ? (
          <Box w={["269px", "583px", "540px", "807px", "1076px"]} h={"600px"}>
            <Spinner m={"auto"} />
          </Box>
        ) : (
          jewelryItems?.map((item) => <ImgCrate key={item._id} {...item} />)
        )}
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
      <Wishlist updateWishlist={updateWishlist} />
    </div>
  );
};

export default Home;
