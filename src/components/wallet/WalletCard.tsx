import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import Color from "@constants/color";

type Props = {
  onClick: () => void;
  walletData: any;
};

export default function WalletCard({ onClick, walletData }: Props) {
  const handleMoneyIn = () => {
    let num = 0;
    walletData?.transaction_history?.forEach((history: any) => {
      if (history.type === "deposit" || history.type === "transferIn") {
        num += history?.amount;
      }
    });
    return num;
  };

  const handleMoneyOut = () => {
    let num = 0;
    walletData?.transaction_history?.forEach((history: any) => {
      if (history?.type === "withdraw" || history?.type === "transferOut") {
        num += history?.amount;
      }
    });
    return num;
  };

  return (
    <Box bg={Color().whiteAndBlack} borderRadius="xl" p="5">
      <Box>
        <Text fontSize={"smHead"} mb="2">
          Wallet
        </Text>
      </Box>
      <Divider bg="clique.blackGrey" mb="3"></Divider>
      <SimpleGrid columns={{ base: 2, lg: 3 }} gap={10}>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <Flex flexDirection="column" justifyContent="space-between">
            <Text color="clique.text" fontSize={"smSubHead"} mb="7">
              Balance
            </Text>

            <Text fontSize={"head"} mb="4" fontWeight={600}>
              ₦{walletData.balance}
            </Text>
            <Btn
              text="Fund wallet"
              bg="linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)"
              onClick={onClick}
              maxW={"100%"}
            ></Btn>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex flexDirection="column" justifyContent="space-between">
            <Text color="clique.text" fontSize={"smSubHead"} mb="7">
              Total flow
            </Text>
            <Text fontSize={"subHead"} mb="8" fontWeight={400}>
              ₦{handleMoneyIn() ? handleMoneyIn() : 0}
            </Text>
            <Text fontSize={"xs"} color="clique.text">
              This is the total amount of money that has come into your wallet
            </Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex flexDirection="column" justifyContent="space-between">
            <Text color="clique.text" fontSize={"smSubHead"} mb="7">
              Total Outflow
            </Text>
            <Text fontSize={"subHead"} mb="8" fontWeight={400}>
              ₦{handleMoneyOut() ? handleMoneyOut() : 0}
            </Text>
            <Text fontSize={"xs"} color="clique.text">
              This is the total amount of money that has gone out of your wallet
            </Text>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
