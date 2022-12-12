import { Box, Button, Flex, Icon, SlideFade } from "@chakra-ui/react";
import CamCommentSection from "@components/stream/CamCommentSection";
import CommentSection from "@components/stream/CommentSection";
import End from "@components/stream/End";
import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiFillWechat } from "react-icons/ai";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import styles from "../../../styles/demo.module.css";

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
  const { streamKey }: any = router.query;
  const [close, setClose] = useState(false);

  const [connected, setConnected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState(
    "rtmps://global-live.mux.com:443/app/ "
  );
  const [textOverlay, setTextOverlay] = useState("Live from the browser!");

  const inputStreamRef: any = useRef();
  const videoRef: any = useRef();
  const canvasRef: any = useRef();
  const wsRef: any = useRef();
  const mediaRecorderRef: any = useRef();
  const requestAnimationRef: any = useRef();
  const nameRef: any = useRef();

  const enableCamera = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    2;

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = 100;
    canvasRef.current.width = 100;

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
    const date = new Date();
    const dateText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;
    ctx.fillText(
      `${nameRef.current}${dateText}`,
      10,
      50,
      canvasRef.current.width - 20
    );

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
    // startStreaming();
  }, [streaming]);

  const { id } = router.query;
  const { data, isLoading, isFetching } = useGetStreamCommentsQuery(id);
  return (
    <HomeLayout>
      <Box maxH="90vh" overflow="hidden" w="100%" className={styles.container}>
        <Flex
          minH="100%"
          max-height="100%"
          justifyContent={"center"}
          alignItems={"center"}
          display={cameraEnabled ? "block" : "flex"}
        >
          {!cameraEnabled && (
            <Button mt="100px" bg="clique.base" onClick={enableCamera}>
              Enable Camera
            </Button>
          )}

          <Box
            hidden={!cameraEnabled}
            w="100%"
            maxW="100%"
            className={styles.inputVideo}
          >
            <video ref={videoRef} muted playsInline />
          </Box>
          <Box hidden={!cameraEnabled} className={styles.outputCanvas}>
            <canvas ref={canvasRef}></canvas>
          </Box>
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
          <CamCommentSection
            id={id as string}
            data={data}
            setClose={setClose}
          />
        )}

        <End />
      </Box>
    </HomeLayout>
  );
}

export default Index;
