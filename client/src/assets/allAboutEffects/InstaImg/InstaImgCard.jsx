import React from "react";
import styles from "./InstaImgCard.module.css";

const InstaImgCard = ({ item }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <figure className={styles.figure}>
          <img className={styles.image} src={item.image1} alt="img" />

          <figcaption className={styles.figcaption}>
            <h1 className={styles.text}>SHOP THIS LOOK</h1>
            <br />
            <span></span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default InstaImgCard;
