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
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();

  const { token } = useAppSelector((store) => store.app.userReducer);

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
                onClick={() => {
                  if (token) {
                    video.uploader_id._id === userProfile._id
                      ? () => router.push("/myChannel/content")
                      : () =>
                          router.push(`/channel/${video?.channel_id?.name}`);
                  }
                }}
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
              onClick={() => {
                if (token) {
                  video.uploader_id._id === userProfile._id
                    ? () => router.push("/myChannel/content")
                    : () => router.push(`/channel/${video?.channel_id?.name}`);
                }
              }}
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
        {token && video.uploader_id._id !== userProfile._id && (
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
              bg={
                subscribers.includes(userProfile._id)
                  ? "clique.grey"
                  : "clique.base"
              }
              color="clique.white"
              onClick={
                !subscribers.includes(userProfile._id)
                  ? () => router.push(`/channel/${video?.channel_id?.name}`)
                  : () => {}
              }
              cursor={
                !subscribers.includes(userProfile._id) ? "pointer" : "default"
              }
            >
              {subscribers.includes(userProfile._id)
                ? "Subscribed"
                : "Subscribe"}
            </Box>
          </Flex>
        )}
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
