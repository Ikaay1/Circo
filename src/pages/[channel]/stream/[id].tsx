/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Flex, Skeleton, useToast } from "@chakra-ui/react";
import StreamPlayer from "@components/stream/StreamPlayer";
import { useGetStreamQuery } from "redux/services/livestream/live.service";
import CommentSection from "@components/stream/CommentSection";
import VideoDetails from "@components/stream/VideoDetails";
import { socket } from "@constants/socket";
import OpenLayout from "layouts/OpenLayout";
import { useAppSelector } from "redux/app/hooks";

function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [livestreamId, setLivestreamId] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (id) {
      setLivestreamId(id as string);
    }
  }, [id]);
  const { data, isFetching, isLoading, refetch, isError, error } =
    useGetStreamQuery(livestreamId);

  const toast = useToast();
  const { token } = useAppSelector((store) => store.app.userReducer);

  if (token) {
    router.push(`/stream/${livestreamId}`);
  }

  useEffect(() => {
    const errorDetails: any = error;
    if (errorDetails?.data?.status === "failed") {
      toast({
        title: "Error",
        description: errorDetails?.data?.message,
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }

    if (data?.data?.stream && data?.data?.stream?.status !== "ongoing") {
      router.push(`/liveevents`);

      console.log(data);
      toast({
        title: "Stream " + data?.data?.stream?.status,
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

      return;
    }
  }, [data, error]);

  useEffect(() => {
    socket.on("newviewer", (data: any) => {
      refetch();
    });

    socket.on("streamended", (data: any) => {
      if (data?.eventId !== livestreamId) return;
      toast({
        title: "Stream Ended",
        status: "info",
        duration: 5000,
        isClosable: false,
        description: "You will be redirected to the home page now",
        position: "top-right",
      });
      window.location.href = "/liveevents";
    });

    return () => {
      socket.off("newviewer");
      socket.off("streamended");
    };
  }, [socket]);
  return (
    <OpenLayout>
      <Flex
        pb={{ base: "20px", lg: "0px" }}
        w="full"
        flexDir={{ base: "column", lg: "row" }}
      >
        <Box
          maxH={{ base: "", lg: "90vh" }}
          pb="50px"
          px={{ base: "20px", lg: "30px" }}
          maxW={{ base: "full", lg: "calc(100vw - 400px)" }}
          w={{ base: "full", lg: "calc(100vw - 400px)" }}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              rounded: "full",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "clique.base",
              outline: "none",
            },
          }}
        >
          {isLoading ? (
            <Flex w="100%" justify={"space-between"}>
              <Skeleton
                h={{ base: "400px", lg: "580px" }}
                rounded="20px"
                w="100%"
              />
            </Flex>
          ) : (
            <StreamPlayer stream={data?.data?.stream} />
          )}

          {isLoading ? (
            <Skeleton h="40px" mt="10px" rounded="20px" w="100%" />
          ) : (
            <VideoDetails stream={data?.data?.stream} />
          )}
        </Box>

        <CommentSection />
      </Flex>
    </OpenLayout>
  );
}

export default Index;
export { getServerSideProps } from "../../../components/widgets/Chakara";
