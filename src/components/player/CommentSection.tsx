import React, { useState } from 'react';
import {
	useGetContentCommentsQuery,
	usePostCommentOnContentMutation,
} from 'redux/services/content.service';

import { Box, Text } from '@chakra-ui/react';

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
    <>
      {isLoading || !data ? (
        <Box></Box>
      ) : (
        <Box
          pos={'relative'}
          w='400px'
          maxW='400px'
          px='20px'
          pb='80px'
          minW='400px'
          bg='clique.black'
          h='90vh'
          minH='90vh'
          maxH='90vh'
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

          {data.data.comments.map((comment: any) => (
            <EachComment key={comment._id} comment={comment} />
          ))}
          <NewComment
            handleComment={handleComment}
            setComment={setComment}
            comment={comment}
            postInfo={postCommentOnContentStatus}
          />
        </Box>
      )}
    </>
  );
}

export default CommentSection;
