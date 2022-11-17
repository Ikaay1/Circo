import { useState } from "react";

import {
  Box,
  Flex,
  HStack, Skeleton,
  SkeletonCircle,
  Text
} from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import VideoGrid from "@components/home/VideoGrid";
import Playlists from "@components/profile/Playlists";
import { channelNav, contentData } from "@constants/utils";

const Contents = ({
  videos,
  id,
  isLoading,
}: {
  videos?: contentData[];
  id: string;
  isLoading: boolean;
}) => {
  const [route, setRoute] = useState("upload");
  return (
    <>
      <Box borderBottom={"1px solid rgba(255, 255, 255, 0.1)"} display="flex">
        {channelNav.map(({ title, name }) => (
          <Text
            mr={"3rem"}
            lineHeight="24px"
            color="clique.white"
            pb={".8rem"}
            borderBottom={route === name ? "4px solid #892CDC" : "none"}
            cursor={"pointer"}
            key={"name"}
            onClick={() => setRoute(name)}
          >
            {title}
          </Text>
        ))}
      </Box>

      {route === "playlist" && (
        <Box mt={"2.5rem"}>
          <Playlists newPlaylist={false} id={id} />
        </Box>
      )}

      {route === "live" && (
        <Box mt={"2.3rem"}>
          {/* <VideoGrid
            width={'100%'}
            videos={['videoImage', 'videoImage1', 'videoImage2', 'videoImage3']}
          /> */}
        </Box>
      )}

      {route === "upload" && (
        <>
          {/* {videos?.length === 0 ? (
            <Box mt="4">
              <EmptyState msg="Oops! No post yet. Upload a video!" />
            </Box>
          ) : (
            <Box mt={"2.3rem"}>
              <VideoGrid width={"100%"} videos={videos as contentData[]} />
            </Box>
          )} */}

          {isLoading ? (
            <HStack spacing="12px" mt="2.3rem">
              {[1, 2, 3, 4].map((num) => (
                <Box key={num} h={"100%"} w={{ lg: "230px", xl: "310px" }}>
                  <Skeleton h="150px" borderRadius="10px" />
                  <Flex mt={".5rem"} alignItems="center" w="100%">
                    <SkeletonCircle size="10" mr=".5rem" />
                    <Box w="100%">
                      <Skeleton w="100%" height="10px" />
                      <Skeleton w="100%" my={"3px"} height="10px" />
                      <Skeleton w="100%" height="10px" />
                    </Box>
                  </Flex>
                </Box>
              ))}
            </HStack>
          ) : !isLoading && videos?.length === 0 ? (
            <Box mt="2.3rem">
              <EmptyState msg="Oops! No post yet. Upload a video!" />
            </Box>
          ) : (
            <Box mt={"2.3rem"}>
              <VideoGrid width={"100%"} videos={videos as contentData[]} />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Contents;
