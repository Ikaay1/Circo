import { Button } from "@chakra-ui/react";
import React from "react";

function End() {
  return (
    <Button
      pos={"absolute"}
      bottom={"30px"}
      left={"50%"}
      transform={"translateX(-50%)"}
      mt="80px"
      rounded="full"
      onClick={() => {}}
      bg={"clique.dangerRed"}
      color="white"
      colorScheme={"red"}
      fontFamily={"Poppins"}
    >
      End Live Stream
    </Button>
  );
}

export default End;
