import React, { useState } from "react";
import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/app/hooks";
import { useRouter } from "next/router";
import EachComment from "./EachComment";
import NewComment from "./NewComment";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import { scrollBarStyle } from "@constants/utils";

function CommentSection({}: {}) {
  const router = useRouter();
  const { id } = router.query;
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { data, isLoading, isFetching } = useGetStreamCommentsQuery(id);

  return (
    <Box
      pos={"relative"}
      w="400px"
      maxW="400px"
      px="20px"
      pb="80px"
      minW="400px"
      bg="clique.black"
      h="90vh"
      minH="90vh"
      maxH="90vh"
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
