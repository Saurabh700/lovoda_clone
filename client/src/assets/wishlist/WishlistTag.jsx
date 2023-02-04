import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsersData } from "../../redux/authReducer/action";
import axios from "axios";
import { getHome } from "../../redux/appReducer/action";

export function Wishlist() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { wishlist, token } = useSelector((store) => store.AuthReducer);

  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    axios
      .delete("https://secret-beyond-36029.herokuapp.com/wishlist", {
        data: {
          token,
          itemId: id,
        },
      })
      .then((res) => {
        console.log(res, "successfull");
        dispatch(getUsersData(token));
        if (window.location.href === "/home") {
          dispatch(getHome);
          // props.updateWishlist();
          // dispatch(getUsersData(token));
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Flex w={["100vw"]} justifyContent={"flex-end"}>
        <button
          className="rotate"
          ref={btnRef}
          colorscheme="white"
          onClick={onOpen}
        >
          <Flex>
            <span>
              <span
                style={{
                  backgroundColor: "#c9ac92",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  left: "10px",
                  top: "10px",
                  position: "absolute",
                }}
              >
                <Icon
                  position={"relative"}
                  transform="rotate(90deg)"
                  mt={0.4}
                  mr={1}
                  h={6}
                  w={6}
                  top={1}
                  left={0.55}
                  as={AiFillHeart}
                  color="white"
                />
                <Flex
                  transform="rotate(90deg)"
                  position={"relative"}
                  bottom={"19.5px"}
                  width={"50px"}
                  right={"24px"}
                  height={"50px"}
                  color="#c9ac92"
                  fontSize={"14px"}
                  fontWeight={"600"}
                  // border="1px solid black"
                >
                  {wishlist.length < 10 ? wishlist.length : "¥"}
                </Flex>
              </span>
              <Text mt={3} fontSize="15px">
                WISHLIST
              </Text>
            </span>
          </Flex>
        </button>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader p={10} pl={10}>
            <Flex
              style={{
                backgroundColor: "#c9ac92",
                // padding: "5px",
                borderRadius: "100%",
                width: "35px",
                paddingLeft: "4px",
                paddingTop: "2px",
                paddingBottom: "4px",
              }}
            >
              <Icon
                ml={1.6}
                mt={1}
                mr={1}
                h={6}
                w={6}
                as={AiFillHeart}
                color="white"
              />{" "}
              <Text ml={5}>Wishlist</Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody fontWeight={700} textAlign="center">
            SHARE:
            <Flex mt={5} ml={-8} mb={10}>
              {" "}
              <a
                target={"_blank"}
                rel="noreferrer"
                href={"https://www.facebook.com/"}
              >
                <Icon
                  borderRadius="50%"
                  border="1px solid grey"
                  color="grey"
                  h={8}
                  w={8}
                  p={2}
                  ml={20}
                  as={FaFacebookF}
                  cursor="pointer"
                />
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://www.twitter.com/"
              >
                <Icon
                  borderRadius="50%"
                  border="1px solid grey"
                  color="grey"
                  h={8}
                  w={8}
                  p={2}
                  ml={4}
                  cursor="pointer"
                  as={AiOutlineTwitter}
                />
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://www.pinterest.com"
              >
                <Icon
                  borderRadius="50%"
                  border="1px solid grey"
                  color="grey"
                  h={8}
                  w={8}
                  p={2}
                  ml={4}
                  cursor="pointer"
                  as={FaPinterestP}
                />
              </a>
              <a
                href="mailto:psaurabh700.sp@gmail.com"
                rel="noreferrer"
                target={"_blank"}
              >
                <Icon
                  borderRadius="50%"
                  border="1px solid grey"
                  color="grey"
                  h={8}
                  w={8}
                  p={2}
                  ml={4}
                  cursor="pointer"
                  as={AiOutlineMail}
                />
              </a>
            </Flex>
            {wishlist.length === 0 && (
              <div style={{ display: "flex", margin: "auto" }}>
                <button
                  style={{
                    border: "none",
                    width: "200px",
                    justifyContent: "flex-start",
                    position: "absolute",
                    left: "60px",
                    height: "40px",
                    backgroundColor: "#c9ac92",
                    top: "250px",
                    color: "white",
                  }}
                >
                  Wishlist is empty
                </button>
              </div>
            )}
            {wishlist.map((item) => (
              <Flex
                overflowY={"scroll"}
                key={item.itemId}
                fontWeight={400}
                textAlign={"left"}
                mb={5}
                mt={5}
              >
                <NavLink
                  key={item.itemId}
                  to={`/collections/product/${item.itemId}`}
                >
                  <Flex>
                    <Image ml={0} w={100} src={item.front} alt="" />
                    <Box ml={3}>
                      <Text fontSize={"14px"} _hover={{ fontWeight: "500" }}>
                        {item.title}
                      </Text>
                      <Text>$ {item.cost}</Text>
                    </Box>
                  </Flex>
                </NavLink>
                <Icon
                  cursor={"pointer"}
                  mt={0.5}
                  ml={1}
                  as={CgRemove}
                  onClick={() => handleRemoveItem(item.itemId)}
                />
                <hr />
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
