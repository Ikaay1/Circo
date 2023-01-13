import React, { useEffect, useRef, useState } from 'react';
import {
	useGetContentCommentsQuery,
	usePostCommentOnContentMutation,
} from 'redux/services/content.service';

import {
	Box,
	Flex,
	Skeleton,
	SkeletonCircle,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import {
	scrollBarStyle,
	scrollBarStyle2,
	scrollBarStyle3,
	scrollBarStyle4,
} from '@constants/utils';

import EachComment from './EachComment';
import NewComment from './NewComment';

function CommentSection({id}: {id: string | string[] | undefined}) {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(true);
  const [forReply, setForReply] = useState(false);
  const {data, isLoading, refetch, isFetching} = useGetContentCommentsQuery({
    id,
    page,
    limit: 10,
  });
  const dummy = useRef(null);
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

  useEffect(() => {
    if (isFetching && !isLoading && clicked) {
      setLoading(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!page && !forReply) {
      //@ts-ignore
      dummy.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [comments.length]);

  useEffect(() => {
    if (!isFetching && data && clicked) {
      setComments((prevComments) => [
        ...prevComments,
        ...data.data.comments.comments,
      ]);
      setLoading(false);
      setClicked(false);
      setHasMore(page < data.data.comments.totalPages);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching && data && !clicked) {
      setPage(NaN);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching && data && !clicked && !page) {
      setComments(data.data.comments.comments);
      setHasMore(false);
    }
  }, [page, isFetching]);

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
            bg={useColorModeValue('clique.lightPrimaryBg', 'clique.ashGrey')}
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
        comments.length &&
        comments.map((comment: any, i: number) => {
          return (
            <EachComment
              setForReply={setForReply}
              key={comment._id}
              comment={comment}
            />
          );
        })}
      <div ref={dummy} />
      {hasMore && (
        <Text
          color='clique.base'
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            setClicked(true);
          }}
          mb='1rem'
          mt='1rem'
          fontSize={'smSubHead'}
          fontWeight='bold'
          cursor={'pointer'}
        >
          Show more comments
        </Text>
      )}
      {loading && (
        <Flex
          mb='1.7rem'
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
      )}
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
