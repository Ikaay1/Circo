import {
  Box,
  Divider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

function WithdrawalCard({}: Props) {
  return (
    <Box bg="clique.black" borderRadius="xl" py="7" mb="5" px="5">
      <Text fontSize={"1.25rem"} mb="2">
        Withdrawal
      </Text>
      <Divider mb="1" />

      <Text fontSize={"0.7rem"} mb="2">
        Recent withdrawal history{" "}
      </Text>
      <TableContainer>
      <Table variant="unstyled" size="sm" fontSize="10px">
        <Thead>
          <Tr color="clique.text">
            <Th fontSize="0.7rem" textTransform={"none"} pl="0">
              Name
            </Th>
            <Th fontSize="0.7rem" textTransform={"none"}>
              Amount
            </Th>
            <Th fontSize="0.7rem" textTransform={"none"}>
              Bank
            </Th>
          </Tr>
        </Thead>
        <Tbody className="no-wrap">
          {withdrawalHistory.map((each, i) => {
            return (
              <Tr key={i} fontSize="0.813rem">
                <Td fontSize="0.7rem" pl="0">
                  {each.name}
                </Td>
                <Td isNumeric fontSize="0.7rem">
                  {each.amount}
                </Td>
                <Td fontSize="0.7rem">{each.bank}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </TableContainer>
      <Text color="clique.danger" fontSize="0.7rem" textAlign="center" mt="3">
        Note: Withdrawal is automated by Clique and is sent to your added
        beneficiary account on the 25th of every month.
      </Text>
    </Box>
  );
}

export default WithdrawalCard;

const withdrawalHistory = [
  { name: "Tony Kent Clark", amount: "₦300,000.00", bank: "ZENITH BANK" },
  { name: "Tony Kent Clark", amount: "₦300,000.00", bank: "ZENITH BANK" },
  { name: "Tony Kent Clark", amount: "₦300,000.00", bank: "ZENITH BANK" },
  { name: "Tony Kent Clark", amount: "₦300,000.00", bank: "ZENITH BANK" },
];
