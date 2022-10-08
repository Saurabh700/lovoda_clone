import { Button, Image, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import styles from "./LoginRegister.module.css";
import axios from "axios";
import { saveData } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../redux/authReducer/actionTypes";

const Login = () => {
  const [form, setForm] = useState({});

  const { isLoading } = useSelector((store) => store.AuthReducer);

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
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          width: "100px",
          fontWeight: "500",
          marginTop: "30px",
          marginBottom: "150px",
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
      duration: 4000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.email && !form.password) {
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
        .post("http://localhost:8080/account/login", form)
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
        Login
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

      <div>
        <form
          onSubmit={handleSubmit}
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
              Login
            </Text>
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <Link>Forgot your password?</Link>
          </div>

          <ToastExample />
        </form>
      </div>
    </div>
  );
};
export default Login;
