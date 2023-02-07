import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  text: string;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  isChecked: boolean;
  name: string;
  isFetching?: boolean;
  isUpdating?: boolean;
};

function SimpleSwitch({
  text,
  onChange,
  name,
  isChecked,
  isFetching,
  isUpdating,
}: Props) {
  return (
    <Flex justifyContent="space-between" mt="3">
      <Text fontSize={"smSubHead"} color="clique.text">
        {text}
      </Text>
      <Switch
        size="md"
        isDisabled={isFetching || isUpdating ? true : false}
        onChange={onChange}
        isChecked={isChecked}
        name={name}
      />
    </Flex>
  );
}

export default SimpleSwitch;
