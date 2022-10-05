import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Links = [
  {
    to: "/home",
    title: "Home",
  },
  {
    to: "/collections/new",
    title: "New",
  },
  {
    to: "/collections/all-products",
    title: "Shop All",
  },
  {
    to: "/collections/earrings",
    title: "Earrings",
  },
  {
    to: "/collections/necklaces",
    title: "Necklaces",
  },
  {
    to: "/collections/bracelets",
    title: "Bracelets",
  },
  {
    to: "/collections/rings",
    title: "Rings",
  },
  {
    to: "/pages/shop-instagram",
    title: "Shop Social",
  },
];

const baseStyle = {
  _hover: {
    borderBottom: "1px solid black",
  },
};
const activeStyle = {
  borderBottom: "1px solid black",
  fontWeight: "500",
};

const Header = () => {
  return (
    <div>
      <Text fontSize={["12px", "14px"]} mt={2} letterSpacing={"0.6px"} mb={2}>
        Free Shipping on Orders Over $75 and Free Returns (US ONLY)
      </Text>
      <hr />
      <Flex w={"100vw"} h={"100px"} mt={"0px"}>
        <HStack w={["1200px"]} p="20px 50px" m={"auto"}>
          <Image
            mr={4}
            src="https://cdn.shopify.com/s/files/1/0627/7388/7215/files/04122019_logo2_90x.png?v=1645644264"
            alt="logo"
          />
          <Flex className={styles.linkTag}>
            {Links.map((item) => (
              <NavLink
                className={styles.link}
                style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
                exact
                to={item.to}
                key={item.to}
              >
                {item.title}
              </NavLink>
            ))}
          </Flex>
        </HStack>
      </Flex>
    </div>
  );
};

export default Header;
