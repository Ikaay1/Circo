import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  details: string;
};

export default function DetailCard({ title, details }: Props) {
  return (
    <Box bg="clique.secondaryGrey1" px="2" py="3" borderRadius={"10px"}>
      <Text
        fontSize={"0.875rem"}
        fontWeight="400"
        mb="1"
        color={"clique.secondaryGrey2"}
      >
        {title}
      </Text>
      <Text fontWeight="400" fontSize={"0.75rem"}>{details}</Text>
    </Box>
  );
}
