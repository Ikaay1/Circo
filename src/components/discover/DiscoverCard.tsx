import { Box, Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import { useRouter } from "next/router";
import React from "react";

function DiscoverCard() {
  const router = useRouter();
  return (
    <Box
      onClick={() => router.push("/player/1")}
      cursor={"pointer"}
      h="280px"
      bgImage={"/assets/temsimg.png"}
      bgSize="cover"
      bgPosition={"center"}
      bgRepeat="no-repeat"
      rounded={"20px"}
      px="30px"
    >
      <Text
        py="20px"
        position={"relative"}
        w="60%"
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={700}
        textTransform={"capitalize"}
        fontSize="bigHead"
        lineHeight={"1.2"}
      >
        Ellas List on 9JA’s Hottest artists!!
      </Text>{" "}
      <Flex mt="30px">
        <AvataWithSpace
          mr="10px"
          name="Prosper Otemuyiwa"
          url="https://bit.ly/prosper-baba"
          size="60px"
          borderColor="clique.greenYellow"
          borderThickness="4px"
          avatarSize="45px"
        />

        <Box>
          <Text
            fontFamily={"Poppins"}
            fontSize="subHead"
            color={"clique.white"}
          >
            Emma
          </Text>
          <Flex mt="5px" alignItems={"center"}>
            <Text
              noOfLines={2}
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"subHead"}
              lineHeight={"1.2"}
              mr="10px"
            >
              1.2k views
            </Text>
            <Text
              pos={"relative"}
              _before={{
                content: '""',
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 0,
                width: "4px",
                background: "clique.lightGrey",
                height: "4px",
                rounded: "full",
              }}
              pl="10px"
              noOfLines={2}
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"subHead"}
              lineHeight={"1.2"}
            >
              3 days ago
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DiscoverCard;
