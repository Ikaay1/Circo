import React from "react";

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import { useRouter } from "next/router";

function CreatorAvatarBox({ user }: { user: any }) {
  const router = useRouter();
  return (
    <Flex
      cursor={"pointer"}
      justifyContent={"center"}
      onClick={() => router.push(`/channel/subscribe/${user?._id}`)}
      alignItems="center"
      flexDir={"column"}
    >
      {user.photo ? (
        <AvataWithSpace
          name="Prosper Otemuyiwa"
          url={user.photo}
          size="45px"
          borderColor="clique.brown"
          borderThickness="3px"
        />
      ) : (
        <Avatar
          size="md"
          name={user.firstName + " " + user.lastName}
          borderColor="clique.greenYellow"
        />
      )}
      <Text
        mt="5px"
        fontFamily={"Poppins"}
        fontSize="smSubHead"
        color={"clique.lightGrey"}
        noOfLines={1}
      >
        {user.userName.slice(0, 8)}
        {user.userName.length > 8 ? "..." : ""}
      </Text>
    </Flex>
  );
}

export default CreatorAvatarBox;
