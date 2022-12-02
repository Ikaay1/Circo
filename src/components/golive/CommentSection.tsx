import React, { useState } from "react";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/app/hooks";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import EachComment from "@components/stream/EachComment";
import NewComment from "./NewComment";

function CommentSection({ streamDetails }: any) {
  const router = useRouter();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { data, isLoading, isFetching } = useGetStreamCommentsQuery(
    streamDetails?.eventId?._id
  );
  return (
    <Box
      w="450px"
      maxW="450px"
      px="20px"
      pb="80px"
      minW="400px"
      bg="clique.black"
      pt={"20px"}
      sx={scrollBarStyle}
      maxH="90vh"
      overflowY="scroll"
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

      {
        <Flex w="full" h="full" flexDir={"column"} justify="space-between">
          <Box>
            {data &&
              data?.data?.map((comment: any, i: number) => (
                <EachComment key={comment._id} comment={comment} />
              ))}
          </Box>

          {!data || (data && data?.data?.length === 0 && <Box></Box>)}

          <NewComment
            profile={userProfile}
            id={streamDetails?.eventId?._id as string}
          />
        </Flex>
      }
    </Box>
  );
}

export default CommentSection;
