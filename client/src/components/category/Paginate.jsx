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
import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";
import {
  NAME_A_TO_Z,
  NAME_Z_TO_A,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
} from "../../redux/appReducer/actionTypes";

function PaginatedItems() {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [sortBy, setSortBy] = useState("Please select type");
  const [usd, setUsd] = useState(false);

  const dispatch = useDispatch();

  const { jewelryItems, isLoading, isError } = useSelector(
    (store) => store.AppReducer,
    shallowEqual
  );

  console.log(jewelryItems);

  const handleChange = ({ target: { textContent } }) => {
    console.log(textContent, "textContent");
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
  };

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
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(jewelryItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jewelryItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, jewelryItems, handleChange]); //handleChange

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jewelryItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Flex justifyContent={"flex-end"}>
        <Text fontSize={"14px"} mt={2} mr={3}>
          Currency: INR / USD
        </Text>
        <Switch mt={2} mr={10} onChange={toggleCurrency} />
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
            mr={5}
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
        <Flex
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
        </Flex>
      </Flex>
      {isLoading && <Spinner />}
      {isError && "something went wrong"}
      {!isLoading && (
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
          {currentItems?.map((item) => (
            <ImgCrate key={item._id} {...item} usd={usd} />
          ))}
        </Grid>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}

export default PaginatedItems;
