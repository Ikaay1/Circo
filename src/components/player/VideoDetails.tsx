import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useSubscribeMutation } from "redux/services/user.service";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import Color from "@constants/color";

import { contentData } from "../../constants/utils";
import ShareIcon from "@icons/ShareIcon";
import CopyBox from "./CopyBox";

function VideoDetails({
  video,
  subscribers,
}: {
  video: contentData;
  subscribers: string[];
}) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const blackAndWhite = Color().blackAndWhite2;

  return (
    <Box mt="20px">
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="smHead"
      >
        {video.title}
      </Text>
      <Flex my="10px" justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Flex
            mr="20px"
            alignItems={"center"}
            justifyContent="center"
            p="4px"
            border={"4px solid"}
            borderColor="clique.base"
            rounded="full"
          >
            <WrapItem>
              <Avatar
                size="md"
                name={
                  video.uploader_id.firstName + " " + video.uploader_id.lastName
                }
                src={video?.channel_id?.photo}
                cursor="pointer"
              />
            </WrapItem>
          </Flex>

          <Box>
            <Text
              noOfLines={2}
              color={Color().blackAndWhite}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="subHead"
              lineHeight={"1.2"}
              cursor="pointer"
              onClick={() => {}}
            >
              {`${
                video.uploader_id.firstName[0].toUpperCase() +
                video.uploader_id.firstName.slice(1)
              } ${
                video.uploader_id.lastName[0].toUpperCase() +
                video.uploader_id.lastName.slice(1)
              }`}{" "}
              <Box
                as="span"
                fontSize="sm"
              >{`(${video?.channel_id?.name})`}</Box>
            </Text>
            <Text
              mt="5px"
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="smSubHead"
              lineHeight={"1.2"}
            >
              {`${subscribers.length} ${
                subscribers.length === 1 ? "subscriber" : "subscribers"
              }`}
            </Text>
          </Box>
        </Flex>

        <Flex alignItems={"center"}>
          <Box
            mr="1rem"
            cursor="pointer"
            onClick={() => {
              onOpen();
            }}
          >
            <Icon as={ShareIcon} color={blackAndWhite} />
          </Box>{" "}
          <Box
            p=".6rem 1.2rem"
            rounded="full"
            fontWeight={400}
            bg={"clique.base"}
            color="clique.white"
            cursor={"default"}
          >
            Subscribe
          </Box>
        </Flex>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position="absolute"
            left={"50%"}
            transform={"translate(-50%, 60%)"}
            w={{ base: "100%", lg: "auto" }}
          >
            <CopyBox link={`${video.channel_id?.name}/player/${video?._id}`} />
          </Box>
        </ModalContent>
      </Modal>
      <Text
        mt="5px"
        noOfLines={2}
        color={"clique.darkGrey"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.2"}
      >
        Video Description
      </Text>{" "}
      <Text
        mt="5px"
        color={Color().blackAndWhite}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.5"}
        w="70%"
      >
        {video.description}
      </Text>
    </Box>
  );
}

export default VideoDetails;
