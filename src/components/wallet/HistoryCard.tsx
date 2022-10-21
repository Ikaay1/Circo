import { Flex, Icon, Text } from "@chakra-ui/react";
import DownwardIcon from "@icons/DownwardIcon";
import UpwardIcon from "@icons/UpwardIcon";

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

        <Text fontSize={"smSubHead"}>
          Clique Wallet {credit ? "credited " : "debited"} with
          <span style={{ color: `${credit ? "#22C55E" : "#BA1A1A"}` }}>
            {" " + amount}
          </span>
        </Text>
      </Flex>
      <Text fontSize={"smSubHead"}>1 hour</Text>
    </Flex>
  );
}

export default HistoryCard;
