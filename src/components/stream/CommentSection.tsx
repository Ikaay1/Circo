import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import io from "socket.io-client";

import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";

import EachComment from "./EachComment";
import NewComment from "./NewComment";
import Color from "@constants/color";

function CommentSection({}: {}) {
  const router = useRouter();
  const { id } = router.query;
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { data, isLoading, isFetching, refetch } =
    useGetStreamCommentsQuery(id);

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);
  useEffect(() => {
    io(process.env.NEXT_PUBLIC_BASEURL!, {
      forceNew: false,
    }).on("commentchange", (data: any) => {
      refetch();
    });
  }, [io(process.env.NEXT_PUBLIC_BASEURL!)]);
  return (
    <Box
      pos={"relative"}
      w={{ base: "full", md: "400px" }}
      maxW={{ base: "full", md: "400px" }}
      px="20px"
      pb="80px"
      minW={{ base: "full", md: "400px" }}
      bg={Color().whiteAndBlack}
      h={{ base: "auto", lg: "90vh" }}
      minH={{ base: "auto", lg: "90vh" }}
      maxH={{ base: "auto", lg: "90vh" }}
      pt={"20px"}
      overflowY="scroll"
      sx={scrollBarStyle}
    >
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="smHead"
      >
        Comments
      </Text>

      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Flex
            key={i}
            w="full"
            mt="15px"
            bg="clique.ashGrey"
            rounded="10px"
            p="20px"
          >
            <SkeletonCircle minH="40px" minW="40px" mr="20px" />
            <Box w="full">
              <Skeleton h="15px" />
              <Skeleton h="15px" mt="5px" />
            </Box>
          </Flex>
        ))}

      {data &&
        data?.data?.map((comment: any, i: number) => (
          <EachComment key={comment._id} comment={comment} />
        ))}

      <NewComment profile={userProfile} id={id as string} />
    </Box>
  );
}

export default CommentSection;
