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
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { Space, SpaceEvent, getUserMedia } from "@mux/spaces-web";
import { AiFillWechat } from "react-icons/ai";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import styles from "../../../styles/demo.module.css";
import {
  useEndStreamMutation,
  useGetStreamQuery,
} from "redux/services/livestream/live.service";
import { useAppDispatch } from "redux/app/hooks";
import { clearWebCamStream } from "redux/slices/streamSlice";
import EndWebLiveModal from "@components/golive/EndWebLiveModal";
import { socket } from "@constants/socket";

const CAMERA_CONSTRAINTS = {
  audio: true,
  video: true,
};

const getRecorderSettings = () => {
  const settings: any = {};
  if (MediaRecorder.isTypeSupported("video/mp4")) {
    settings.format = "mp4";
    settings.video = "h264";
    settings.audio = "aac";
  } else {
    settings.format = "webm";
    settings.audio = "opus";
    settings.video = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
      ? "h264"
      : "vp8";
  }
  return settings;
};

const getRecorderMimeType = () => {
  const settings: any = getRecorderSettings();
  const codecs =
    settings.format === "webm"
      ? `;codecs="${settings.video}, ${settings.audio}"`
      : "";
  return `video/${settings.format}${codecs}`;
};

function Index() {
  const router = useRouter();
  const { streamKey, token, spaceId, id, broadcastId }: any = router.query;
  const [close, setClose] = useState(true);

  const title = router.query.title as string;

  //handling ending stream
  const [endStream, endInfo] = useEndStreamMutation();

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
    }
  }, [data]);

  // endstream if user leaves the page

  const handleEndStream = async (e: any) => {
    const endRes: any = await endStream(e);
    if (endRes?.data?.data) {
      dispatch(clearWebCamStream());
      stopStreaming();
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

  const [connected, setConnected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const [textOverlay, setTextOverlay] = useState("");

  const inputStreamRef: any = useRef();
  const videoRef: any = useRef();
  const canvasRef: any = useRef();
  const wsRef: any = useRef();
  const mediaRecorderRef: any = useRef();
  const requestAnimationRef: any = useRef();
  const nameRef: any = useRef();
  const enableCamera = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);

    setCameraEnabled(true);
  };

  const updateCanvas = () => {
    if (videoRef.current.ended || videoRef.current.paused) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    ctx.fillStyle = "#FB3C4E";
    ctx.font = "50px Akkurat";
    ctx.opacity = "0";
    const date = new Date();
    const dateText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  };

  const stopStreaming = () => {
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setStreaming(false);
  };

  const startStreaming = () => {
    setStreaming(true);
    const settings = getRecorderSettings();
    const protocol = window.location.protocol.replace("http", "ws");
    const wsUrl = new URL(`${protocol}//${window.location.host}/rtmp`);
    wsUrl.searchParams.set("video", settings.video);
    wsUrl.searchParams.set("audio", settings.audio);
    if (streamUrl) {
      wsUrl.searchParams.set("url", streamUrl);
    }
    if (streamKey) {
      wsUrl.searchParams.set("key", streamKey);
    }
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.addEventListener("open", function open() {
      setConnected(true);
    });

    wsRef.current.addEventListener("close", () => {
      setConnected(false);
      stopStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

    // Let's do some extra work to get audio to join the party.
    // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
    const audioStream = new MediaStream();
    const audioTracks = inputStreamRef.current.getAudioTracks();
    audioTracks.forEach(function (track: any) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t: any) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: getRecorderMimeType(),
      videoBitsPerSecond: 3000000,
      audioBitsPerSecond: 64000,
    });

    mediaRecorderRef.current.addEventListener("dataavailable", (e: any) => {
      wsRef.current.send(e.data);
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      stopStreaming();
      wsRef.current.close();
    });

    mediaRecorderRef.current.start(1000);
  };

  useEffect(() => {
    nameRef.current = textOverlay;
  }, [textOverlay]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, []);

  useEffect(() => {
    if (cameraEnabled && !connected && !streaming) {
      setTimeout(() => {
        startStreaming();
      }, 1500);
    }
  }, [cameraEnabled, wsRef.current, connected, streaming]);

  return (
    <HomeLayout>
      <Box maxH="90vh" overflow="hidden" w="100%" className={styles.container}>
        <Flex
          minH="100%"
          max-height="100%"
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        ></Flex>
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
        <div>
          <div className={styles.inputVideo}>
            <video ref={videoRef} muted playsInline></video>
          </div>
          <div className={styles.outputCanvas}>
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>

        {!cameraEnabled ? (
          <Button
            pos={"absolute"}
            bottom={"30px"}
            left={"50%"}
            transform={"translateX(-50%)"}
            mt="80px"
            rounded="full"
            colorScheme={"purple"}
            fontFamily={"Poppins"}
            onClick={enableCamera}
          >
            Enable Camera
          </Button>
        ) : (
          <EndWebLiveModal id={id as string} />
        )}
      </Box>
    </HomeLayout>
  );
}

export default Index;
export { getServerSideProps } from "../../../components/widgets/Chakara";
