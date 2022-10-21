import { Box, Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import React from "react";
import SubcribeOverLay from "./SubcribeOverLay";
import SubscribeBody from "./SubscribeBody";

function SubscriptionCard() {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <Flex
      cursor={"pointer"}
      minW="420px"
      mr="20px"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover ? <SubscribeBody /> : <SubcribeOverLay isHover={isHover} />}
    </Flex>
  );
}

export default SubscriptionCard;
