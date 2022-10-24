import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  text: string;
};

function SimpleSwitch({ text }: Props) {
  return (
    <Flex justifyContent="space-between" mt="3">
      <Text fontSize={"smSubHead"} color="clique.text">
        {text}
      </Text>
      <Switch size="md"  />
    </Flex>
  );
}

export default SimpleSwitch;
