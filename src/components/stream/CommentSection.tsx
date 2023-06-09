import { Router, useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
import { socket } from "@constants/socket";

function CommentSection({}: {}) {
  const router = useRouter();
  const { id } = router.query;
  const dummy: any = useRef(null);
  const commentsRef = useRef<string[]>([]);
  const { userProfile, channel } = useAppSelector(
    (store) => store.app.userReducer
  );
  const [comments, setComments] = useState<any[]>([]);
  const { data, isLoading, isFetching } = useGetStreamCommentsQuery(id);
  const value = useColorModeValue("clique.white", "clique.blackGrey");
  useEffect(() => {
    if (data?.data) {
      setComments(data?.data);
    }
  }, [data]);
  useEffect(() => {
    socket.on("commentchange", async (data: any) => {
      console.log(data);
      if (data?.streamId !== id) return;
      const index = comments.findIndex((comment) => {
        return comment._id.toString() === data._id.toString();
      });
      if (index !== -1) {
        setComments((prev) => {
          const newComments = [...prev];
          newComments[index] = data;
          return newComments;
        });
        console.log("found");
      } else if (!commentsRef.current.includes(data._id.toString())) {
        setComments((prev) => [...prev, data]);
        commentsRef.current.push(data._id.toString());
      }
    });

    return () => {
      socket.off("commentchange");
    };
  }, []);

  useEffect(() => {
    socket.emit("joinedStream", {
      streamId: id,
      userId: channel?._id,
    });

    return () => {
      window.addEventListener("beforeunload", () => {
        socket.emit("leaveStream", {
          streamId: id,
          userId: channel?._id,
        });
      });

      Router.events.on("routeChangeStart", () => {
        socket.emit("leaveStream", {
          streamId: id,
          userId: channel?._id,
        });
      });
    };
  }, []);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);
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
      sx={{
        ...scrollBarStyle,

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "clique.base",
        },
      }}
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
          <Flex key={i} w="full" mt="15px" bg={value} rounded="10px" p="20px">
            <SkeletonCircle minH="40px" minW="40px" mr="20px" />
            <Box w="full">
              <Skeleton h="15px" />
              <Skeleton h="15px" mt="5px" />
            </Box>
          </Flex>
        ))}

      {data &&
        comments.map((comment: any, i: number) => (
          <EachComment key={comment._id} comment={comment} />
        ))}
      <div ref={dummy} />

      <NewComment profile={userProfile} id={id as string} />
    </Box>
  );
}

export default CommentSection;
