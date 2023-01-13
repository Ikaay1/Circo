import React from "react";
import { useGetLiveStreamQuery } from "redux/services/livestream/live.service";

import {
  Box,
  Flex,
  Skeleton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import EmptyState from "@components/emptyState/EmptyState";

import EventCard from "./EventCard";

function LiveEventPage({ state, setState }: { state: string; setState: any }) {
  const { data, isFetching } = useGetLiveStreamQuery("");
  const value = useColorModeValue("clique.white", "clique.blackGrey");
  return (
    <Box w="full" pb={{ base: "140px", lg: "0" }}>
      <Flex w="full" justifyContent="right" pt={{ base: "20px", lg: "0" }}>
        <AuthButton
          w={{ base: "100%", lg: "300px" }}
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
          <Flex
            alignItems={"center"}
            key={i}
            h="100px"
            mt="20px"
            bg={value}
            p="10px"
          >
            <Skeleton w="80px" h="100%" mr="10px" />
            <Box w="100%">
              <Skeleton w="100%" h="20px" mb="7px" />
              <Skeleton w="100%" h="20px" mb="6px" />
              <Skeleton w="100%" h="20px" />
            </Box>
          </Flex>
        ))}
      {data &&
        data?.data?.map((event: any) => (
          <EventCard setState={setState} event={event} key={event?._id} />
        ))}

      {data && data?.data?.length === 0 && <EmptyState msg="No Events" />}
    </Box>
  );
}

export default LiveEventPage;
