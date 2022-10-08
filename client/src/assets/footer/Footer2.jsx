import React from "react";
import styles from "./Footer2.module.css";
import { BiCopyright } from "react-icons/bi";
import { Flex, Icon } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

const Footer2 = () => {
  return (
    <div className={styles.wrapper}>
      <Flex>
        <img
          className={styles.paymentCard}
          src="https://www.launchtip.com/wp-content/webpc-passthru.php?src=https://www.launchtip.com/wp-content/uploads/2021/04/Screenshot-2021-05-01-at-18.06.24.png&nocache=1"
          alt=""
        />
      </Flex>

      <Flex className={styles.icon} justifyContent="center">
        <Icon
          color="rgba(18, 18, 18)"
          as={BiCopyright}
          h={2}
          mt={1}
          w={2}
          mr={1}
        />
        Made with{" "}
        <Flex m={"3px"} h={5}>
          <AiFillHeart color="red" />
        </Flex>{" "}
        by Saurabh Patel
      </Flex>
    </div>
  );
};

export default Footer2;
