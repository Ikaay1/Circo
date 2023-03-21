import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Adsense } from "@ctrl/react-adsense";

function BigAd({
  setIsAd,
  setIsSmallAd,
  playerRef,
}: {
  setIsAd: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: any;
}) {
  React.useEffect(() => {
    setTimeout(() => {
      setIsAd(false);

      setTimeout(() => {
        setIsSmallAd(true);
      }, 10000);
    }, 10000);
  }, [playerRef]);

  return (
    <Box
      bg="red"
      minH="calc(100% - 80px)"
      pos="absolute"
      zIndex="2"
      w="full" 
    >
      <Adsense client="ca-pub-7640562161899788" slot="7259870550" />
    </Box>
  );
}

export default BigAd;
