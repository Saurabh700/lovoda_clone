import { Box, Flex, Grid, Select, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ImgCrate from "../../assets/allAboutEffects/ImgCrate/ImgCrate";

function PaginatedItems() {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { jewelryItems, isLoading, isError } = useSelector((store) => {
    return {
      jewelryItems: store.AppReducer.jewelryItems,
      isLoading: store.AppReducer.isLoading,
      isError: store.AppReducer.isError,
    };
  });

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
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
          {currentItems?.map((item) => (
            <ImgCrate key={item.id} {...item} />
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
