import { Box } from "@chakra-ui/react";
import { Adsense } from "@ctrl/react-adsense";
import React from "react";

function SmallAd({
  setIsSmallAd,
}: {
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  React.useEffect(() => {
    setTimeout(() => {
      setIsSmallAd(false);
    }, 5000);
  }, []);

  return (
    <Box bg="blue" pos="absolute" zIndex="2" bottom="0" minH="  80px" w="full">
      {" "}
      <Adsense client="ca-pub-7640562161899788" slot="7259870550" />
    </Box>
  );
}

export default SmallAd;
