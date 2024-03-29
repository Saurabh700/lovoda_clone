import { Link } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div style={{ fontSize: "40px", fontWeight: "400", marginTop: "80px" }}>
          Your cart is empty
        </div>
        <div>
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
            onClick={() => navigate("/collections/All-Products")}
          >
            Continue shopping
          </button>
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "400",
            marginBottom: "10px",
          }}
        >
          Have an account?
        </div>
        <div style={{ marginBottom: "100px" }}>
          <Link
            borderBottom={"1px solid black"}
            _hover={{ borderBottom: "2px solid black", fontWeight: "500" }}
          >
            <NavLink to="/account/login">Log in{"  "}</NavLink>{" "}
          </Link>
          to check out faster.
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
