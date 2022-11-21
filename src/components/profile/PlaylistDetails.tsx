import { useRouter } from "next/router";
import React from "react";

import {
  Box,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileDetails from "@components/channel/ProfileDetails";

import PlaylistList from "./PlaylistList";

export type Playlist = {
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  userId: string;
  videos: Videos[];
  _id: string;
};

export interface Videos {
  category_name: string;
  thumbNail: string;
  title: string;
  video: string;
  _id: string;
}

export interface PlaylistProps {
  playlist?: Playlist;
}
const PlaylistDetails = ({
  playlist,
  isLoading,
}: {
  playlist?: Playlist;
  isLoading?: Boolean;
}) => {
  const router = useRouter();
  return (
    <Box display={"flex"} px="1.4rem" py="2rem" gap="25px">
      <Box flex="1.6">
        {
          // router.asPath === "/channel/1/content/playlist" &&

          <Box>
            <ProfileDetails id={playlist?.userId as string} />
          </Box>
        }
        {!isLoading && playlist ? (
          <Box
            // marginTop={
            //   router.asPath === "/channel/1/content/playlist" ? "3rem" : "0rem"
            // }
            mt="3rem"
          >
            {playlist?.videos[0]?.thumbNail ? (
              <Image
                src={playlist?.videos[0]?.thumbNail}
                w="100%"
                objectFit={"cover"}
                h="150px"
                borderRadius="10px"
                alt=""
              />
            ) : (
              <Flex
                w="100%"
                h="150px"
                borderRadius="10px"
                bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
              ></Flex>
            )}

            <Text
              fontFamily={"Poppins"}
              fontSize="sm2"
              lineHeight="28px"
              color="clique.white"
              textAlign={"center"}
              mt="1.1rem"
            >
              {playlist?.name}
            </Text>
            <Text
              fontFamily={"Poppins"}
              fontSize="smSubHead"
              lineHeight="24px"
              color="clique.secondaryGrey2"
              textAlign={"center"}
            >
              {playlist?.videos?.length} Videos
            </Text>
          </Box>
        ) : (
          <Box>
            <Skeleton h="150px" borderRadius="10px" />
            <VStack w="100%" mt="2">
              <Skeleton w="50%" height="15px" />
              <Skeleton w="30%" height="10px" />
            </VStack>
          </Box>
        )}
      </Box>
      <Box flex="5">
        <PlaylistList
          videos={playlist?.videos as Videos[]}
          id={playlist?.userId as string}
          isLoading={isLoading as boolean}
        />
      </Box>
    </Box>
  );
};

export default PlaylistDetails;
