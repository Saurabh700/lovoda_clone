import { Link } from "@chakra-ui/react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./OrderComplete.module.css";

const OrderComplete = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.congratsBox}>
        <h1 className={styles.congo}>Congratulations</h1>
        <h2 className={styles.wellWisher}>Your Order has been Placed</h2>
        <Link className={styles.wellWisher} onClick={() => navigate("/")}>
          Continue Shopping{" "}
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
