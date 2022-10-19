import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { purpleBoxStyle } from "@constants/utils";
import React from "react";
import CreatorAvatarBox from "./CreatorAvatarBox";
import SearchProgressBar from "./SearchProgressBar";

function PopularBox() {
  return (
    <Box minW={"30%"} maxW="30%" h="100%">
      <Text
        position={"relative"}
        pl="20px"
        _before={{ ...purpleBoxStyle, background: "clique.lightBase" }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="25px"
        lineHeight={"1"}
      >
        Popular Creators
      </Text>

      <SimpleGrid
        h="220px"
        bg="clique.white"
        spacingX={"10px"}
        columns={3}
        rounded={"20px"}
        p="20px"
        mt="30px"
      >
        <CreatorAvatarBox />
        <CreatorAvatarBox />
        <CreatorAvatarBox />
        <CreatorAvatarBox />
        <CreatorAvatarBox />
        <CreatorAvatarBox />
      </SimpleGrid>

      <Text
        mt="30px"
        position={"relative"}
        pl="20px"
        _before={{ ...purpleBoxStyle, background: "clique.lightBase" }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="25px"
        lineHeight={"1"}
      >
        Top Searches
      </Text>

      <Box
        bgImage={"/assets/searchbg.png"}
        bgPosition={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        rounded={"20px"}
        px="30px"
        py="40px"
        mt="30px"
      >
        <SearchProgressBar />
        <SearchProgressBar />
        <SearchProgressBar />
        <SearchProgressBar />
        <SearchProgressBar />
        <SearchProgressBar />
        <SearchProgressBar />
      </Box>
    </Box>
  );
}

export default PopularBox;
