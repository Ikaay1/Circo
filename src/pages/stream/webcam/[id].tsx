import { Box, Button, Flex, Icon, SlideFade } from "@chakra-ui/react";
import CamCommentSection from "@components/stream/CamCommentSection";
import CommentSection from "@components/stream/CommentSection";
import End from "@components/stream/End";
import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Space, SpaceEvent, getUserMedia } from "@mux/spaces-web";
import { AiFillWechat } from "react-icons/ai";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import styles from "../../../styles/demo.module.css";
import Participant from "@components/stream/Participant";
import { useStartBroadCastMutation } from "redux/services/livestream/live.service";

function Index() {
  const router = useRouter();
  const [startBroadCast, startInfo] = useStartBroadCastMutation();
  const { streamKey, token, spaceId, id, broadcastId }: any = router.query;
  const [close, setClose] = useState(false);

  const spaceRef: any = useRef(null);
  const [localParticipant, setLocalParticipant] = useState<any>(null);
  const joined = !!localParticipant;

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
    let localParticipant = await spaceRef.current.join();

    // Get and publish our local tracks
    let localTracks = await getUserMedia({
      audio: true,
      video: true,
    });
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
  }, [spaceRef.current]);

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
            fontWeight={"400"}
          >
            Live chat
          </Button>
        ) : (
          <CamCommentSection id={id as string} setClose={setClose} />
        )}

        <End />
      </Box>
    </HomeLayout>
  );
}

export default Index;
