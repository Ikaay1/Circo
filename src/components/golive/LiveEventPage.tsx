import { Box, Flex, Spinner } from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import React from "react";
import { useGetLiveStreamQuery } from "redux/services/live.service";
import EventCard from "./EventCard";

function LiveEventPage({ state, setState }: { state: string; setState: any }) {
  const { data, isFetching } = useGetLiveStreamQuery("");
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

      {isFetching && <Spinner bg="clique.base" />}
      {data &&
        data?.data?.map((event: any) => (
          <EventCard setState={setState} event={event} key={event?._id} />
        ))}
    </Box>
  );
}

export default LiveEventPage;
