import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

function SearchDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [searchItems, setSearchitems] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    console.log(query, "query");
    axios
      .post("http://localhost:8080/search", { query })
      .then((res) => {
        setSearchitems(res.data.products);
        console.log(searchItems, "search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optimisedVersion = useCallback(debounce(handleInputChange), []);
  // on every render debounce will render a new function that we dont want thatswhy we will wrap it in useCallback » it will provide us a memoised callback

  return (
    <>
      <Icon
        onClick={onOpen}
        _hover={{ transform: "scale(1.2)" }}
        color="rgba(18, 18, 18, 0.75)"
        as={AiOutlineSearch}
        h={5}
        w={5}
        m={[1, 3]}
        mt={3}
      />
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent pb={10}>
          <DrawerCloseButton
            onClick={() => setSearchitems([])}
            border="none"
            mt={-2}
          />
          <Text
            // p={1}
            fontSize={["12px", "12px"]}
            letterSpacing={"0.6px"}
            m={"auto"}
            mt={2}
            mb={2}
            w={[250, 400, 400, 400]}
            textAlign={"center"}
          >
            Free Shipping on Orders Over $75 and Free Returns (US ONLY)
          </Text>
          <hr />
          <HStack pt={10} w={[250, 300, 400, 500]} m={"auto"}>
            <Input
              onChange={handleInputChange}
              placeholder="Search... "
              borderRadius="0"
              border={"1px solid crimson"}
              // onKeyDownCapture={(e) => {
              //   // console.log(e, "btn");
              //   if (e.key === "Enter") {
              //     navigate(`/collections/${query}`);
              //   }
              // }}
            />
            <Icon
              mb="5px"
              ml="435px"
              _hover={{ transform: "scale(1.2)" }}
              color="rgba(18, 18, 18, 0.75)"
              as={AiOutlineSearch}
              h={5}
              w={5}
              m={5}
            />
          </HStack>
          <HStack>
            <Box margin="auto" onClick={() => setSearchitems([])}>
              {searchItems.length > 0 &&
                query.length > 0 &&
                searchItems.map((item) => (
                  <Flex
                    onClick={onClose}
                    overflowY={"scroll"}
                    key={item._id}
                    fontWeight={400}
                    textAlign={"left"}
                    mb={5}
                    mt={5}
                    w={"400px"}
                    pr={2}
                    marginLeft="-70px"
                  >
                    <NavLink
                      key={item.itemId}
                      to={`/collections/product/${item._id}`}
                    >
                      <Flex>
                        <Image w={50} src={item.front} alt="" />
                        <Box ml={3}>
                          <Text
                            fontSize={"14px"}
                            _hover={{ fontWeight: "500" }}
                          >
                            {item.title}
                          </Text>
                          <Text>$ {item.cost}</Text>
                        </Box>
                      </Flex>
                    </NavLink>
                    <hr />
                  </Flex>
                ))}
            </Box>
          </HStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchDrawer;
