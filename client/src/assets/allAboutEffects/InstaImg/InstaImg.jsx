import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import data from "./InstaImgData.json";
import InstaImgCard from "./InstaImgCard";

const InstaImg = () => {
  return (
    <div>
      <Grid
        m={"auto"}
        w={["210px", "420px", "630px", "950px"]}
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={2}
      >
        <GridItem rowSpan={[1, 2, 2, 2]} colSpan={[1, 2, 2, 2]}>
          {<InstaImgCard item={data[0]} />}
        </GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[1]} />}</GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[2]} />}</GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[3]} />}</GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[4]} />}</GridItem>

        <GridItem colSpan={[1, 2, 2, 2]} rowSpan={[1, 2, 2, 2]}>
          {<InstaImgCard item={data[5]} />}
        </GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[6]} />}</GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[7]} />}</GridItem>

        <GridItem colSpan={1}>{<InstaImgCard item={data[8]} />}</GridItem>
      </Grid>
    </div>
  );
};

export default InstaImg;
