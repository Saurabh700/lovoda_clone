import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Icon
        onClick={onOpen}
        ref={btnRef}
        _hover={{ transform: "scale(1.2)" }}
        color="rgba(18, 18, 18, 0.75)"
        as={AiOutlineSearch}
        h={5}
        w={5}
        m={[1, 3]}
        mt={3}
      />
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent h="150px">
          <DrawerCloseButton border="none" mt={-2} />
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
          <HStack w={[250, 300, 400, 500]} m={"auto"}>
            <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search... "
              borderRadius="0"
              border={"1px solid crimson"}
              onKeyDownCapture={(e) => {
                console.log(e, "btn");
                if (e.key === "Enter") {
                  navigate(`/collections/${query}`);
                }
              }}
            />

            <Icon
              onClick={() => navigate(`/collections/${query}`)}
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
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchDrawer;
