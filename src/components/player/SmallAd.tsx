import { Box } from "@chakra-ui/react";
import React from "react";

function SmallAd({
  setIsSmallAd,
}: {
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // set isSmallAd to false after 5 seconds
  React.useEffect(() => {
    setTimeout(() => {
      setIsSmallAd(false);
    }, 5000);
  }, []);
  
  return (
    <Box
      bg="blue"
      pos="absolute"
      zIndex="2"
      bottom="0"
      minH="  80px"
      w="full"
      p="20px"
    ></Box>
  );
}

export default SmallAd;
