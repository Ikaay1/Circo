import { useRouter } from "next/router";
import React from "react";

import {
  Box,
  Circle,
  Flex,
  Icon,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { playListData, scrollBarStyle } from "@constants/utils";
import AddPlaylistIcon from "@icons/AddPlaylistIcon";

import VideoIcon from "../../assets/icons/VideoIcon";
import NewPlaylist from "./NewPlaylist";
import { useGetPlaylistQuery } from "redux/services/playlist.service";

const Playlists = ({ newPlaylist }: { newPlaylist: boolean }) => {
  const { data, isLoading } = useGetPlaylistQuery("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <>
      {newPlaylist && (
        <Text
          display="flex"
          alignItems={"center"}
          fontSize="head"
          lineHeight="32px"
          color="clique.white"
        >
          New Playlist{" "}
          <Box
            onClick={() => {
              onOpen();
            }}
          >
            <Icon as={AddPlaylistIcon} />
          </Box>
        </Text>
      )}

      <SimpleGrid
        autoColumns={"300px"}
        mt="20px"
        columns={{ base: 1, lg: 3, mlg: 3, xl: 4 }}
        w={"100%"}
        spacing={"30px"}
      >
        {data?.data?.playlists?.map((each: any) => (
          <Box key={each?._id}>
            <Box
              h={{ lg: "130px", mlg: "180px" }}
              maxH="200px"
              position={"relative"}
              cursor={"pointer"}
              onClick={
                router.asPath.split("/")[1] === "profile"
                  ? () => router.push("/profile/1/content/playlist")
                  : () => router.push(`/channel/1/content/playlist/${each._id}`)
              }
            >
              {each.videos[0].thumbNail ? (
                <Image
                  w="100%"
                  h="100%"
                  src={each.videos[0].thumbNail}
                  alt=""
                  objectFit={"cover"}
                  borderRadius="10px"
                />
              ) : (
                <Flex
                  w="100%"
                  h="100%"
                  borderRadius="10px"
                  bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
                ></Flex>
              )}

              <Box
                position={"absolute"}
                h="100%"
                w="83px"
                top="0"
                right="0"
                background="rgba(0, 0, 0, 0.6)"
                backdropFilter="blur(5px)"
                borderRadius="0px 10px 10px 0px"
                display={"flex"}
                flexDirection="column"
                justifyContent={"center"}
              >
                <Icon as={VideoIcon} />
                <Text
                  textAlign={"center"}
                  fontSize="smSubHead"
                  lineHeight="20px"
                  color="clique.white"
                >
                  {each?.videos?.length} videos
                </Text>
              </Box>
            </Box>
            <Text
              display={"flex"}
              alignItems="center"
              fontWeight="600"
              fontSize="subHead"
              lineHeight="17px"
              letterSpacing="-0.05em"
              color="clique.white"
              mt=".7rem"
            >
              {each?.cover ? (
                <Image
                  src={each?.cover}
                  marginRight={".7rem"}
                  w="34px"
                  h="34px"
                  borderRadius="50%"
                  objectFit={"cover"}
                  alt=""
                />
              ) : (
                <Circle
                  size="34px"
                  bg="#232323"
                  color="white"
                  marginRight={".7rem"}
                ></Circle>
              )}

              {each?.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW="400px"
          w="400px"
          bottom="0"
          minH="100vh"
          overflowY={"scroll"}
          sx={scrollBarStyle}
          m="0"
          py="30px"
          position={"absolute"}
          right={0}
          bg="clique.black"
        >
          <NewPlaylist />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Playlists;
