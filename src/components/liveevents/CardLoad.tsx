import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

function CardLoader() {
  return (
    <Skeleton
      w={{ lg: "220px", mlg: "280px", xl: "full" }}
      h={{ lg: "180px", mlg: "200px" }}
      rounded={"10px"}
    />
  );
}

export default CardLoader;
