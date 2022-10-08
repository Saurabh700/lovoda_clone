import {
  Image,
  Button,
  Link,
  Box,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginRegister.module.css";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
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
      duration: 4000,
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
        .post("http://localhost:8080/account/register", form)
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
        width: "448px",
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
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        Register
      </div>
      <button
        style={{
          paddingLeft: "-50px",
          borderRadius: "0px",
          backgroundColor: "transparent",
          border: "2px solid #1771e6",
          height: "50px",
        }}
      >
        <Image
          h={5}
          w={6}
          ml={90}
          mt={1}
          src="https://www.facebook.com/images/fb_icon_325x325.png"
          alt="fb logo"
        />
        <div
          style={{
            marginRight: "80px",
            marginTop: "-20px",
            marginLeft: "30px",
            color: "#1771e6",
          }}
        >
          Continue with Facebook
        </div>
      </button>

      <div className={styles.google}>
        <button
          style={{
            paddingLeft: "-50px",
            borderRadius: "0px",
            backgroundColor: "transparent",
            border: "none",
            height: "50px",
          }}
        >
          <Image
            h={5}
            w={6}
            ml={90}
            mt={3}
            src="https://banner2.cleanpng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg"
          />
          <div
            style={{
              marginRight: "80px",
              marginTop: "-25px",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Google
          </div>
        </button>
      </div>
      <button
        style={{
          paddingLeft: "-50px",
          borderRadius: "0px",
          backgroundColor: "#f3993e",
          border: "none",
          height: "50px",
        }}
      >
        <Image
          h={5}
          w={12}
          ml={79}
          mt={-1}
          position="absolute"
          src="https://therevolvingdoorproject.org/wp-content/uploads/2021/02/amazon-logo.jpg"
        />
        <div
          style={{
            marginRight: "80px",
            position: "relative",
            top: "9px",
            color: "white",
            backgroundColor: "#f3993e",
            marginTop: "-20px",
            marginLeft: "140px",
            fontSize: "18px",
            fontWeight: "400",
            width: "100px",
          }}
        >
          Amazon
        </div>
      </button>

      <form
        onSubmit={handleOnSubmit}
        style={{
          width: "350px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          margin: "auto",
          backgroundColor: "white",
        }}
      >
        <div>
          <Text
            ml={4}
            pb={5}
            fontSize="18px"
            fontWeight="semibold"
            textAlign={"left"}
            mt={5}
          >
            Sign up
          </Text>
        </div>
        <div>
          <input
            style={{
              width: "280px",
              padding: "6px",
              marginBottom: "15px",
              borderRadius: "0px",
              border: "1px solid #c6d2d9",
            }}
            type="text"
            ref={firstNameRef}
            placeholder="First name"
            name="firstName"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            style={{
              width: "280px",
              padding: "5px",
              borderRadius: "0px",
              border: "1px solid #c6d2d9",
              marginBottom: "10px",
            }}
            ref={lastNameRef}
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            style={{
              width: "280px",
              padding: "5px",
              borderRadius: "0px",
              border: "1px solid #c6d2d9",
              marginBottom: "10px",
            }}
            ref={emailRef}
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            style={{
              width: "280px",
              padding: "5px",
              borderRadius: "0px",
              border: "1px solid #c6d2d9",
              marginBottom: "10px",
            }}
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
            width: "280px",
            margin: "auto",
          }}
        >
          <input
            ref={checkRef}
            type="checkbox"
            name="terms"
            onChange={onChange}
          />
          <label style={{ fontSize: "14px", color: "#333", marginLeft: "8px" }}>
            I agree to the {"  "}
          </label>
          <Link fontSize={"14px"} ml={1} color={"#03A9F4"}>
            Terms of use
          </Link>
        </div>
        <ToastExample />
        <Box fontSize={"14px"} m={3}>
          OR
        </Box>
        <Button mb={5} variant={"outline"} w={"280px"}>
          <FcGoogle style={{ position: "relative", left: "-30px" }} />
          <Text fontSize={"14px"}> Continue with Google</Text>
        </Button>
      </form>
    </div>
  );
};

export default Register;
