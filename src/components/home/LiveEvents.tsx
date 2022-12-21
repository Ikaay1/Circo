import { Box, Divider, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { useGetAllLiveStreamQuery } from "redux/services/livestream/live.service";
import EventModal from "./EventModal";

function LiveEvents() {
  const { data, isFetching } = useGetAllLiveStreamQuery({
    paid: "true",
  });

  const filteredData = data?.data?.filter(
    (event: any) => new Date(event?.eventId?.schedule) > new Date()
  );

  return (
    <Box
      w="250px"
      maxW="250px"
      minW="250px"
      bg="clique.black"
      h="90vh"
      minH="90vh"
      maxH="90vh"
      py={"20px"}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
          rounded: "full",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "clique.grey",
          outline: "none",
        },
      }}
    >
      <Text
        textAlign={"center"}
        fontFamily={"Unbounded"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="smHead"
      >
        Live Events
      </Text>
      <Box px="50px" py="5px">
        <Divider />
      </Box>
      {isFetching &&
        [...Array(5)].map((_, i) => (
          <Skeleton h="250px" mr="10px" w="" m="10px" rounded="10px" key={i} />
        ))}
      {filteredData?.map((event: any) => (
        <EventModal key={event._id} event={event} />
      ))}
    </Box>
  );
}

export default LiveEvents;
