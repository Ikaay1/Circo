import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

import { contentData } from "../../constants/utils";
import Color from "@constants/color";

function TrendCard({
  position,
  video,
}: {
  position: string;
  video: contentData;
}) {
  const router = useRouter();

  return (
    <Flex
      onClick={() => router.push("/player/" + video._id)}
      cursor={"pointer"}
      position={"relative"}
      _before={{
        content: `"${position}"`,
        position: "absolute",
        fontSize: "big",
        left: "-20px",
        top: "-35px",
        color: "clique.base",
        fontWeight: 500,
      }}
      alignItems={"center"}
      rounded={"20px"}
      px="30px"
      py="20px"
      mt="30px"
      h="220px"
      bg="clique.white"
    >
      <Box w="300px" pr="40px" h="100%">
        <Image
          maxH={"100%"}
          h="100%"
          w="100%"
          objectFit={"cover"}
          src={video.thumbNail}
          alt="kortyvid"
        />
      </Box>

      <Box w="50%">
        <Flex>
          {video.uploader_id?.photo ? (
            <AvataWithSpace
              mr="10px"
              name="Prosper Otemuyiwa"
              url={video.uploader_id.photo}
              size="45px"
              borderColor="clique.brown"
              borderThickness="3px"
            />
          ) : (
            <Avatar
              size="md"
              name={
                video.uploader_id.firstName + " " + video.uploader_id.lastName
              }
              mr="10px"
              borderColor="clique.greenYellow"
            />
          )}

          <Box>
            <Text
              fontFamily={"Poppins"}
              fontSize="smSubHead"
              color={"clique.lightGrey"}
              noOfLines={1}
            >
              {video.uploader_id?.userName}
            </Text>
            <Flex mt="5px" alignItems={"center"}>
              <Text
                noOfLines={2}
                color={"clique.lightGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
                mr="10px"
              >
                {video.view} {video.view !== 1 ? "views" : "view"}
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
                color={"clique.lightGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {moment(video?.createdAt).fromNow()}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Text
          mt="5px"
          color="clique.black"
          fontFamily={"Poppins"}
          fontWeight={700}
          textTransform={"capitalize"}
          fontSize="head"
          noOfLines={2}
        >
          {video.title}
        </Text>

        <Text
          fontFamily={"Poppins"}
          fontSize="smSubHead"
          color={"clique.lightGrey"}
          noOfLines={4}
        >
          {video.description}
        </Text>
      </Box>
    </Flex>
  );
}

export default TrendCard;
