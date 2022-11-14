import { useRouter } from "next/router";
import React from "react";

import { Box } from "@chakra-ui/react";
import ChannelContents from "@components/channel/ChannelContents";
import { scrollBarStyle } from "@constants/utils";

import Analytics from "./Analytics";
import Bio from "./Bio";
import EditChannel from "./EditChannel";
import UserDetail from "./UserDetail";

const Index = () => {
  const router = useRouter();
  const des =
    router.query.name === "content" || router.pathname.includes("subscribe");
  return (
    <Box
      height={"100%"}
      overflowY="scroll"
      position={"relative"}
      pb="3rem"
      sx={scrollBarStyle}
    >
      <UserDetail />
      {router.query.name !== "edit" && (
        <Bio showSubscribe={router.query.name === "analytics" ? false : true} />
      )}
      {des && (
        <Box mt={"6rem"} px="1.35rem">
          <ChannelContents />
        </Box>
      ) }

      {router.query.name === "edit" && (
        <Box mt={"1.4rem"} px="1.35rem">
          <EditChannel />
        </Box>
      )}

      {router.query.name === "analytics" && (
        <Box mt={"6rem"} px="1.35rem">
          <Analytics />
        </Box>
      )}
    </Box>
  );
};

export default Index;
