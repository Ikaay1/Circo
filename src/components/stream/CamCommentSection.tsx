import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

function CamCommentSection({ setClose, id }: { setClose: any; id: string }) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const { data, isLoading, isFetching, refetch } =
    useGetStreamCommentsQuery(id);
  const router = useRouter();

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
      <Flex w="full" alignItems={"center"} justifyContent="space-between">
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

      {data?.data?.map((comment: any, i: number) => (
        <EachChatComment key={comment._id} comment={comment} />
      ))}

      <NewChatComment profile={userProfile} id={id as string} />
    </Box>
  );
}

export default CamCommentSection;
