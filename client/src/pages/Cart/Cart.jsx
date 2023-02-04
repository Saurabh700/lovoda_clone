import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { cart } = useSelector((store) => store.AuthReducer);
  console.log(cart, "in cart");

  return (
    <Box m={"auto"} w={["300px", "500px", "800", "1100px"]}>
      {cart?.length === 0 ? <EmptyCart /> : <CartItems />}
    </Box>
  );
};

export default Cart;
