import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Icon,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Select,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import styles from "./Collection.module.css";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJewelry } from "../../redux/appReducer/action";
import PaginatedItems from "./Paginate";
import {
  BEST_SELLING,
  FEATURED,
  SORT_ALPHABETICALLY_A_Z,
  SORT_ALPHABETICALLY_Z_A,
  SORT_DATE_NEW_TO_OLD,
  SORT_DATE_OLD_TO_NEW,
  SORT_PRICE_HTL,
  SORT_PRICE_LTH,
} from "../../redux/appReducer/actionTypes";
import { useState } from "react";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";

const Collection = () => {
  const dispatch = useDispatch();
  const prod = useSelector((store) => store.AppReducer.jewelryItems);

  const [jewelryItems, setJewelryItems] = useState(prod);

  // const [count, setCount] = useState(0);
  console.log(jewelryItems, "old method");

  const handleChange = (e) => {
    let val = e.target.value;
    // setCount((prev) => prev + 1);
    // console.log(val, "selected val");
    // console.log(jewelryItems, "final check");
    switch (val) {
      case "lth":
        setJewelryItems([...prod.sort((a, b) => a.cost - b.cost)]);
      case "htl":
        setJewelryItems([...prod.sort((a, b) => b.cost - a.cost)]);
      case "a2z":
        return dispatch({ type: SORT_PRICE_LTH });
      default:
        return dispatch({ type: SORT_PRICE_HTL });
    }

    //   if (val === "lth") {
    //     return dispatch({ type: SORT_PRICE_HTL });
    //   } else if (val === "htl") {
    //     return dispatch({ type: SORT_PRICE_LTH });
    //   } else if (val === "a2z") {
    //     return dispatch({ type: SORT_ALPHABETICALLY_A_Z });
    //   } else if (val === "z2a") {
    //     return dispatch({ type: SORT_ALPHABETICALLY_Z_A });
    //   } else if (val === "o2n") {
    //     return dispatch({ type: SORT_DATE_OLD_TO_NEW });
    //   } else if (val === "n2o") {
    //     return dispatch({ type: SORT_DATE_NEW_TO_OLD });
    //   } else if (val === "bestSelling") {
    //     return dispatch({ type: BEST_SELLING });
    //   } else if (val === "featured") {
    //     return dispatch({ type: FEATURED });
    //   }
  };

  let params = useParams();
  console.log(params);

  useEffect(() => {
    dispatch(getJewelry(params.cat));
  }, [params, jewelryItems]);
  console.log(jewelryItems, "incollections");

  return (
    <div className={styles.wrapper}>
      <div className={styles.new}>{params.cat}</div>
      <div className={styles.filter}>
        <div className={styles.align}>
          <p>Filter:</p>
          <Menu>
            <MenuButton as={Link}>
              Actions{" "}
              <Icon
                className={styles.icon}
                color="rgba(18, 18, 18)"
                as={AiOutlineDown}
                h={3}
                w={3}
              />
            </MenuButton>
            <MenuList zIndex={2}>
              <Flex pt={2} pl={5} w={340}>
                <div>The highest price is $95.00</div>
                <div>
                  <Icon
                    className={styles.icon}
                    color="#c9ac92"
                    as={AiOutlineHeart}
                    ml={10}
                    mr={10}
                    mt={-1}
                    h={7}
                    w={7}
                  />
                </div>
                <div>
                  <Link>Reset</Link>
                </div>
              </Flex>
              <MenuDivider />
              <Flex p={3}>
                <Icon
                  className={styles.icon}
                  as={BsCurrencyDollar}
                  mt={2}
                  ml={2}
                  h={4}
                  w={4}
                />
                <Input ml={3} mr={10} w={120} />
                <Icon
                  className={styles.icon}
                  as={BsCurrencyDollar}
                  mt={2}
                  h={4}
                  w={4}
                />
                <Input ml={3} mr={10} w={120} />
              </Flex>
            </MenuList>
          </Menu>

          {/* -------------------------------- */}

          <Menu>
            <MenuButton as={Link}>
              Availability{" "}
              <Icon
                className={styles.icon}
                color="rgba(18, 18, 18)"
                as={AiOutlineDown}
                h={3}
                w={3}
              />
            </MenuButton>
            <MenuList zIndex={2}>
              <Flex justifyContent="space-between" pt={2} pl={5} w={300} pr={0}>
                <div>0 Selected</div>
                <div>
                  <Link mr={5}>Reset</Link>
                </div>
              </Flex>
              <MenuDivider />
              <Flex p={3}>
                <Checkbox pr={2} />
                In stock(324)
              </Flex>
              <Flex p={3}>
                <Checkbox pr={2} />
                Out of stock(2)
              </Flex>
            </MenuList>
          </Menu>
        </div>
        <div className={styles.align}>
          <p>Sort by:</p>
          <Select onChange={handleChange} mt={0} w={150} fontSize="14px">
            <option value="htl">Featured</option>
            <option value="lth">Best selling</option>
            <option value="a2z">Alphabetically, A-Z</option>
            <option value="z2a">Alphabetically, Z-A</option>
            <option value="lth">Price, low to high</option>
            <option value="htl">Price, high to low</option>
            <option selected value="a2z">
              Date, old to new
            </option>
            <option value="z2a">Date, new to old</option>
          </Select>
          <p>374 products</p>
        </div>
      </div>

      {/* <PaginatedItems itemsPerPage={4} /> */}
      <Grid
        w={["269px", "583px", "540px", "807px", "1076px"]}
        m="auto"
        mt={8}
        mb={20}
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={1}
      >
        {jewelryItems?.map((item) => (
          <ImgCrate key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  );
};

export default Collection;
