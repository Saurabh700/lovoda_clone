import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import styles from "./InstaImg.module.css";
import data from "./InstaImgData.json";
import InstaImgCard from "./InstaImgCard";

const InstaImg = () => {
  console.log(data, "here it is");
  return (
    <div>
      <Grid
        className={styles.wrapper}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        <GridItem rowSpan={2} colSpan={2} bg="teal">
          {<InstaImgCard item={data[0]} />}
        </GridItem>
        <GridItem colSpan={1} bg="tomato">
          {<InstaImgCard item={data[1]} />}
        </GridItem>
        <GridItem colSpan={1} bg="orange">
          {<InstaImgCard item={data[2]} />}
        </GridItem>
        <GridItem colSpan={1} bg="purple">
          {<InstaImgCard item={data[3]} />}
        </GridItem>
        <GridItem colSpan={1} bg="crimson">
          {<InstaImgCard item={data[4]} />}
        </GridItem>
        <GridItem colSpan={2} rowSpan={2} bg="olive">
          {<InstaImgCard item={data[5]} />}
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="yellow">
          {<InstaImgCard item={data[6]} />}
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="green.100">
          {<InstaImgCard item={data[7]} />}
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="teal.100">
          {<InstaImgCard item={data[8]} />}
        </GridItem>
      </Grid>
      {/* ))} */}
    </div>
  );
};

export default InstaImg;
