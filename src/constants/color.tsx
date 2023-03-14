import { useColorModeValue } from "@chakra-ui/react";

import React from "react";

function Color() {
  const blackAndWhite = useColorModeValue("clique.black", "clique.whiteGrey");
  const greyAndWhite = useColorModeValue(
    "clique.black",
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
  };
}

export default Color;
