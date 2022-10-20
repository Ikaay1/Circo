import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import SortIcon from "@icons/SortIcon";
import UpwardIcon from "@icons/UpwardIcon";
import DownwardIcon from "@icons/DownwardIcon";
import React from "react";

type Props = {
  credit: boolean;
  amount: string;
};

function HistoryCard({ credit, amount }: Props) {
  const iconArg = credit ? UpwardIcon : DownwardIcon;
  return (
    <Flex
      align="center"
      justifyContent={"space-between"}
      borderRadius="xl"
      bg="clique.secondaryGrey1"
      px="4"
      py="3"
    >
      <Flex align={"center"}>
        <Icon as={iconArg} fontSize="3xl" mr="2" />

        <Text fontSize={"0.7rem"}>
          Clique Wallet {credit ? "credited " : "debited"} with
          <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
            {" " + amount}
          </span>
        </Text>
      </Flex>
      <Text fontSize={"0.7rem"}>1 hour</Text>
    </Flex>
  );
}

export default HistoryCard;
