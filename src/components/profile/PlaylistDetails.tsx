import { useRouter } from "next/router";

import { Box, Flex, Skeleton, VStack } from "@chakra-ui/react";

import PlaylistList from "./PlaylistList";

export type Playlist = {
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  userId: {
    photo: string;
    _id: string;
  };
  videos: Videos[];
  _id: string;
};

export interface Videos {
  dateAdded: string;
  video: {
    category_name: string;
    thumbNail: string;
    title: string;
    video: string;
    _id: string;
    uploader_firstName: string;
    uploader_lastName: string;
    uploader_id: string;
  };
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
  return (
    <Box
      display={"flex"}
      px="1.4rem"
      py={{ lg: "2rem" }}
      mt={{ base: "2.5rem", lg: 0 }}
      gap="25px"
    >
      <Box flex="5">
        {isLoading ? (
          <Flex flexDirection={"column"} gap="2">
            {[1, 2, 3, 4].map((each, i) => {
              return (
                <Flex key={i}>
                  <Skeleton h="100px" w="100px" borderRadius="10px" mr="2" />
                  <VStack my="auto">
                    <Skeleton w="70px" height="20px" mb="3" />
                    <Skeleton w="70px" height="10px" />
                  </VStack>
                </Flex>
              );
            })}
          </Flex>
        ) : (
          <Box>
            {playlist?.videos?.filter((each) => each?.video !== null)
              ?.length ? (
              [...playlist?.videos]
                ?.filter((each) => each?.video !== null)
                ?.sort(function (a, b) {
                  const nameA = a?.video?.title.toUpperCase();
                  const nameB = b?.video?.title.toUpperCase();
                  if (nameA > nameB) {
                    return 1;
                  }
                  if (nameA < nameB) {
                    return -1;
                  }
                  return 0;
                })
                ?.map((item, i) => (
                  <PlaylistList
                    playlist={playlist}
                    videoId={item?.video?._id}
                    item={item}
                    i={i}
                    key={item?.video?._id}
                  />
                ))
            ) : (
              <Box>
                No video on this playlist yet.{" "}
                <span style={{ color: "#892CDC" }}>
                  Click on the three dots below any video to add the video to a
                  playlist.
                </span>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetails;
