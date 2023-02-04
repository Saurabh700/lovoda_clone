import {
  Image,
  Button,
  Link,
  Box,
  Text,
  useToast,
  Spinner,
  Flex,
  Input,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../redux/authReducer/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();

  const { isLoading } = useSelector((store) => store.AuthReducer);

  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const checkRef = useRef();
  const passRef = useRef();

  const onChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({
        ...form,
        [name]: checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const toast = useToast();

  function ToastExample() {
    return (
      <Button
        borderRadius="0px"
        w="100px"
        color={"white"}
        fontSize="14px"
        mt={"30px"}
        mb={"150px"}
        backgroundColor={"black"}
        type="submit"
        p={"10px"}
        fontWeight={"500"}
        _hover={{
          backgroundColor: "white",
          color: "#03A9F4",
          border: "1px solid #03A9F4",
        }}
      >
        {isLoading ? <Spinner /> : "Create"}
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.email && !form.password && !form.firstName && !form.lastName) {
      setToast(
        "Please enter Credentials",
        "Registeration form should not be empty",
        "warning"
      );

      firstNameRef.current.focus();
    } else if (!form.firstName) {
      setToast("Please enter first name", "First name is mandatory", "warning");

      firstNameRef.current.focus();
    } else if (!form.lastName) {
      setToast("Please enter last name", "Last name is mandatory", "warning");

      lastNameRef.current.focus();
    } else if (!form.email) {
      setToast("Please enter email id", "email is mandatory", "warning");

      emailRef.current.focus();
    } else if (!form.password) {
      setToast("Please enter password", "password cannot be null", "warning");

      passRef.current.focus();
    } else if (form.password.length < 8) {
      setToast(
        "Please enter a strong password",
        "Password should be 8 characters long",
        "warning"
      );

      passRef.current.focus();
    } else if (!form.terms) {
      setToast(
        "Please check the terms of use",
        "Terms and conditions needs to checked",
        "warning"
      );

      checkRef.current.focus();
    } else {
      dispatch({ type: USER_REGISTER_REQUEST });
      axios
        .post("https://lovoda-clone-eta.vercel.app/account/register", form)
        .then((res) => {
          console.log(res.data, "regis");
          if (res.data.msg === "already registered") {
            setToast("Email id Already exist", "Please login", "warning");
            dispatch({ type: USER_REGISTER_FAILURE });
          } else if (res.data.msg === "signup successfull") {
            setToast(
              "Account created.",
              "Your account is created successfully",
              "success"
            );
            dispatch({ type: USER_REGISTER_SUCCESS });

            navigate("/account/login");
          }
        })
        .catch((err) => {
          console.log(err);
          setToast("something went wrong", "Please try again later", "warning");
          dispatch({ type: USER_REGISTER_FAILURE });
        });
    }
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
        Create account
      </div>

      <Box
        _hover={{ cursor: "pointer" }}
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        border="2px solid #1771e6"
        p={3}
        mb={3}
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
        _hover={{ cursor: "pointer" }}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        p={3}
        alignItems={"center"}
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
        _hover={{ cursor: "pointer" }}
        backgroundColor="#f3993e"
        m={"auto"}
        w={["300px", "350px", "350px", "448px"]}
        p={3}
        alignItems={"center"}
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
        <form onSubmit={handleOnSubmit}>
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
              ref={firstNameRef}
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={onChange}
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
              ref={lastNameRef}
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={onChange}
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
              ref={emailRef}
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              margin: "auto",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <input
              ref={checkRef}
              type="checkbox"
              name="terms"
              onChange={onChange}
            />
            <label
              style={{ fontSize: "14px", color: "#333", marginLeft: "8px" }}
            >
              I agree to the {"  "}
            </label>
            <Link fontSize={"14px"} ml={1} color={"#03A9F4"}>
              Terms of use
            </Link>
          </div>
          <ToastExample />
        </form>
      </Box>
    </div>
  );
};

export default Register;
