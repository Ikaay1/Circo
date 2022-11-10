import { Box, Flex } from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import React from "react";
import EventCard from "./EventCard";

function LiveEventPage({ state, setState }: { state: string; setState: any }) {
  return (
    <Box w="full">
      <Flex w="full" justifyContent="right">
        <AuthButton
          w="300px"
          name={"Create New Event"}
          h="60px"
          fontSize="subHead"
          onClick={() => {
            setState("create");
          }}
        />
      </Flex>

      {["event1", "event2", "event3"].map((event: any) => (
        <EventCard key={event?._id}  />
      ))}
    </Box>
  );
}

export default LiveEventPage;
