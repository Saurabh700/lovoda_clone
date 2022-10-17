import React, { useState } from "react";
import { Icon, useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from "./ImgCrate.module.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { getUsersData } from "../../../redux/authReducer/action";
import { useEffect } from "react";
import { getUsersData } from "../../../redux/authReducer/action";

const ImgCrate = (item) => {
  // console.log(item, "fdjlksk");
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const { token, wishlist } = useSelector((store) => store.AuthReducer);

  const toast = useToast();

  const setToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 1000,
      isClosable: true,
    });
  };

  useEffect(() => {
    console.log("wishlist trigerred inside useeffect");
    wishlist.forEach((jewel) => {
      if (jewel.itemId === item._id) {
        setToggle(true);
      }
    });
  }, []);

  const handleToggle = () => {
    if (!token) {
      setToast("please login first", "login", "warning");
    } else if (!toggle) {
      axios
        .post("http://localhost:8080/wishlist", {
          token,
          itemId: item._id,
          front: item.front,
          flash: item.flash,
          title: item.title,
          category: item.category,
          cost: item.cost,
        })
        .then((res) => {
          setToast("Item added to wishlist", "added to wishlist", "success");
          console.log(res, "successfull");
          setToggle(true);
          dispatch(getUsersData(token));
        })
        .catch((err) => {
          setToast("something went wrong", "please try again", "warning");
          console.log(err);
        });
    } else if (toggle) {
      axios
        .delete("http://localhost:8080/wishlist", {
          data: {
            token,
            itemId: item._id,
          },
        })
        .then((res) => {
          setToast(
            "Item removed from wishlist",
            "removed from wishlist",
            "success"
          );
          console.log(res, "successfull");
          setToggle(false);
          dispatch(getUsersData(token));
        })
        .catch((err) => {
          setToast("something went wrong", "please try again", "warning");
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div onClick={handleToggle} className={styles.wishBack}>
        {!toggle && (
          <Icon
            transition={"0.3s ease-in-out"}
            className={styles.emptyHeartAlone}
            color="#c9ac92"
            as={AiOutlineHeart}
            h={5}
            w={5}
            _hover={{ transform: "scale(1.2)" }}
          />
        )}

        {toggle && (
          <Icon
            transition={"0.2s ease-in-out"}
            className={styles.filledHeart}
            color="#c9ac92"
            as={AiFillHeart}
            h={5}
            w={5}
            _hover={{ transform: "scale(1.2)" }}
          />
        )}
      </div>

      <div className={styles.wrapper}>
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
