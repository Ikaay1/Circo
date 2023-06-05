import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAppSelector } from "redux/app/hooks";
import { useGetStreamCommentsQuery } from "redux/services/livestream/streamComment.service";
import io from "socket.io-client";
import {
  Box,
  Button,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";

import EachChatComment from "./EachChatComment";
import NewChatComment from "./NewChatComment";
import Color from "@constants/color";
import { socket } from "@constants/socket";

function CamCommentSection({ setClose, id }: { setClose: any; id: string }) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const [comments, setComments] = useState<any[]>([]);
  const commentsRef = useRef<string[]>([]);
  const { data, isLoading, isFetching } = useGetStreamCommentsQuery(id);
  const dummy: any = useRef(null);
  useEffect(() => {
    if (data?.data) {
      setComments(data?.data);
    }
  }, [data]);

  useEffect(() => {
    socket.on("commentchange", async (data: any) => {
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
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);
  return (
    <Box
      pos={"absolute"}
      zIndex={100}
      w="400px"
      right="0"
      top="10vh"
      maxW="400px"
      px="20px"
      pb="80px"
      minW="400px"
      bg={{ base: "clique.primaryBg", lg: "clique.chat" }}
      h="90vh"
      minH="90vh"
      maxH="90vh"
      pt={"20px"}
      overflowY="scroll"
      sx={scrollBarStyle}
    >
      <Flex
        w="full"
        alignItems={"center"}
        top="0"
        position="sticky"
        justifyContent="space-between"
      >
        <Text
          textAlign={"left"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smHead"
          color={Color().blackAndWhite}
        >
          Live Chat
        </Text>

        <Button
          onClick={() => setClose(true)}
          color="clique.white"
          rightIcon={
            <Icon color="clique.white" fontSize={"16px"} as={MdOutlineClose} />
          }
          size={"sm"}
          rounded="full"
          bg="clique.close"
          fontWeight={"400"}
        >
          Close chat
        </Button>
      </Flex>
      <Box>
        {comments.map((comment: any, i: number) => (
          <EachChatComment key={comment._id} comment={comment} />
        ))}
        <div ref={dummy} />
      </Box>

      <NewChatComment profile={userProfile} id={id as string} />
    </Box>
  );
}

export default CamCommentSection;
