import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent} from "react";

type Props = {
  title: string;
  input: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputChangeArea: (event: ChangeEvent<HTMLTextAreaElement> ) => void;
  valueArea: string;
};

export default function DetailCard({
  title,
  input,
  value,
  handleInputChange,
  valueArea,
  handleInputChangeArea
}: Props) {
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
      {input ? (
        <Input variant="filled" value={value} onChange={handleInputChange} bg="clique.secondaryGrey1"/>
      ) : (
        <Textarea
          variant="filled"
          value={valueArea}
          onChange={handleInputChangeArea}
          bg="clique.secondaryGrey1"
        />
      )}
    </Box>
  );
}
