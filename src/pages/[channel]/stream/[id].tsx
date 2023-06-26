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
import axios from "axios";

function Index({ data }: { data: any }) {
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

  const toast = useToast();
  const { token } = useAppSelector((store) => store.app.userReducer);

  if (token) {
    router.push(`/stream/${livestreamId}`);
  }

  const [javascriptEnabled, setJavascriptEnabled] = React.useState(false);

  //check if javascript is enabled

  useEffect(() => {
    setJavascriptEnabled(true);
  }, []);

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
          <StreamPlayer stream={data?.data?.stream} />
          <VideoDetails stream={data?.data?.stream} />
        </Box>

        {/* <CommentSection /> */}
      </Flex>
    </OpenLayout>
  );
}

export default Index;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { data } = await axios.get(`https://api.circo.africa/livestream/${id}`);

  return {
    props: {
      data,
    },
  };
}
