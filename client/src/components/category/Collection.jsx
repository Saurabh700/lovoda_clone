import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import PaginatedItems from "./Paginate";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Collection.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getJewelry } from "../../redux/appReducer/action";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import {
  FILTER_COST,
  FILTER_COST_REQUEST,
  FILTER_COST_SUCCESS,
} from "../../redux/appReducer/actionTypes";
import { Wishlist } from "../../assets/wishlist/WishlistTag";

const Collection = () => {
  const dispatch = useDispatch();

  const [bear, setBear] = useState("");
  const [bull, setBull] = useState("");
  const [reset, setReset] = useState(false);

  const { jewelryItems } = useSelector((store) => store.AppReducer);

  let params = useParams();

  useEffect(() => {
    dispatch(getJewelry(params.cat));
  }, [params]);

  const handlePriceReset = () => {
    dispatch(getJewelry(params.cat));
    setBear("");
    setBull("");
  };

  const handlePriceSearch = () => {
    // dispatch(getJewelry(params.cat));
    // dispatch({ type: FILTER_COST_REQUEST });
    // setTimeout(() => {
    dispatch({ type: FILTER_COST, payload: [bear, bull] });
    // }, 500);
    // dispatch({ type: FILTER_COST_SUCCESS });
  };

  return (
    <Box
      w={["269px", "530px", "540px", "807px", "1076px"]}
      m={"auto"}
      className={styles.wrapper}
    >
      <Flex className={styles.new}>{params.cat}</Flex>
      <Flex
        w={["269px", "530px", "540px", "807px", "1076px"]}
        m={"auto"}
        className={styles.filter}
      >
        <div className={styles.align}>
          <p>Filter:</p>

          <Menu m={"auto"}>
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

            <MenuList
              w={["320px", "350px", "362px"]}
              ml={["-60px", "0px"]}
              zIndex={2}
            >
              <Flex pt={2} pl={5}>
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
                  <Link onClick={handlePriceReset} mr={["20px", "0px"]}>
                    Reset
                  </Link>
                </div>
              </Flex>

              <MenuDivider />

              <Flex mt={5} p={3} flexDirection={["column", "row"]}>
                <Flex>
                  <Icon
                    className={styles.icon}
                    as={BsCurrencyDollar}
                    ml={2}
                    h={4}
                    w={4}
                    mr={1}
                    mt={2}
                  />
                  <Input
                    ml={2}
                    w={[230, 120]}
                    mr={8}
                    m={["auto", ""]}
                    value={bear}
                    onChange={(e) => setBear(e.target.value)}
                  />
                </Flex>
                <Flex mt={["20px", "0px"]}>
                  <Icon
                    className={styles.icon}
                    as={BsCurrencyDollar}
                    h={4}
                    w={4}
                    ml={2}
                    mr={1}
                    mt={2}
                  />
                  <Input
                    ml={2}
                    w={[230, 120]}
                    value={bull}
                    m={["auto", ""]}
                    onChange={(e) => setBull(e.target.value)}
                  />
                </Flex>
                <Flex justifyContent={["center"]} ml={3} mt={2} mr={2}>
                  <AiOutlineSearch size={20} onClick={handlePriceSearch} />
                </Flex>
              </Flex>
            </MenuList>
          </Menu>

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

            <MenuList w={["200px", "300px"]} ml={["-90px", "0px"]} zIndex={2}>
              <Flex justifyContent="space-between" pt={2} pl={5} pr={0}>
                0 Selected
              </Flex>

              <MenuDivider />

              <Flex p={3}>
                <Checkbox pr={2} />
                In stock ({jewelryItems.length})
              </Flex>
              <Flex p={3}>
                <Checkbox pr={2} />
                Out of stock (0)
              </Flex>
            </MenuList>
          </Menu>
        </div>
        <div className={styles.align}>
          <p>{jewelryItems.length} products</p>
        </div>
      </Flex>
      <Wishlist />

      <PaginatedItems itemsPerPage={4} />
    </Box>
  );
};

export default Collection;
