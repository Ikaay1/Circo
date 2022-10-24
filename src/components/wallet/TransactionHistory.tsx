import { Box, Divider, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { ReceiptInfo } from "@constants/interface";
import SortIcon from "@icons/SortIcon";
import HistoryCard from "./HistoryCard";

type Props = {
  onClick: () => void;
  click: (info: ReceiptInfo) => void;
};

const TransactionHistory = (props: Props) => {
  return (
    <Box bg="clique.black" borderRadius="xl" p="5">
      <Flex justifyContent={"space-between"} pb="4">
        <Text fontSize={"subHead"}>Recent Transaction History</Text>
        <Icon
          as={SortIcon}
          onClick={props.onClick}
          sx={{ cursor: "pointer" }}
        />
      </Flex>
      <Divider mb="2"></Divider>
      <VStack spacing={1} align="stretch">
        {history.map((each) => {
          const info: ReceiptInfo = {
            name: each.name,
            duration: each.duration,
            date: each.date,
            reference: each.reference,
            description: each.description,
          };
          return (
            <HistoryCard
              key={each.id}
              amount={each.amount}
              credit={each.credit}
              duration={each.duration}
              onClick={()=>props.click(info)}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default TransactionHistory;

const history = [
  {
    amount: "₦83,200.00",
    credit: true,
    id: 1,
    name: "Emmanuel Edward",
    duration: "1 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The OsigieTube",
  },
  {
    amount: "₦83,200.00",
    credit: false,
    id: 2,
    name: "Emmanuel Edward",
    duration: "5 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The OsaoseTube",
  },
  {
    amount: "₦83,200.00",
    credit: true,
    id: 3,
    name: "Emmanuel Edward",
    duration: "8 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The IwinosaTube",
  },
  {
    amount: "₦83,200.00",
    credit: true,
    id: 4,
    name: "Emmanuel Edward",
    duration: "5 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The DoreenTube",
  },
  {
    amount: "₦83,200.00",
    credit: false,
    id: 5,
    name: "Emmanuel Edward",
    duration: "2 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The BurnaTube",
  },
  {
    amount: "₦83,200.00",
    credit: false,
    id: 6,
    name: "Emmanuel Edward",
    duration: "1 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The SantanDaveTube",
  },
  {
    amount: "₦83,200.00",
    credit: true,
    id: 7,
    name: "Emmanuel Edward",
    duration: "3 hour",
    date: "8/19/2022",
    reference: "7EB8ENEE0J8E0EHEE0",
    description: "Subscription to The RemaTube",
  },
];
