import {
  Box,
  Button,
  Icon,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUsersData } from "../../redux/authReducer/action";
import { useEffect } from "react";
import { BUY_CURRENT_ITEM } from "../../redux/authReducer/actionTypes";

const CartItems = () => {
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.AuthReducer);

  const { cart } = useSelector((store) => store.AuthReducer);

  const toast = useToast();

  const dispatch = useDispatch();

  let totalPrice = 0;

  const goToBillings = () => {
    dispatch({ type: "ADD_TOTAL", payload: totalPrice });
    dispatch({ type: BUY_CURRENT_ITEM, payload: 0 });
    navigate("/billings");
  };

  useEffect(() => {
    dispatch(getUsersData(token));
  }, []);

  const setToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCountDec = (id, count) => {
    if (!token) {
      setToast("please login first", "login", "warning");
    } else if (count === 1) {
      setToast("min order limit reached");
    } else if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart/count`, {
          token,
          itemId: id,
          count: count - 1,
        })
        .then((res) => {
          dispatch(getUsersData(token));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCountInc = (id, count) => {
    if (!token) {
      setToast("please login first", "login", "warning");
    } else if (count === 4) {
      setToast("max order limit reached");
    } else if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart/count`, {
          token,
          itemId: id,
          count: count + 1,
        })
        .then((res) => {
          dispatch(getUsersData(token));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart`, {
        data: {
          token,
          itemId: id,
        },
      })
      .then((res) => {
        setToast("Item removed from cart", "removed from cart", "success");
        dispatch(getUsersData(token));
      })
      .catch((err) => {
        setToast("something went wrong", "please try again", "warning");
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "40px", fontWeight: "400", marginTop: "80px" }}>
          Your cart
        </div>
        <div
          onClick={() => navigate("/collections/allproducts")}
          style={{
            padding: "10px",
            border: "none",
            marginTop: "90px",
            marginBottom: "60px",
          }}
        >
          <Link mt="90px">Continue Shopping</Link>
        </div>
      </div>
      <Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>PRODUCT</Th>
                <Th>QUANTITY</Th>
                <Th isNumeric>TOTAL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((item) => {
                totalPrice += item.count * Number(item.cost);
                return (
                  <div key={item._id}>
                    <Tr>
                      <Td>
                        <img
                          style={{ height: "162px", width: "108px" }}
                          src={item.front}
                          alt=""
                        />
                      </Td>
                      <Td style={{ position: "absolute" }}>
                        <div>{item.title}</div>
                        <div style={{ fontSize: "14px", marginTop: "5px" }}>
                          ${item.cost}
                        </div>
                      </Td>
                      {/* </Tr> */}
                      {/* --------------------------------------------------- */}
                      {/* <Tr> */}
                      <Td>
                        <div
                          style={{
                            display: "flex",
                            border: "1px solid black",
                            marginTop: "10px",
                            padding: "5px 10px 5px 10px",
                            width: "100px",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                            position: "absolute",
                            left: "800px",
                          }}
                        >
                          <button
                            disabled={item.count == 0}
                            style={{
                              cursor: "pointer",
                              border: "none",
                              width: "10px",
                            }}
                            onClick={() =>
                              handleCountDec(item.itemId, item.count)
                            }
                          >
                            -
                          </button>
                          <div>{item.count}</div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleCountInc(item.itemId, item.count)
                            }
                          >
                            +
                          </div>
                        </div>
                        <Box
                          style={{
                            position: "absolute",
                            left: "920px",
                            marginTop: "15px",
                          }}
                          _hover={{ cursor: "pointer" }}
                          onClick={() => handleDelete(item.itemId)}
                        >
                          <Icon
                            mb="0px"
                            ml="0px"
                            color="rgba(18, 18, 18)"
                            as={BsTrash}
                            h={5}
                            w={5}
                          />
                        </Box>
                      </Td>
                      <Td>
                        <div style={{ position: "absolute", left: "1210px" }}>
                          ${item.count * item.cost}
                        </div>
                      </Td>
                    </Tr>
                  </div>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <hr />
        <div
          style={{
            textAlign: "right",
            marginTop: "60px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "18px",
                weight: "400",
              }}
            >
              <div>Subtotal - $ {totalPrice}</div>
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  backgroundColor: "rgb(178, 252, 228)",
                  borderRadius: "200px",
                  color: "black",
                  width: "100px",
                  marginTop: "18px",
                  height: "25px",
                  paddingLeft: "20px",
                  paddingTop: "0px",
                  paddingRight: "23px",
                  marginBottom: "5px",
                }}
              >
                afterpay
              </div>
              <span
                style={{
                  marginTop: "20px",
                  paddingLeft: "5px",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                available for orders between $35 to $1000
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                paddingLeft: "5px",
                fontSize: "14px",
                fontWeight: "400",
                textAlign: "right",
              }}
            >
              Tax and shipping calculated at checkout
            </div>
            <Button
              p={"10px"}
              backgroundColor="black"
              color={"white"}
              width="200px"
              fontWeight={"500"}
              mt={"30px"}
              mb={"60px"}
              borderRadius="0px"
              onClick={goToBillings}
              _hover={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              }}
            >
              Check out
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CartItems;
