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
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";
import {
  nameAtoZ,
  nameZtoA,
  sortHighToLow,
  sortLowToHigh,
} from "../../redux/appReducer/action";
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

  const dispatch = useDispatch();

  const { jewelryItems, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );

  console.log(jewelryItems, "in paginate");

  // const handleChange = (e) => {
  //   let val = e.target.value;

  //   switch (val) {
  //     case "lth":
  //       return dispatch(sortLowToHigh());
  //     case "htl":
  //       return dispatch(sortHighToLow());
  //     case "a2z":
  //       return dispatch(nameAtoZ());
  //     case "z2a":
  //       return dispatch(nameZtoA());
  //     default:
  //       console.log("default");
  //   }
  // };

  const handleChange = ({ target: { textContent } }) => {
    console.log(textContent, "textContent");

    switch (textContent) {
      case "Price: Low-High":
        // return dispatch(sortLowToHigh());
        return dispatch({ type: SORT_LOW_TO_HIGH });
      case "Price: High-Low":
        // return dispatch(sortHighToLow());
        return dispatch({ type: SORT_HIGH_TO_LOW });
      case "Name: A-Z":
        // return dispatch(nameAtoZ());
        return dispatch({ type: NAME_A_TO_Z });
      case "Name: Z-A":
        // return dispatch(nameZtoA());
        return dispatch({ type: NAME_Z_TO_A });
      default:
        console.log("default");
    }
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(jewelryItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jewelryItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, jewelryItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jewelryItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Box>
        <Menu>
          <MenuButton
            fontSize={["13px", "16px"]}
            as={Button}
            rightIcon={<AiOutlineDown />}
          >
            Sort By
          </MenuButton>
          <MenuList zIndex={3}>
            <MenuItem onClick={handleChange}>Price: Low-High</MenuItem>
            <MenuItem onClick={handleChange}>Price: High-Low</MenuItem>
            <MenuItem onClick={handleChange}>Rating: Low-High</MenuItem>
            <MenuItem onClick={handleChange}>Rating: High-Low</MenuItem>
            <MenuItem onClick={handleChange}>Name: A-Z</MenuItem>
            <MenuItem onClick={handleChange}>Name: Z-A</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/* <Select onChange={handleChange} mt={0} w={150} fontSize="14px">
        <option value="htl">in paginate</option>
        <option value="lth">Best selling</option>
        <option value="a2z">Alphabetically, A-Z</option>
        <option value="z2a">Alphabetically, Z-A</option>
        <option value="lth">Price, low to high</option>
        <option value="htl">Price, high to low</option>
        <option value="a2z">Date, old to new</option>
        <option value="z2a">Date, new to old</option>
      </Select> */}
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
          {jewelryItems?.map((item) => (
            <ImgCrate key={item._id} {...item} />
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
