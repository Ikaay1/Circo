/* eslint-disable react-hooks/exhaustive-deps */
import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Flex, Skeleton, useToast } from "@chakra-ui/react";
import StreamPlayer from "@components/stream/StreamPlayer";
import {
  useCreateViewMutation,
  useGetStreamQuery,
} from "redux/services/livestream/live.service";
import CommentSection from "@components/stream/CommentSection";
import VideoDetails from "@components/stream/VideoDetails";
import io from "socket.io-client";

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
  const { data, isFetching, isLoading, refetch } =
    useGetStreamQuery(livestreamId);

  const toast = useToast();
  const [createView, info] = useCreateViewMutation();

  useEffect(() => {
    if (data?.data) {
      createView({ streamId: data?.data?.stream?._id });
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.stream && data?.data?.stream?.status !== "ongoing") {
      router.push(`/liveevents`);

      toast({
        title: "Stream " + data?.data?.stream?.status,
        status: "info",
        duration: 5000,
        isClosable: true,
      });

      return;
    }
  }, [data]);

  useEffect(() => {
    io(process.env.NEXT_PUBLIC_BASEURL!, {
      forceNew: false,
    }).on("newviewer", (data: any) => {
      refetch();
    });
  }, [io(process.env.NEXT_PUBLIC_BASEURL!)]);
  return (
    <HomeLayout>
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
    </HomeLayout>
  );
}

export default Index;
