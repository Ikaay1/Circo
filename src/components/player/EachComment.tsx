import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { VscReport } from 'react-icons/vsc';
import { useAppSelector } from 'redux/app/hooks';
import {
	useDeleteContentCommentMutation,
	useDislikeContentCommentMutation,
	useLikeContentCommentMutation,
} from 'redux/services/content.service';

import {
	Box,
	Flex,
	Icon,
	Spinner,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import TrashIcon from '@icons/TrashIcon';

import commentInterface from '../../constants/utils';
import ReportModal from './ReportModal';

function EachComment({comment}: {comment: commentInterface}) {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [likeComment, likeInfo] = useLikeContentCommentMutation();
  const [dislikeComment, dislikeInfo] = useDislikeContentCommentMutation();
  const [deleteComment, deleteCommentStatus] =
    useDeleteContentCommentMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const handleLikeComment = async (id: string) => {
    await likeComment({commentId: id});
  };

  const handleDislikeComment = async (id: string) => {
    await dislikeComment({commentId: id});
  };

  const handleDeleteComment = async (id: string) => {
    console.log('id', id);
    const res = await deleteComment(id);
    console.log('res', res);
    onClose();
  };

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Flex mt='15px' bg='clique.ashGrey' rounded='10px' p='20px'>
      <Box
        mr='20px'
        cursor={'pointer'}
        onClick={() =>
          router.push(
            userProfile?._id === comment?.commenterId?._id
              ? '/channel/1/content'
              : `/channel/subscribe/${comment?.commenterId?._id}`,
          )
        }
      >
        <AvataWithSpace
          name={
            comment?.commenterId?.firstName +
            ' ' +
            comment?.commenterId?.lastName
          }
          url={comment?.commenterId?.photo}
          size='40px'
          borderThickness='2px'
          borderColor='clique.base'
        />
      </Box>

      <Box>
        <Flex alignItems={'center'}>
          <Text
            noOfLines={2}
            color={'clique.white'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'subHead'}
            lineHeight={'1.2'}
            mr='20px'
          >
            {`${
              comment.commenterId.firstName[0].toUpperCase() +
              comment.commenterId.firstName.slice(1)
            } ${comment.commenterId.lastName[0].toUpperCase()}`}
          </Text>
          <Text
            noOfLines={2}
            color={'clique.darkGrey'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'smSubHead'}
            lineHeight={'1.2'}
          >
            {moment(comment.createdAt).fromNow()}
          </Text>
        </Flex>

        <Text mt='5px' color={'clique.white'}>
          <pre
            style={{
              fontFamily: 'Poppins',
              lineHeight: '1.3',
              fontSize: '14px',
            }}
          >
            {comment.comment.comment}
          </pre>
        </Text>
        <Flex alignItems={'center'} justifyContent='space-between' mt='15px'>
          <Flex alignItems={'center'}>
            <Flex cursor={'pointer'} alignItems={'center'}>
              {likeInfo.isLoading ? (
                <Spinner size={'sm'} mr='5px' bg='clique.base' />
              ) : (
                <Box onClick={() => handleLikeComment(comment._id)}>
                  <Icon
                    color={
                      comment.comment.likes.includes(userProfile?._id)
                        ? 'clique.base'
                        : 'clique.white'
                    }
                    mr='5px'
                    fontSize='20px'
                    as={BiLike}
                  />
                </Box>
              )}
              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {comment.comment.likes.length}
              </Text>
            </Flex>

            <Flex cursor={'pointer'} mx='20px' alignItems={'center'}>
              {dislikeInfo.isLoading ? (
                <Spinner size={'sm'} mr='5px' bg='clique.base' />
              ) : (
                <Box onClick={() => handleDislikeComment(comment._id)}>
                  <Icon
                    color={
                      comment.comment.dislikes.includes(userProfile?._id)
                        ? 'clique.base'
                        : 'clique.white'
                    }
                    mr='5px'
                    fontSize='smHead'
                    as={BiDislike}
                  />
                </Box>
              )}
              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {comment.comment.dislikes.length}
              </Text>
            </Flex>
          </Flex>
          <ReportModal comment={comment} />
          <Box
            cursor='pointer'
            onClick={() => {
              onOpen();
            }}
          >
            <Icon as={TrashIcon} />
          </Box>
        </Flex>
      </Box>
      <Sure
        isOpen={isOpen}
        onClose={onClose}
        buttonText='Delete'
        header=''
        description='Are you sure you want to delete this comment?'
        onClick={() => handleDeleteComment(comment._id)}
        isLoading={deleteCommentStatus.isLoading}
      />
    </Flex>
  );
}

export default EachComment;
