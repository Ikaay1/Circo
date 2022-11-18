import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import StreamPlayer from "@components/stream/StreamPlayer";
import { useGetStreamQuery } from "redux/services/livestream/live.service";
import CommentSection from "@components/stream/CommentSection";
import VideoDetails from "@components/stream/VideoDetails";

function Index() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching } = useGetStreamQuery(id as string);
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
          {isFetching ? (
            <Flex w="100%" justify={"space-between"}>
              <Skeleton h="580px" rounded="20px" w="100%" />
            </Flex>
          ) : (
            <StreamPlayer stream={data?.data?.stream} />
          )}

          {isFetching ? (
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
