import {
  Box,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

type Props = {};

function WithdrawalCard({}: Props) {
  return (
    <Box bg="clique.black" borderRadius="xl" py="7" mb="5" px="5">
      <Text fontSize={"smHead"} mb="2">
        Withdrawal
      </Text>
      <Divider mb="1" />

      <Text fontSize={"xsl"} mb="2">
        Recent withdrawal history{" "}
      </Text>
      <TableContainer>
        <Table variant="unstyled" size="sm" fontSize="10px">
          <Thead>
            <Tr color="clique.text">
              <Th fontSize="xsl" textTransform={"none"} pl="0">
                Name
              </Th>
              <Th fontSize="xsl" textTransform={"none"}>
                Amount
              </Th>
              <Th fontSize="xsl" textTransform={"none"}>
                Bank
              </Th>
            </Tr>
          </Thead>
          <Tbody className="no-wrap">
            {withdrawalHistory.map((each, i) => {
              return (
                <Tr key={i}>
                  <Td fontSize="xsl" pl="0">
                    {each.name}
                  </Td>
                  <Td isNumeric fontSize="xsl">
                    {each.amount}
                  </Td>
                  <Td fontSize="xsl">{each.bank}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Text color="clique.red" fontSize="xsl" textAlign="center" mt="3">
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
