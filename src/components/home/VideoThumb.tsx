import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function VideoThumb({ imgUrl, id }: { imgUrl: string; id: string }) {
  const router = useRouter();
  return (
    <Box cursor={"pointer"} onClick={() => router.push(`player/${id}`)}>
      <Image
        w={{ lg: "220px", mlg: "280px" }}
        h={{ lg: "130px", mlg: "180px" }}
        maxW="280px"
        maxH="200px"
        alt="video thumbnail"
        src={imgUrl}
        borderRadius={"10px"}
      />

      <Flex mt="15px">
        <Avatar
          mr={"10px"}
          p="0"
          size="sm"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
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
            @wenotch
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
              3 days ago
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default VideoThumb;
