import { Box } from "@chakra-ui/react";
import React from "react";

function EventsCard({ onOpen }: any) {
  return (
    <Box onClick={onOpen} cursor="pointer">
      Event Card
    </Box>
  );
}

export default EventsCard;
