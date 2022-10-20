import { Box, Text } from "@chakra-ui/react";
import React from "react";
import BeneficiariesCard from "./BeneficiariesCard";
import WithdrawalCard from "./WithdrawalCard";

type Props = {
  onClick:()=>void
};

function Beneficiaries({onClick}: Props) {
  return (
    <Box pr="2" pt="6">
      <BeneficiariesCard onClick={onClick}/>
      <WithdrawalCard />
    </Box>
  );
}

export default Beneficiaries;
