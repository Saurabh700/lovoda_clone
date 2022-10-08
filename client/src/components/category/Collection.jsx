import {
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
import { FILTER_COST } from "../../redux/appReducer/actionTypes";

const Collection = () => {
  const dispatch = useDispatch();

  const [bear, setBear] = useState("");
  const [bull, setBull] = useState("");

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
    return dispatch({ type: FILTER_COST, payload: [bear, bull] });
  };

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
                  <Link onClick={handlePriceReset}>Reset</Link>
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
                <Input
                  ml={2}
                  w={120}
                  mr={8}
                  value={bear}
                  onChange={(e) => setBear(e.target.value)}
                />
                <Icon
                  className={styles.icon}
                  as={BsCurrencyDollar}
                  mt={2}
                  h={4}
                  w={4}
                />
                <Input
                  ml={2}
                  w={120}
                  value={bull}
                  onChange={(e) => setBull(e.target.value)}
                />
                <Flex ml={5} mt={2}>
                  <AiOutlineSearch
                    mt={2}
                    size={20}
                    onClick={handlePriceSearch}
                  />
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
      </div>

      <PaginatedItems itemsPerPage={4} />
    </div>
  );
};

export default Collection;
