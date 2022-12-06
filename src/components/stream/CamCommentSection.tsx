import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useAppSelector } from 'redux/app/hooks';
import { useGetStreamCommentsQuery } from 'redux/services/livestream/streamComment.service';

import {
	Box,
	Button,
	Flex,
	Icon,
	Skeleton,
	SkeletonCircle,
	Text,
} from '@chakra-ui/react';
import { scrollBarStyle } from '@constants/utils';

import EachChatComment from './EachChatComment';
import NewChatComment from './NewChatComment';

function CamCommentSection({
  setClose,
  data,
  id,
}: {
  setClose: any;
  data: any;
  id: string;
}) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const router = useRouter()

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Box
      pos={"absolute"}
      w="400px"
      right="0"
      top="10vh"
      maxW="400px"
      px="20px"
      pb="80px"
      minW="400px"
      bg="clique.chat"
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
        >
          Live Chat
        </Text>

        <Button
          onClick={() => setClose(true)}
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
