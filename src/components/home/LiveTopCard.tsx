import React from "react";

import {
  Avatar,
  Flex,
  HStack,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { purpleBoxStyle } from "@constants/utils";
import { useGetAllLiveStreamQuery } from "redux/services/livestream/live.service";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/app/hooks";
const NProgress = require("nprogress");

function LiveTopCard() {
  const router = useRouter();
  const { data, isFetching } = useGetAllLiveStreamQuery({
    ongoing: "true",
  });
  const userProfile = useAppSelector(
    (store) => store.app.userReducer.userProfile
  );
  return (
    <Flex alignItems={"center"} maxW="calc(100vw - 560px)" my="10px">
      <Text
        position={"relative"}
        pl="20px"
        _before={{ ...purpleBoxStyle, background: "clique.base" }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize={"subHead"}
      >
        Live
      </Text>
      <HStack px="20px">
        {isFetching &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
            <SkeletonCircle key={i} size={"14"} />
          ))}
        {data &&
          data?.data.map((event: any, i: number) => (
            <Flex
              onClick={() => {
                NProgress.start();

                if (
                  event?.eventId?.fee === 0 ||
                  event?.eventId?.fee === "0" ||
                  !event?.eventId?.fee ||
                  event?.paid.includes(userProfile?._id) ||
                  event?.streamerId?._id === userProfile?._id
                ) {
                  router.push(`/stream/${event?.eventId?._id}`);
                } else {
                  //call paystack
                }

                NProgress.done();
              }}
              cursor="pointer"
              key={i}
              alignItems={"center"}
              justifyContent="center"
              p="4px"
              border={"4px solid"}
              borderColor="clique.base"
              rounded="full"
            >
              <Avatar
                p="0"
                size="md"
                name={
                  event?.streamerId?.firstName +
                  " " +
                  event?.streamerId?.lastName
                }
                src={event?.streamerId?.photo}
              />
            </Flex>
          ))}
      </HStack>
    </Flex>
  );
}

export default LiveTopCard;
