import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from "./ImgCrate.module.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const ImgCrate = (item) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div onClick={() => setToggle(!toggle)} className={styles.wishBack}>
        {!toggle && (
          <Icon
            onClick={() => setToggle(!toggle)}
            className={styles.emptyHeartAlone}
            color="#c9ac92"
            as={AiOutlineHeart}
            h={5}
            w={5}
          />
        )}

        {toggle && (
          <Icon
            onClick={() => setToggle(!toggle)}
            className={styles.filledHeart}
            color="#c9ac92"
            as={AiFillHeart}
            h={5}
            w={5}
          />
        )}
      </div>

      <div key={item.id} className={styles.wrapper}>
        <NavLink to={`/collections/product/${item._id}`}>
          <figure className={styles.figure}>
            <div className={styles.hoverAnimation}>
              <img
                src={item.flash}
                className={styles.imgBack}
                alt="frontImage"
              />

              <img
                src={item.front}
                className={styles.imgFront}
                alt="backImage"
              />
            </div>

            <figcaption className={styles.figcaption}>
              <p className={styles.link}>{item.title}</p>
              <p className={styles.cost}>
                {item.usd ? "₹" : "$"}
                {item.cost}
              </p>
            </figcaption>
          </figure>
        </NavLink>
      </div>
    </div>
  );
};

export default ImgCrate;
