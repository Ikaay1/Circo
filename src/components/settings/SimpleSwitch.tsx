import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  text: string;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  isChecked: boolean;
  name: string;
};

function SimpleSwitch({ text, onChange, name, isChecked }: Props) {
  return (
    <Flex justifyContent="space-between" mt="3">
      <Text fontSize={"smSubHead"} color="clique.text">
        {text}
      </Text>
      <Switch size="md" onChange={onChange} isChecked={isChecked} name={name} />
    </Flex>
  );
}

export default SimpleSwitch;
