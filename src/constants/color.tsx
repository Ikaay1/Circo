import React from "react";

import { useColorModeValue } from "@chakra-ui/react";

function Color() {
  const blackAndWhite = useColorModeValue("clique.black", "clique.whiteGrey");
  const blackAndPureWhite = useColorModeValue("clique.black", "clique.white");
  const blackAndWhite2 = useColorModeValue("clique.black", "clique.white");
  const greyAndWhite = useColorModeValue(
    "clique.lightPrimaryBg",
    "clique.secondaryGrey1"
  );
  const whiteAndBlack = useColorModeValue("clique.white", "clique.black");
  const blackAndGrey = useColorModeValue("clique.black", "clique.grey");
  const whiteGreyAndBlack = useColorModeValue(
    "clique.black",
    "clique.whiteGrey"
  );
  const blackAndWhiteGrey = useColorModeValue(
    "clique.lightPrimaryBg",
    "clique.grey"
  );
  const greyAndPureWhite = useColorModeValue("clique.white", "clique.grey");

  const lightAndPrimary = useColorModeValue(
    "clique.lightPrimaryBg",
    "clique.primaryBg"
  );

  return {
    whiteAndBlack,
    blackAndWhite,
    whiteGreyAndBlack,
    blackAndGrey,
    blackAndWhiteGrey,
    lightAndPrimary,
    greyAndWhite,
    blackAndPureWhite,
    greyAndPureWhite,
    blackAndWhite2,
  };
}

export default Color;
