import {
  Icon,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartItems = () => {
  const [count, setCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const { cart } = useSelector((store) => store.AuthReducer);

  const TotalAmountFn = ({ count, item }) => {
    setTotalAmount(count * item.price);
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
          {/* <button
            
            className={styles.btn}
            onClick={() => navigate("/collections/allproducts")}
          >
            <div style={{ fontSize: "16px", fontWeight: "400" }}>
              Continue shopping
            </div>
          </button> */}
          <Link mt="90px">Continue Shopping</Link>
        </div>
      </div>
      <div>
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
              {cart.map((item) => (
                <div>
                  <Tr>
                    <Td>
                      <img
                        style={{ height: "162px", width: "108px" }}
                        src={item.img1}
                        alt=""
                      />
                    </Td>
                    <Td style={{ position: "absolute" }}>
                      <div>{item.name}</div>
                      <div style={{ fontSize: "14px", marginTop: "5px" }}>
                        ${item.price}
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
                          disabled={count == 0}
                          style={{
                            cursor: "pointer",
                            border: "none",
                            width: "10px",
                          }}
                          onClick={() => setCount(count - 1)}
                        >
                          -
                        </button>
                        <div>{count}</div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setCount(count + 1)}
                        >
                          +
                        </div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          left: "920px",
                          marginTop: "15px",
                        }}
                        // onClick={() => setCartData([])}
                      >
                        <Icon
                          mb="0px"
                          ml="0px"
                          color="rgba(18, 18, 18)"
                          as={BsTrash}
                          h={5}
                          w={5}
                        />
                      </div>
                    </Td>
                    <Td>
                      <div style={{ position: "absolute", left: "1210px" }}>
                        ${count * item.price}
                      </div>
                    </Td>
                  </Tr>
                  <TotalAmountFn count={count} item={item} />
                </div>
              ))}
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
              Subtotal - ${totalAmount}
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
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "400",
                textAlign: "right",
              }}
            >
              Tax and <Link>shipping</Link> calculated at checkout
            </div>
            <button
              style={{
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                width: "200px",
                fontWeight: "500",
                marginTop: "30px",
                marginBottom: "60px",
              }}
              onClick={() => navigate("/billings")}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
