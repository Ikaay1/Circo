import { Box, Flex, Skeleton, Spinner } from "@chakra-ui/react";
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

      {isFetching &&
        [1, 2, 3, 4, 5].map((i) => (
          <Flex key={i} h="100px" mt="20px" bg="clique.blackGrey" p="10px">
            <Skeleton w="80px" h="100%" mr="10px" />
            <Box w="100%">
              <Skeleton w="100%" h="20px" mb="7px" />
              <Skeleton w="100%" h="20px" mb="6px" />
              <Skeleton w="100%" h="20px" mb="7px" />
            </Box>
          </Flex>
        ))}
      {data &&
        data?.data?.map((event: any) => (
          <EventCard setState={setState} event={event} key={event?._id} />
        ))}
    </Box>
  );
}

export default LiveEventPage;
