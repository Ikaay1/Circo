import { MouseEventHandler } from "react";

import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import DownwardIcon from "@icons/DownwardIcon";
import UpwardIcon from "@icons/UpwardIcon";

type Props = {
  credit: boolean;
  amount: string;
  duration: string;
  onClick: () => void;
  item: any;
};

function HistoryCard({ credit, amount, onClick, duration, item }: Props) {
  const iconArg = credit ? UpwardIcon : DownwardIcon;
  return (
    <Flex
      align="center"
      justifyContent={"space-between"}
      borderRadius="xl"
      bg={useColorModeValue("clique.lightPrimaryBg", "clique.secondaryGrey1")}
      px={{ base: "1", lg: "4" }}
      py="3"
      onClick={onClick}
      cursor="pointer"
      _hover={{
        bg: "rgba(35, 35, 35, .1)",
      }}
    >
      <Flex align={"center"}>
        <Icon as={iconArg} fontSize="3xl" mr="2" />

        {item.type === "deposit" && (
          <Text fontSize={"smSubHead"}>
            Circo Wallet Credited
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferIn" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            {item.sender} Subscribed
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferInLive" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            {item.sender} Paid for live
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferInGift" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            {item.sender} Sent a gift
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferOut" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            You subscribed to {item.recipient}
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferOutLive" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            You paid for {item.recipient} live event
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}

        {item.type === "transferOutGift" && (
          <Text fontSize={"smSubHead"} textTransform="capitalize">
            You sent a gift to {item.recipient}
            <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
              {" " + "₦" + amount}
            </span>
          </Text>
        )}
      </Flex>
      <Text fontSize={"smSubHead"}>{duration}</Text>
    </Flex>
  );
}

export default HistoryCard;
