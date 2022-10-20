import { Box, Button, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import Btn from "@components/Button/btn";
import tickSquare from "@icons/UploadIcon copy";
import React from "react";

type Props = {
  onClick: () => void;
};

function BeneficiariesCard({ onClick }: Props) {
  return (
    <Box py="7" mb="5" bg="clique.black" borderRadius="xl" px="6">
      <Text fontSize={"1.25rem"} mb="2">
        Beneficiaries
      </Text>
      <Divider mb="5" />
      <Flex bg="clique.blackGrey" borderRadius="xl" p="2" align="center" mb="7">
        <Icon as={tickSquare} mr="3" fontSize={"xl"}></Icon>
        <Box>
          <Text fontSize={"0.8rem"}>Tony Kent Clark</Text>
          <Flex color="clique.text">
            <Text mr="2" fontSize={"0.6rem"}>
              ZENITH BANK PLC
            </Text>
            <Text fontSize={"0.6rem"}>1020897654</Text>
          </Flex>
        </Box>
      </Flex>
          
        <Btn
          text="Change beneficiary"
          style={{width:"100%"}}
          py="7"
          onClick={onClick}
        ></Btn>
    </Box>
  );
}

export default BeneficiariesCard;
