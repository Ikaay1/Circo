import { Avatar, Flex } from "@chakra-ui/react";
import React from "react";

function AvataWithSpace({
  url,
  name,
  size,
  mr,
  ml,
  borderColor,
  borderThickness,
  avatarSize,
}: {
  url: string;
  name: string;
  size: string;
  mr?: string;
  ml?: string;
  borderColor?: string;
  borderThickness: string;
  avatarSize?: string;
}) {
  return (
    <Flex
      mr={mr}
      ml={ml}
      alignItems={"center"}
      justifyContent="center"
      p="2px"
      w={size}
      h={size}
      maxH={size}
      maxW={size}
      border={`${borderThickness} solid`}
      borderColor={borderColor}
      rounded="full"
    >
      <Avatar
        p="0"
        m="0"
        w={avatarSize}
        h={avatarSize}
        size="sm"
        name={name}
        src={url}
      />
    </Flex>
  );
}

export default AvataWithSpace;
