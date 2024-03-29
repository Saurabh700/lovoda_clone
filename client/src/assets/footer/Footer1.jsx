import {
  Box,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";
import { FaTiktok } from "react-icons/fa";
import styles from "./Footer1.module.css";
import { BsPinterest } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Footer1 = () => {
  return (
    <div>
      <hr />

      <div className={styles.wrapper}>
        <Flex className={styles.bottom}>
          <Grid
            className={styles.wrapper}
            w={["300px", "420px", "630px", "1050px"]}
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(2,1fr)",
              "repeat(2,1fr)",
            ]}
            gap={3}
          >
            <Box>
              <h1 className={styles.heading}>Info</h1>

              <Flex className={styles.items}>
                <Link>Search</Link>
                <Link>Terms of Service</Link>
                <Link>Refund policy</Link>
                <Link>Wholesale</Link>
                <Link>Wholesale Signup Form</Link>
                <Link>Shipping</Link>
              </Flex>

              <h1 className={styles.heading}>Subscribe to our emails</h1>

              <Stack
                className={styles.inputSection}
                w={["200px", "250px", "300px", "350px"]}
                spacing={4}
              >
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    children={
                      <Icon
                        as={AiOutlineArrowRight}
                        ml="auto"
                        mr="3"
                        h={5}
                        w={5}
                      />
                    }
                  />

                  <Input
                    className={styles.inputBox}
                    type="text"
                    placeholder="Email"
                  />
                </InputGroup>
              </Stack>
            </Box>
            <Box className={styles.rightBox}>
              <h1 className={styles.headingR}>Contact Us!</h1>
              <h2 className={styles.para}>
                Need to talk? Reach us via email, phone or text!
              </h2>
              <h2 className={styles.contact}>
                <p className={styles.contactInfo}>
                  Email: Customerservice@Lovoda.com
                </p>
                <p className={styles.contactInfo}>Phone: (443) 500-1200</p>
                <p className={styles.italic}>**Msg & data rates may apply</p>
              </h2>
              <Flex className={styles.socialIcons}>
                <Icon
                  className={styles.icon}
                  color="rgba(18, 18, 18)"
                  as={AiFillFacebook}
                  h={5}
                  w={5}
                />
                <Icon
                  className={styles.icon}
                  color="rgba(18, 18, 18)"
                  as={BsPinterest}
                  h={5}
                  w={5}
                />
                <Icon
                  className={styles.icon}
                  color="rgba(18, 18, 18)"
                  as={AiOutlineInstagram}
                  h={5}
                  w={5}
                />
                <Icon
                  className={styles.icon}
                  mb="0px"
                  ml="0px"
                  color="rgba(18, 18, 18)"
                  as={FaTiktok}
                  h={5}
                  w={5}
                />
              </Flex>
            </Box>
          </Grid>
          <hr />
        </Flex>
      </div>
      <hr />
    </div>
  );
};

export default Footer1;
