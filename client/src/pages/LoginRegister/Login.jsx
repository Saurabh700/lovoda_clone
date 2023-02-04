import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import axios from "axios";
import { saveData } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../redux/authReducer/actionTypes";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const { isLoading, token } = useSelector((store) => store.AuthReducer);

  const emailRef = useRef();
  const passRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toast = useToast();
  function ToastExample() {
    return (
      <Button
        type="submit"
        style={{
          padding: "15px",
          backgroundColor: "black",
          color: "white",
          width: "110px",
          fontWeight: "500",
          marginTop: "30px",
          marginBottom: "50px",
          borderRadius: "0px",
        }}
      >
        {isLoading ? <Spinner /> : "Sign in"}
      </Button>
    );
  }

  const setToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (token) {
      setToast(
        "Already Logged in",
        "Please logout first from profile section",
        "warning"
      );
    } else if (!form.email && !form.password) {
      setToast(
        "Please enter Credentials",
        "Registeration form should not be empty",
        "warning"
      );

      emailRef.current.focus();
    } else if (!form.email) {
      setToast("Please enter email id", "email is mandatory", "warning");

      emailRef.current.focus();
    } else if (!form.password) {
      setToast("Please enter password", "password cannot be null", "warning");

      passRef.current.focus();
    } else {
      dispatch({ type: USER_LOGIN_REQUEST });
      axios
        .post("https://lovoda-clone-eta.vercel.app/account/login", form)
        .then((res) => {
          console.log(res.data, "log");
          if (res.data.msg === "user not found") {
            setToast(
              "Email id not exist",
              "Please register first by creating your account",
              "warning"
            );
            dispatch({ type: USER_LOGIN_FAILURE });
          } else if (res.data.msg === "Login successfull") {
            setToast(
              "Login successfull.",
              "You have successfully logged in",
              "success"
            );

            console.log(res.data.token);
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                token: res.data.token,
                cart: res.data.cart,
                wishlist: res.data.wishlist,
              },
            });
            saveData("token", res.data.token);
            saveData("user", res.data.userName);
          } else if (res.data.msg === "incorrect password") {
            setToast(
              "incorrect password.",
              "password for this email id does not match with data base",
              "warning"
            );
            dispatch({ type: USER_LOGIN_FAILURE });
          }
        })
        .catch((err) => {
          console.log(err);
          setToast("something went wrong", "Please try again later", "warning");
          dispatch({ type: USER_LOGIN_FAILURE });
        });
    }
  };

  const handleForgetpassword = () => {
    setToast("Feature under construction", "", "warning");
  };

  return (
    <div
      style={{
        margin: "auto",
        fontSize: "14px",
        fontWeight: "400",
      }}
    >
      <div
        style={{
          marginTop: "50px",
          fontSize: "40px",
          letterSpacing: "0.6px",
          fontWeight: "500",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Login
      </div>

      <Box
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        border="2px solid #1771e6"
        p={3}
        mb={3}
        cursor="pointer"
      >
        <Flex justifyContent={"center"}>
          <Image
            h={5}
            w={5}
            mr={2}
            src="https://www.facebook.com/images/fb_icon_325x325.png"
            alt="fb logo"
          />
          <div
            style={{
              color: "#1771e6",
            }}
          >
            Continue with Facebook
          </div>
        </Flex>
      </Box>

      <Box
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        p={3}
        alignItems={"center"}
        cursor="pointer"
        mb={3}
      >
        <Flex justifyContent={"center"}>
          <Image
            h={5}
            w={5}
            mr={14}
            ml={-12}
            src="https://banner2.cleanpng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg"
            alt="gog logo"
          />
          <Text fontSize={"16px"}>Google</Text>
        </Flex>
      </Box>

      <Box
        backgroundColor="#f3993e"
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        p={3}
        alignItems={"center"}
        cursor="pointer"
        mt={4}
      >
        <Flex justifyContent={"center"}>
          <Image
            h={5}
            w={12}
            mr={10}
            mt={1}
            ml={"-40px"}
            src="https://therevolvingdoorproject.org/wp-content/uploads/2021/02/amazon-logo.jpg"
            alt="amazon logo"
          />
          <Text color={"white"} fontSize={"18px"} fontWeight="400">
            Amazon
          </Text>
        </Flex>
      </Box>

      <Box mt={5} m={"auto"} w={["300px", "350px", "350px", "448px"]}>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              style={{
                padding: "15px",
                height: "50px",
                border: "1px solid black",
              }}
              m={"auto"}
              mt={7}
              borderRadius={0}
              w={["300px", "350px", "350px", "448px"]}
              ref={emailRef}
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              style={{
                padding: "15px",
                borderRadius: "0px",
                border: "1px solid black",
                height: "50px",
              }}
              m={"auto"}
              mt={5}
              w={["300px", "350px", "350px", "448px"]}
              ref={passRef}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Text
            borderBottom={"1px solid black"}
            mb={"30px"}
            width={"135px"}
            mt={"10px"}
            borderTop="1px solid transparent"
            _hover={{
              borderBottom: "2px solid black",
              borderTop: "none",
              cursor: "pointer",
            }}
            onClick={handleForgetpassword}
          >
            Forgot your password?
          </Text>

          <ToastExample />
          <Text
            borderBottom={"1px solid black"}
            margin={"auto"}
            mb={"100px"}
            width={"90px"}
            _hover={{ borderBottom: "2px solid black", cursor: "pointer" }}
            onClick={() => navigate("/account/register")}
          >
            Create account
          </Text>
        </form>
      </Box>
    </div>
  );
};
export default Login;
