import { useRouter } from "next/router";
import React from "react";

import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";

function VideoThumb({
  imgUrl,
  id,
  length,
  thumbWidth,
}: {
  imgUrl: string;
  id: string;
  length: number;
  thumbWidth: { base: string; lg: string; mlg: string; xl: string };
}) {
  const router = useRouter();
  return (
    <Box
      cursor={"pointer"}
      w="full"
      onClick={() => router.push(`/player/${id}`)}
    >
      <Box
        bg="Red"
        h={{ lg: "130px", mlg: "180px" }}
        bgImage={`url(${imgUrl})`}
        bgSize="cover"
        bgPosition="center"
        rounded={"10px"}
      />

      <Flex mt="15px">
        <Avatar
          mr={"10px"}
          p="0"
          size="sm"
          name="Prosper Otemuyiwa"
          src={
            length === 4
              ? "/assets/ayarstar.png"
              : "https://bit.ly/prosper-baba"
          }
        />
        <Box>
          <Text
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"16px"}
            lineHeight={"1.2"}
          >
            What’s New in the 2023 Volkswagen Arteon, the pro’s and cons of our
            fav german auto
          </Text>

          <Text
            mt="5px"
            noOfLines={2}
            color={"clique.darkGrey"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"14px"}
            lineHeight={"1.2"}
          >
            {length === 4 ? "@ayrastar" : "@wenotch"}
          </Text>
          <Flex alignItems={"center"} mt="5px">
            <Text
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"14px"}
              lineHeight={"1.2"}
              mr="10px"
            >
              {length === 4 ? "1.5M" : "1.2k"} views
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
                background: "clique.darkGrey",
                height: "4px",
                rounded: "full",
              }}
              pl="10px"
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"14px"}
              lineHeight={"1.2"}
            >
              {length === 4 ? "3 hours" : "3 days"} ago
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default VideoThumb;
