import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { cart } = useSelector((store) => store.AuthReducer);
  return (
    <div style={{ width: "1100px", margin: "auto" }}>
      {cart.length === 0 ? <EmptyCart /> : <CartItems />}
    </div>
  );
};

export default Cart;
