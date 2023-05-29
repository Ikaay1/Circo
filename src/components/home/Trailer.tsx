import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

function Trailer({ url, rounded }: { url: string; rounded?: string }) {
  return (
    <Box
      w="full"
      bg="#000"
      roundedTop={"10px"}
      rounded={rounded ? rounded : ""}
      overflowY={"hidden"}
    >
      <Head>
        <style></style>
      </Head>
      <video
        width={"full"}
        autoPlay
        src={url}
        controlsList=" nopictureinpicture noplaybackrate nodownload "
        controls
        loop
        className="smallP"
      />
    </Box>
  );
}

export default Trailer;
