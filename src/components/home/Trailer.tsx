import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

function Trailer() {
  return (
    <Box w="full" bg="#000">
      <Head>
        <style></style>
      </Head>
      <video
        width={"full"}
        autoPlay
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        controlsList=" nopictureinpicture noplaybackrate nodownload "
        controls
        loop
        className="smallP"
      />
    </Box>
  );
}

export default Trailer;
