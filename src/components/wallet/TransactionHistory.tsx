import {
  Box,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SortIcon from "@icons/SortIcon";
import React from "react";
import HistoryCard from "./HistoryCard";

type Props = {};

const TransactionHistory = (props: Props) => {
  return (
    <Box bg="clique.black" borderRadius="xl" p="5">
      <Flex justifyContent={"space-between"} pb="4">
        <Text fontSize={"1rem"}>Recent Transaction History</Text>
        <Icon as={SortIcon} />
      </Flex>
      <Divider mb="2"></Divider>
      <VStack spacing={1} align="stretch">
        {history.map((each) => {
          return (
            <HistoryCard
              key={each.id}
              amount={each.amount}
              credit={each.credit}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default TransactionHistory;

const history = [
  { amount: "₦83,200.00", credit: true, id: 1 },
  { amount: "₦83,200.00", credit: false, id: 2 },
  { amount: "₦83,200.00", credit: true, id: 3 },
  { amount: "₦83,200.00", credit: true, id: 4 },
  { amount: "₦83,200.00", credit: false, id: 5 },
  { amount: "₦83,200.00", credit: false, id: 6 },
  { amount: "₦83,200.00", credit: true, id: 7 },
];
