import React, { useState } from 'react';
import {
	useGetContentCommentsQuery,
	usePostCommentOnContentMutation,
} from 'redux/services/content.service';

import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import Color from '@constants/color';

import EachComment from './EachComment';
import NewComment from './NewComment';

function CommentSection({id}: {id: string | string[] | undefined}) {
  const {data, isLoading, refetch} = useGetContentCommentsQuery(id);
  const [postCommentOnContent, postCommentOnContentStatus] =
    usePostCommentOnContentMutation();
  const [comment, setComment] = useState('');
  const handleComment = async () => {
    if (comment.trim().length) {
      setComment('');
      postCommentOnContent({videoId: id, comment: comment.trim()}).then(
        () => {},
      );
      refetch();
    }
  };

  return (
    <Box
      pos={'relative'}
      w={{base: '100%', lg: '400px'}}
      maxW={{base: '100%', lg: '400px'}}
      px={{base: '10px', lg: '20px'}}
      pb={{base: '40px', lg: '80px'}}
      minW={{base: '100%', lg: '400px'}}
      bg={Color().whiteAndBlack}
      h={{base: 'auto', lg: '90vh'}}
      minH={{base: 'auto', lg: '90vh'}}
      maxH={{base: 'auto', lg: '90vh'}}
      pt={'20px'}
      overflowY='scroll'
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
          rounded: 'full',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: 'clique.grey',
          outline: 'none',
        },
      }}
    >
      <Text
        textAlign={'left'}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
        fontSize='smHead'
      >
        Comments
      </Text>

      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Flex
            key={i}
            w='full'
            mt='15px'
            bg='clique.ashGrey'
            rounded='10px'
            p='20px'
          >
            <SkeletonCircle minH='40px' minW='40px' mr='20px' />
            <Box w='full'>
              <Skeleton h='15px' />
              <Skeleton h='15px' mt='5px' />
            </Box>
          </Flex>
        ))}

      {data &&
        data.data.comments.map((comment: any) => (
          <EachComment key={comment._id} comment={comment} />
        ))}
      <NewComment
        handleComment={handleComment}
        setComment={setComment}
        comment={comment}
        postInfo={postCommentOnContentStatus}
      />
    </Box>
  );
}

export default CommentSection;
