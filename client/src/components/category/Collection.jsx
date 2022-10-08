import {
  Box,
  Button,
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
import { getJewelry } from "../../redux/appReducer/action";
import PaginatedItems from "./Paginate";
import { useDispatch } from "react-redux";

const Collection = () => {
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   let val = e.target.value;
  //   switch (val) {
  //     case "lth":
  //       return dispatch({ type: SORT_PRICE_LTH });
  //     case "htl":
  //       return dispatch({ type: SORT_PRICE_LTH });
  //     case "a2z":
  //       return dispatch({ type: SORT_PRICE_LTH });
  //     default:
  //       return dispatch({ type: SORT_PRICE_HTL });
  //   }
  // };

  let params = useParams();
  console.log(params);

  useEffect(() => {
    dispatch(getJewelry(params.cat));
  }, [params]);

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
          {/* <p>Sort by:</p>
          <Select onChange={handleChange} mt={0} w={150} fontSize="14px">
            <option value="htl">Featured</option>
            <option value="lth">Best selling</option>
            <option value="a2z">Alphabetically, A-Z</option>
            <option value="z2a">Alphabetically, Z-A</option>
            <option value="lth">Price, low to high</option>
            <option value="htl">Price, high to low</option>
            <option value="a2z">Date, old to new</option>
            <option value="z2a">Date, new to old</option>
          </Select> */}
          <p>374 products</p>
        </div>
      </div>

      <PaginatedItems itemsPerPage={4} />
      {/* <Grid
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
        {newdata?.map((item) => (
          <ImgCrate key={item._id} {...item} />
        ))}
      </Grid> */}
    </div>
  );
};

export default Collection;
