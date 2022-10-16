import { Box, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const setToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 4000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToast("Logout successfully", "", "success");
    navigate("/home");
    window.location.reload();
  };

  return (
    <Box w={"75%"} m={"auto"} mt={"80px"}>
      <div
        style={{
          fontSize: "40px",
          fontWeight: "400",
          textAlign: "left",
        }}
      >
        Profile
      </div>{" "}
      <Flex mb={200} onClick={handleLogout}>
        <Icon
          color="rgba(18, 18, 18, 0.75)"
          as={AiOutlineUser}
          w={5}
          h={5}
          mt={3}
          mr={2}
        />
        <Text
          borderBottom={"1px solid black"}
          mb={"30px"}
          width={"50px"}
          mt={"10px"}
          _hover={{ borderBottom: "2px solid black", cursor: "pointer" }}
        >
          Log out
        </Text>
      </Flex>
    </Box>
  );
};

export default Profile;
