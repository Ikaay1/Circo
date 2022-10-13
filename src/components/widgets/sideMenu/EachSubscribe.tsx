import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function EachSubscribe({ name, imgUrl }: { name: string; imgUrl: string }) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Flex pl="50px" mt="15px" alignItems={"center"}>
      <Avatar size={"sm"} src={imgUrl} mr="10px" />
      <Text
        color={path === "/" + name ? "clique.base" : "clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
      >
        {name}
      </Text>
    </Flex>
  );
}

export default EachSubscribe;
