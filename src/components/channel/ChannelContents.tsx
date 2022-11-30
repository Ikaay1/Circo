import { useState } from "react";

import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import VideoGrid from "@components/home/VideoGrid";
import Playlists from "@components/profile/Playlists";
import { channelNav, contentData } from "@constants/utils";
import { useGetUserLiveStreamQuery } from "redux/services/livestream/live.service";
import { useAppSelector } from "redux/app/hooks";
import CardLoader from "@components/liveevents/CardLoad";
import RecordingCard from "./RecordingCard";
import { useRouter } from "next/router";

const Contents = ({
  videos,
  id,
  isLoading,
  lastElementRef,
}: {
  videos?: contentData[];
  id: string;
  isLoading: boolean;
  lastElementRef?: any;
}) => {
  const routes = useRouter();
  const path = routes.pathname.split("/")[2];
  console.log(path);

  const [route, setRoute] = useState("upload");
  const userProfile = useAppSelector(
    (state) => state?.app?.userReducer?.userProfile
  );
  const { data, isFetching, isError } = useGetUserLiveStreamQuery(
    userProfile?._id
  );
  return (
    <>
      <Box borderBottom={"1px solid rgba(255, 255, 255, 0.1)"} display="flex">
        {channelNav.map(({ title, name }) =>
          name === "live" && path === "subscribe" ? null : (
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
          )
        )}
      </Box>

      {route === "playlist" && (
        <Box mt={"2.5rem"}>
          <Playlists newPlaylist={true} id={id} />
        </Box>
      )}

      {route === "live" && path !== "subscribe" && (
        <Box mt={"2.3rem"}>
          <SimpleGrid
            columns={{ base: 3, lg: 4, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            {isFetching &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardLoader key={i} />
              ))}
            {!isFetching &&
              data &&
              data.data.map((event: any) => (
                <RecordingCard key={event.id} event={event} />
              ))}
          </SimpleGrid>{" "}
          {data && data?.data?.length === 0 && (
            <EmptyState msg="Oops! You have no live recording available" />
          )}
          {isError && <EmptyState msg="Oops! something went wrong" />}
        </Box>
      )}

      {route === "upload" && (
        <>
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
              <VideoGrid
                width={"100%"}
                videos={videos as contentData[]}
                lastElementRef={lastElementRef}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Contents;
