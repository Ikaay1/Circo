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
  const { data, isFetching, isLoading, refetch } = useGetStreamQuery(
    id as string
  );

  const toast = useToast();
  const [createView, info] = useCreateViewMutation();

  useEffect(() => {
    if (data?.data) {
      createView({ streamId: data?.data?.stream?._id });
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.stream?.status !== "ongoing") {
      router.push(`liveevents`);
    }

    toast({
      title: "Stream " + data?.data?.stream?.status,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  }, [data]);

  useEffect(() => {
    io(process.env.NEXT_PUBLIC_BASEURL!, { forceNew: false }).on(
      "newviewer",
      (data: any) => {
        refetch();
      }
    );
  }, [io(process.env.NEXT_PUBLIC_BASEURL!)]);
  return (
    <HomeLayout>
      <Flex>
        <Box
          maxH={"90vh"}
          pb="50px"
          px="30px"
          maxW={"calc(100vw - 400px)"}
          w={"calc(100vw - 400px)"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              rounded: "full",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "clique.primaryBg",
              outline: "none",
            },
          }}
        >
          {isLoading ? (
            <Flex w="100%" justify={"space-between"}>
              <Skeleton h="580px" rounded="20px" w="100%" />
            </Flex>
          ) : (
            <StreamPlayer stream={data?.data?.stream} />
          )}

          {isLoading ? (
            <Skeleton h="580px" mt="10px" rounded="20px" w="100%" />
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
