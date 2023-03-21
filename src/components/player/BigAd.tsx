import { Box } from "@chakra-ui/react";
import React from "react";

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
      p="20px"
    ></Box>
  );
}

export default BigAd;
