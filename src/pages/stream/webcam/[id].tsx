import {
  Box,
  Button,
  Flex,
  Icon,
  SlideFade,
  Text,
  useToast,
} from "@chakra-ui/react";
import CamCommentSection from "@components/stream/CamCommentSection";

import HomeLayout from "layouts/HomeLayout";
import Router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Space, SpaceEvent, getUserMedia } from "@mux/spaces-web";
import { AiFillWechat } from "react-icons/ai";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import styles from "../../../styles/demo.module.css";
import Participant from "@components/stream/Participant";
import {
  useEndStreamMutation,
  useGetStreamQuery,
  useStartBroadCastMutation,
} from "redux/services/livestream/live.service";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { clearWebCamStream } from "redux/slices/streamSlice";
import EndWebLiveModal from "@components/golive/EndWebLiveModal";
import { socket } from "@constants/socket";
import { set } from "video.js/dist/types/tech/middleware";

function Index() {
  const router = useRouter();
  const [startBroadCast, startInfo] = useStartBroadCastMutation();
  const { streamKey, token, spaceId, id, broadcastId }: any = router.query;
  const [close, setClose] = useState(true);

  const ref = React.useRef();

  const spaceRef: any = useRef(null);
  const [localParticipant, setLocalParticipant] = useState<any>(null);
  const joined = !!localParticipant;
  const title = router.query.title as string;

  useEffect(() => {
    if (!spaceId || !token) return;

    const space = new Space(token);

    space.on(SpaceEvent.ParticipantJoined, (participant) => {
      console.log("Participant joined", participant);
    });

    space.on(SpaceEvent.ParticipantLeft, (participant) => {
      console.log("Participant left", participant);
    });

    spaceRef.current = space;
  }, [spaceId, token]);

  const join = useCallback(async () => {
    if (!spaceRef.current) return;

    // Join the Space
    let localParticipant = await spaceRef?.current.join();

    // Get and publish our local tracks
    let localTracks = await getUserMedia({
      audio: true,
      video: true,
    });

    console.log("localTracks", localTracks);

    await localParticipant.publishTracks(localTracks);

    // Set the local participant so it will be rendered
    setLocalParticipant(localParticipant);

    const startRes = await startBroadCast({
      broadcastId: broadcastId,
      spaceId: spaceId,
    });
  }, [spaceId, broadcastId]);

  useEffect(() => {
    join();
  }, [spaceRef?.current]);

  //hadnling ending stream
  const [endStream, endInfo] = useEndStreamMutation();
  const streamDetails = useAppSelector(
    (state) => state?.app?.stream?.webCamStream
  );
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [livestreamId, setLivestreamId] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (id) {
      setLivestreamId(id as string);
    }
  }, []);
  const { data, isFetching, isLoading, refetch } =
    useGetStreamQuery(livestreamId);

  useEffect(() => {
    if (data?.data?.stream && data?.data?.stream?.status !== "ongoing") {
      // toast({
      //   title: "Stream ended",
      //   description: "Nobody would see this stream anymore",
      //   isClosable: false,
      //   position: "top",
      //   duration: 1000 * 60 * 20,
      // });
      // return;
    }
  }, [data]);
  // endstream if user leaves the page

  const handleEndStream = async (e: any) => {
    const endRes: any = await endStream(e);
    if (endRes?.data?.data) {
      dispatch(clearWebCamStream());
    } else {
      console.log("error ending stream");
    }
  };
  const [currentViewers, setCurrentViewers] = useState(0);
  useEffect(() => {
    window.addEventListener("beforeunload", async (e) => {
      e.preventDefault();
      await handleEndStream(livestreamId);
    });

    Router.events.on("routeChangeStart", async () => {
      await handleEndStream(livestreamId);
    });
  }, [Router, livestreamId]);

  useEffect(() => {
    socket.on("userJoinLeave", async (data: any) => {
      if (data?.streamId === livestreamId) {
        setCurrentViewers(data?.count);
      }
    });
  }, [livestreamId]);
  return (
    <HomeLayout>
      <Box maxH="90vh" overflow="hidden" w="100%" className={styles.container}>
        <Flex
          minH="100%"
          max-height="100%"
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          {localParticipant && (
            <Participant
              key={localParticipant.connectionId}
              participant={localParticipant}
            />
          )}
        </Flex>

        <Box pos={"absolute"} top={"calc(10vh + 20px)"} left={"20px"}>
          <Button
            size={"sm"}
            rounded="full"
            bg="clique.close"
            color="clique.white"
            fontWeight={"400"}
          >
            {currentViewers} viewer{currentViewers > 1 ? "s" : ""}
          </Button>{" "}
          <Text
            color={"clique.white"}
            textAlign={"left"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="smHead"
          >
            {title}
          </Text>
        </Box>

        {close ? (
          <Button
            pos={"absolute"}
            top={"calc(10vh + 20px)"}
            right={"20px"}
            onClick={() => setClose(false)}
            rightIcon={
              <Icon color="clique.white" fontSize={"16px"} as={AiFillWechat} />
            }
            size={"sm"}
            rounded="full"
            bg="clique.close"
            color="clique.white"
            fontWeight={"400"}
          >
            Live chat
          </Button>
        ) : (
          <CamCommentSection id={id as string} setClose={setClose} />
        )}

        <EndWebLiveModal id={id as string} />
      </Box>
    </HomeLayout>
  );
}

export default Index;
export { getServerSideProps } from "../../../components/widgets/Chakara";
