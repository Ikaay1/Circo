import { Box, Flex } from "@chakra-ui/react";
import CommentSection from "@components/player/CommentSection";
import VideoDetails from "@components/player/VideoDetails";
import VideoPlayer from "@components/player/VideoPlayer";
import HomeLayout from "layouts/HomeLayout";
import React from "react";

function Index() {
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
          <VideoPlayer />
          <VideoDetails />
        </Box>
        <CommentSection />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
