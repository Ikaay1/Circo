import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useGetUserLiveStreamQuery } from "redux/services/livestream/live.service";

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
import VideoSkeletonLoader from "@components/home/VideoSkeletonLoader";
import CardLoader from "@components/liveevents/CardLoad";
import Playlists from "@components/profile/Playlists";
import Color from "@constants/color";
import { channelNav, contentData } from "@constants/utils";

import RecordingCard from "./RecordingCard";

const Contents = ({
  videos,
  id,
  isLoading,
  lastElementRef,
  setContents,
}: {
  videos?: contentData[];
  id: string;
  isLoading: boolean;
  lastElementRef?: any;
  setContents?: any;
}) => {
  const routes = useRouter();
  const path = routes.pathname.split("/")[1];

  const [route, setRoute] = useState("upload");
  const userProfile = useAppSelector(
    (state) => state?.app?.userReducer?.userProfile
  );
  const { data, isFetching, isError } = useGetUserLiveStreamQuery(
    userProfile?._id
  );

  return (
    <>
      <Box
        borderBottom={"1px solid rgba(255, 255, 255, 0.1)"}
        display="flex"
        justifyContent={{ base: "space-between", lg: "flex-start" }}
      >
        {channelNav.map(({ title, name }) =>
          name === "live" && path === "channel" ? null : (
            <Text
              mr={{ lg: "3rem" }}
              lineHeight="24px"
              color={Color().blackAndWhite}
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

      {route === "live" && path !== "channel" && (
        <Box mt={"2.3rem"}>
          <SimpleGrid
            columns={{ base: 1, lg: 4, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            {isFetching && (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Box mt="1.2rem" key={i}>
                    <CardLoader />
                  </Box>
                ))}
              </>
            )}
            {!isFetching &&
              data &&
              data.data.map((event: any) => (
                <RecordingCard key={event.id} event={event} />
              ))}
          </SimpleGrid>{" "}
          {data && data?.data?.length === 0 && (
            <Box h={{ base: "30vh", lg: "100%" }}>
              <EmptyState msg="Oops! You have no live recording available" />
            </Box>
          )}
          {isError && <EmptyState msg="Oops! something went wrong" />}
        </Box>
      )}

      {route === "upload" && (
        <>
          {isLoading ? (
            <VideoSkeletonLoader />
          ) : !isLoading && videos?.length === 0 ? (
            <Box h={{ base: "30vh", lg: "100%" }} mt="2.3rem">
              <EmptyState msg="Oops! No post yet. Upload a video!" />
            </Box>
          ) : (
            <Box mt={"2.3rem"}>
              <VideoGrid
                width={"100%"}
                videos={videos as contentData[]}
                lastElementRef={lastElementRef}
                setContents={setContents}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Contents;
