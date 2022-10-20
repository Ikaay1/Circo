import { Box } from "@chakra-ui/react";
import React from "react";

function EventCard({ onOpen }: { onOpen: () => void }) {
  return (
    <Box
      onClick={() => {
        onOpen();
      }}
    >
      click me
    </Box>
  );
}

export default EventCard;
