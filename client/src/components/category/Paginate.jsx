import {
  Box,
  Button,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react";
import {
  NAME_A_TO_Z,
  NAME_Z_TO_A,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
} from "../../redux/appReducer/actionTypes";
import ReactPaginate from "react-paginate";
import { AiOutlineDown } from "react-icons/ai";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";

function PaginatedItems() {
  const [usd, setUsd] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentItems, setCurrentItems] = useState([]);
  const [sortBy, setSortBy] = useState("Please select type");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const { jewelryItems, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  // console.log(jewelryItems);

  const handleChange = useCallback(
    ({ target: { textContent } }) => {
      setCount((prev) => prev + 1);
      console.log("trigerred");
      setSortBy(textContent);

      switch (textContent) {
        case "Price: Low-High":
          return dispatch({ type: SORT_LOW_TO_HIGH });
        case "Price: High-Low":
          return dispatch({ type: SORT_HIGH_TO_LOW });
        case "Name: A-Z":
          return dispatch({ type: NAME_A_TO_Z });
        case "Name: Z-A":
          return dispatch({ type: NAME_Z_TO_A });
        default:
          console.log("default");
      }
    },
    [count]
  );

  const toggleCurrency = () => {
    setUsd(!usd);
    if (!usd) {
      jewelryItems.forEach((item) => {
        item.cost = (Number(item.cost) * 82.83).toFixed(2);
      });
    } else if (usd) {
      jewelryItems.forEach((item) => {
        item.cost = (Number(item.cost) / 82.83).toFixed(2);
      });
    }
  };

  useEffect(() => {
    console.log("useEffect is trigerring");
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(jewelryItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jewelryItems.length / itemsPerPage));
  }, [itemOffset, jewelryItems, itemsPerPage, handleChange]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jewelryItems.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent={"flex-start"}
        mt={5}
      >
        <Flex justifyContent={"flex-start"} flexDirection={["column", "row"]}>
          <Text fontSize={"14px"} mt={2} mr={3}>
            Currency: INR / USD
          </Text>

          <Switch
            mt={2}
            mr={["0px", "40px"]}
            onChange={toggleCurrency}
            mb={5}
          />
        </Flex>

        <Flex justifyContent={"center"}>
          <Text fontSize={"14px"} mt={2} mr={3}>
            Sort By:
          </Text>

          <Menu>
            <MenuButton
              fontSize={["13px"]}
              fontWeight={"400"}
              as={Button}
              backgroundColor="white"
              border={"1px solid #edf2f7"}
              rightIcon={<AiOutlineDown />}
            >
              {sortBy === "Remove sort" ? "Please select type" : sortBy}
            </MenuButton>
            <MenuList zIndex={3}>
              <MenuItem onClick={handleChange}>Price: Low-High</MenuItem>
              <MenuItem onClick={handleChange}>Price: High-Low</MenuItem>
              <MenuItem onClick={handleChange}>Name: A-Z</MenuItem>
              <MenuItem onClick={handleChange}>Name: Z-A</MenuItem>
              <MenuItem onClick={handleChange}>Remove sort</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Items per page */}

        {/* <Flex
          color={"rgba(18, 18, 18, 0.85)"}
          fontSize={"14px"}
          justifyContent={"flex-end"}
        >
          <Text mt={2} mr={3}>
            Items per page:
          </Text>
          <Select
            justifyContent={"end"}
            w={20}
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
            <option value="24">24</option>
          </Select>
        </Flex> */}
      </Flex>

      {/* {isLoading && <Spinner />} */}

      {isError && "something went wrong"}

      {!isLoading && ( // for actual loading
        <Grid
          w={["269px", "530px", "540px", "807px", "1076px"]}
          m="auto"
          mt={8}
          mb={20}
          templateColumns={[
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
          ]}
          gap={1}
        >
          {loading ? ( //for spinner loading
            <Box w={["269px", "583px", "540px", "807px", "1076px"]}>
              <Spinner m={"auto"} />
            </Box>
          ) : (
            currentItems?.map((item) => (
              <ImgCrate key={item._id} {...item} usd={usd} />
            ))
          )}
        </Grid>
      )}

      {/* currentItems || jewelryItems */}
      <Box w={["269px", "530px", "540px", "807px", "1076px"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </Box>
    </>
  );
}

export default PaginatedItems;
