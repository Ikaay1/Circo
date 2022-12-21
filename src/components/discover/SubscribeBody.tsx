import React from "react";

import { Avatar, Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

function SubscribeBody({ user }: { user: any }) {
  return (
    <Flex
      h="220px"
      w="full"
      bgImage={user.photo ? user.photo : "/assets/linear-gradient.png"}
      bgSize="cover"
      bgPosition={"center"}
      bgRepeat="no-repeat"
      rounded={"20px"}
    >
      <Flex
        backgroundColor={user.photo && "rgba(0, 0, 0, 0.6)"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent="space-between"
        w="100%"
        h="100%"
        px="30px"
        py="10px"
        rounded={"20px"}
      >
        <Flex>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            flexDir={"column"}
          >
            {user?.photo ? (
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
              fontFamily={"Unbounded"}
              fontSize="smSubHead"
              color={"clique.white"}
            >
              {user.userName}
            </Text>
          </Flex>
        </Flex>
        <Flex
          mt="5px"
          alignItems={"center"}
          justifyContent="space-between"
          w="100%"
        >
          <Text
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Unbounded"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.2"}
            mr="10px"
            w="55%"
          >
            {user.bio}
          </Text>
          <Text
            pos={"relative"}
            pl="10px"
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Unbounded"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.2"}
          >
            - {user.userName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SubscribeBody;
