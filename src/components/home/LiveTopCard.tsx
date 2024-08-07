import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useGetAllLiveStreamQuery } from "redux/services/livestream/live.service";

import {
  Avatar,
  Flex,
  HStack,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { purpleBoxStyle, scrollBarStyle4 } from "@constants/utils";

import { scrollBarStyle2 } from "../../constants/utils";
import Color from "@constants/color";

const NProgress = require("nprogress");

function LiveTopCard() {
  const router = useRouter();
  const { data, isFetching } = useGetAllLiveStreamQuery({
    ongoing: "true",
    search: "",
    paid: "",
  });
  const userProfile = useAppSelector(
    (store) => store.app.userReducer.userProfile
  );

  return (
    <Flex
      alignItems={"center"}
      maxW={{ base: "100%", lg: "calc(100vw - 560px)" }}
      my="10px"
      display={data?.data.length === 0 ? "none" : "flex"}
    >
      <Text
        position={"relative"}
        pl="20px"
        _before={{ ...purpleBoxStyle, background: "clique.base" }}
        color={Color().blackAndWhite}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize={"subHead"}
      >
        Live
      </Text>
      <HStack px="20px" overflowX={"auto"} sx={scrollBarStyle4}>
        {isFetching &&
          [1, 2, 3].map((i) => (
            <SkeletonCircle flexShrink={0} key={i} size={"14"} />
          ))}
        {data &&
          data?.data.map((event: any, i: number) => (
            <Flex
              flexShrink={0}
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
                name={event?.streamerId?.name}
                src={event?.streamerId?.photo}
              />
            </Flex>
          ))}
      </HStack>
    </Flex>
  );
}

export default LiveTopCard;
