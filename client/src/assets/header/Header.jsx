import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchDrawer from "./Drawer";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { saveData } from "../../utils/localStorage";
import { useSelector } from "react-redux";

const Links = [
  {
    to: "/home",
    title: "Home",
  },
  {
    to: "/collections/New",
    title: "New",
  },
  {
    to: "/collections/All-Products",
    title: "Shop All",
  },
  {
    to: "/collections/Earrings",
    title: "Earrings",
  },
  {
    to: "/collections/Necklaces",
    title: "Necklaces",
  },
  {
    to: "/collections/Bracelets",
    title: "Bracelets",
  },
  {
    to: "/collections/Rings",
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
const crumBaseStyle = {
  _hover: {
    fontWeight: "400",
  },
};
const crumActiveStyle = {
  backgroundColor: "#dfdeda",
  width: "100%",
  fontWeight: "500",
};

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>
        <Flex justifyContent={"center"}>
          {isOpen ? (
            <IconButton
              onClick={onClose}
              pl={3}
              display={["block", "block", "block", "none"]}
              icon={<AiOutlineClose />}
            />
          ) : (
            <IconButton
              pl={3}
              display={["block", "block", "block", "none"]}
              icon={<GiHamburgerMenu />}
            />
          )}
        </Flex>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent mt={110}>
          <DrawerBody>
            {Links.map((item) => (
              <NavLink
                onClick={onClose}
                className={styles.crumlink}
                style={({ isActive }) =>
                  isActive ? crumActiveStyle : crumBaseStyle
                }
                to={item.to}
                key={item.to}
              >
                {item.title}
              </NavLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Header = () => {
  const { cart } = useSelector((store) => store.AuthReducer);

  const navigate = useNavigate();

  const { token } = useSelector((store) => store.AuthReducer);

  const handleProfile = () => {
    token ? navigate("/account/profile") : navigate("/account/login");
  };

  return (
    <div>
      <Text fontSize={["12px", "14px"]} mt={2} letterSpacing={"0.6px"} mb={2}>
        Free Shipping on Orders Over $75 and Free Returns (US ONLY)
      </Text>
      <hr />
      <Flex h={"100px"} mt={[-5, 0, 0, 0]}>
        <Flex
          w={["1200px"]}
          m={"auto"}
          justifyContent={[
            "space-around",
            "space-around",
            "space-around",
            "space-between",
          ]}
        >
          <Menu />
          {/* p "20 50" */}
          <HStack ml={[55, 10, 115, -50, -200]}>
            <Image
              mr={4}
              src="https://cdn.shopify.com/s/files/1/0627/7388/7215/files/04122019_logo2_90x.png?v=1645644264"
              alt="logo"
            />
            <Flex
              className={styles.linkTag}
              display={["none", "none", "none", "Flex"]}
            >
              {Links.map((item) => (
                <NavLink
                  className={styles.link}
                  style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
                  to={item.to}
                  key={item.to}
                  onClick={() => saveData("path", item.to)}
                >
                  {item.title}
                </NavLink>
              ))}
            </Flex>
          </HStack>
          <HStack>
            <Flex>
              <SearchDrawer />
              {/* <NavLink to="/account/login"> */}
              <Icon
                onClick={handleProfile}
                _hover={{ transform: "scale(1.2)" }}
                color="rgba(18, 18, 18, 0.75)"
                as={AiOutlineUser}
                w={5}
                h={5}
                m={[1, 3]}
                mt={3}
              />
              {/* </NavLink> */}
              <Box position={"relative"}>
                <NavLink to="/cart">
                  <Icon
                    _hover={{ transform: "scale(1.2)" }}
                    color="rgba(18, 18, 18, 0.75)"
                    as={BsBag}
                    m={[1, 3]}
                    mt={3}
                    mr={[1, 5, 5, 10]}
                    h={5}
                    w={5}
                  />
                  <Box
                    left={["13px", "24px"]}
                    top={"6px"}
                    w={"16px"}
                    h={"17px"}
                    color={"white"}
                    paddingTop="0px"
                    backgroundColor="black"
                    borderRadius={"50%"}
                    position={"absolute"}
                  >
                    <Text
                      fontSize={"13px"}
                      position={"absolute"}
                      left={"5px"}
                      top={"-1px"}
                    >
                      {cart.length}
                    </Text>
                  </Box>
                </NavLink>
              </Box>
            </Flex>
          </HStack>
        </Flex>
      </Flex>
      <hr />
    </div>
  );
};

export default Header;
