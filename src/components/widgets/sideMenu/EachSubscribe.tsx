import { useRouter } from "next/router";
import React from "react";

import { Avatar, Box, Flex, Icon, Link, Text } from "@chakra-ui/react";

function EachSubscribe({
  name,
  imgUrl,
  firstName,
  lastName,
  id,
}: {
  name: string;
  imgUrl?: string;
  firstName: string;
  lastName: string;
  id: string;
}) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Link href={`/channel/subscribe/${id}`} textDecoration="none ">
      <Flex pl="50px" mt="15px" alignItems={"center"} cursor={"pointer"}>
        {imgUrl ? (
          <Avatar size={"sm"} src={imgUrl} mr="10px" />
        ) : (
          <Avatar
            size="sm"
            name={firstName + " " + lastName}
            borderColor="clique.greenYellow"
            mr="10px"
          />
        )}
        <Text
          color={path === "/" + name ? "clique.base" : "clique.whiteGrey"}
          fontFamily={"Unbounded"}
          fontWeight={500}
          textTransform={"capitalize"}
        >
          {name}
        </Text>
      </Flex>
    </Link>
  );
}

export default EachSubscribe;
