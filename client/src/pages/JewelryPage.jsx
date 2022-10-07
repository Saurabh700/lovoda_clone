import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Icon, Image } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import { RiWechatLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const JewelryPage = () => {
  const params = useParams();
  const [count, setCount] = useState(1);
  const [switchImg, setSwitchImg] = useState(false);
  const id = params.id;

  const { jewelryItems, isLoading, isError } = useSelector((store) => {
    return {
      jewelryItems: store.AppReducer.jewelryItems,
      isLoading: store.AppReducer.isLoading,
      isError: store.AppReducer.isError,
    };
  });

  const jewel = jewelryItems.filter((item) => item._id === id);
  return (
    <div style={{ marginBottom: "50px" }}>
      {jewel.map((item) => (
        <Flex
          textAlign="left"
          fontWeight={"400"}
          fontSize="13px"
          w={["1100px"]}
          m={"auto"}
          justifyContent="space-between"
        >
          <Box onClick={() => setSwitchImg(!switchImg)} w={["715px"]}>
            {switchImg ? (
              <Image
                w={"100%"}
                h={["1074px"]}
                m={"40px 10px 10px 10px"}
                src={item.flash}
                alt="flash"
              />
            ) : (
              <Image
                w={"100%"}
                h={["1074px"]}
                m={"40px 10px 10px 10px"}
                src={item.front}
                alt="front"
              />
            )}
          </Box>
          <Box w={["345px"]} ml={"10px"}>
            <Heading
              fontSize={"40px"}
              fontWeight={"400"}
              textAlign={"left"}
              letterSpacing={"0.3rem"}
              lineHeight={"52px"}
              mb="15px"
              w={["345px"]}
              mt="50px"
            >
              {item.title}
            </Heading>
            <Flex justifyContent={"flex-start"}>
              <Icon w={5} h={5} color="#c9ac92" as={AiOutlineStar} />
              <Icon w={5} h={5} color="#c9ac92" as={AiOutlineStar} />
              <Icon w={5} h={5} color="#c9ac92" as={AiOutlineStar} />
              <Icon w={5} h={5} color="#c9ac92" as={AiOutlineStar} />
              <Icon w={5} h={5} color="#c9ac92" as={AiOutlineStar} />
              <p
                style={{
                  marginTop: "-2px",
                  marginLeft: "3px",
                  fontSize: "16px",
                }}
              >
                write a review
              </p>
            </Flex>
            <div
              style={{
                display: "flex",
                justifyContext: "flexStart",
                marginTop: "5px",
              }}
            >
              | <Icon w={6} h={6} ml={3} mr={3} as={RiWechatLine}></Icon> Ask a
              question
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "400",
                marginTop: "20px",
              }}
            >
              $ {item.cost}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "rgb(178, 252, 228)",
                  borderRadius: "200px",
                  color: "black",
                  width: "100px",
                  marginTop: "20px",
                  height: "25px",
                  paddingLeft: "27px",
                  paddingTop: "3px",
                }}
              >
                afterpay
              </div>
              <span
                style={{
                  marginTop: "20px",
                  paddingLeft: "5px",
                  textAlign: "left",
                }}
              >
                available for orders between $35 to $1000
              </span>
            </div>
            <div style={{ textAlign: "left", marginTop: "15px" }}>
              Pay in 4 iterest-free installments for orders over $50 with
              ShopPay
            </div>
            <div style={{ marginTop: "20px" }}>Quantity</div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                marginTop: "10px",
                padding: "5px 10px 5px 10px",
                width: "100px",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setCount(count - 1)}
              >
                -
              </div>
              <div>{count}</div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setCount(count + 1)}
              >
                +
              </div>
            </div>
            <Button
              p={"5px 10px"}
              m="5px"
              w={"100%"}
              _hover={{ backgroundColor: "white", border: "1px solid #edf2f7" }}
            >
              Add to Cart
            </Button>
            <Button
              p={"5px 10px"}
              m="5px"
              w={"100%"}
              _hover={{ backgroundColor: "white", border: "1px solid #edf2f7" }}
            >
              Add to Wishlist
            </Button>
            <Button
              w={"100%"}
              p={"5px 10px"}
              m="5px"
              backgroundColor="black"
              color="white"
              _hover={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              }}
            >
              Buy it now
            </Button>
          </Box>
        </Flex>
      ))}
    </div>
  );
};

export default JewelryPage;
