import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {BiDislike, BiLike} from 'react-icons/bi';
import {VscReport} from 'react-icons/vsc';
import {useAppSelector} from 'redux/app/hooks';
import {
  useDeleteReplyMutation,
  useDislikeReplyMutation,
  useLikeReplyMutation,
} from 'redux/services/content.service';

import {
  Box,
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import TrashIcon from '@icons/TrashIcon';

import replyInterface from '../../constants/utils';

function EachReply({
  reply,
  commentId,
}: {
  reply: replyInterface;
  commentId: string;
}) {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [likeReply, likeInfo] = useLikeReplyMutation();
  const [dislikeReply, dislikeInfo] = useDislikeReplyMutation();
  const [deleteReply, deleteReplyStatus] = useDeleteReplyMutation();

  const handleLikeReply = async (replyId: string) => {
    await likeReply({commentId, replyId});
  };

  const handleReply = async (replyId: string) => {
    await dislikeReply({commentId, replyId});
  };

  const handleDeleteReply = async (replyId: string) => {
    await deleteReply({commentId, replyId});

    onClose();
  };

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Flex
      w='85%'
      ml='auto'
      mt='15px'
      bg={useColorModeValue('clique.lightPrimaryBg', 'clique.ashGrey')}
      rounded='10px'
      p='20px'
    >
      <Box
        mr='20px'
        cursor={'pointer'}
        onClick={() =>
          router.push(
            userProfile?._id === reply?.replierId?._id
              ? '/channel/1/content'
              : `/channel/subscribe/${reply?.replierId?._id}`,
          )
        }
      >
        <AvataWithSpace
          name={reply?.replierId?.channel_id?.name}
          url={reply?.replierId?.channel_id?.photo}
          size='40px'
          borderThickness='2px'
          borderColor='clique.base'
        />
      </Box>

      <Box>
        <Flex alignItems={'center'}>
          <Text
            noOfLines={1}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'subHead'}
            lineHeight={'1.2'}
            mr='20px'
          >
            {`${
              reply.replierId.firstName[0].toUpperCase() +
              reply.replierId.firstName.slice(1)
            } ${reply.replierId.lastName[0].toUpperCase()}`}
          </Text>
          <Text
            noOfLines={2}
            color={'clique.darkGrey'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'smSubHead'}
            lineHeight={'1.2'}
          >
            {moment(reply.createdAt).fromNow()}
          </Text>
        </Flex>

        <Text mt='5px'>
          <pre
            style={{
              fontFamily: 'Poppins',
              lineHeight: '1.3',
              fontSize: '14px',
            }}
          >
            {reply.reply}
          </pre>
        </Text>
        <Flex alignItems={'center'} justifyContent='space-between' mt='15px'>
          <Flex alignItems={'center'}>
            <Flex cursor={'pointer'} alignItems={'center'}>
              {likeInfo.isLoading ? (
                <Spinner size={'sm'} mr='5px' bg='clique.base' />
              ) : (
                <Box onClick={() => handleLikeReply(reply._id)}>
                  <Icon
                    color={
                      reply.likes.includes(userProfile?._id)
                        ? 'clique.base'
                        : ''
                    }
                    mr='5px'
                    fontSize='20px'
                    as={BiLike}
                  />
                </Box>
              )}
              <Text
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {reply.likes.length}
              </Text>
            </Flex>

            <Flex cursor={'pointer'} mx='20px' alignItems={'center'}>
              {dislikeInfo.isLoading ? (
                <Spinner size={'sm'} mr='5px' bg='clique.base' />
              ) : (
                <Box onClick={() => handleReply(reply._id)}>
                  <Icon
                    color={
                      reply.dislikes.includes(userProfile?._id)
                        ? 'clique.base'
                        : ''
                    }
                    mr='5px'
                    fontSize='smHead'
                    as={BiDislike}
                  />
                </Box>
              )}
              <Text
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {reply.dislikes.length}
              </Text>
            </Flex>
          </Flex>
          {/* <ReportModal comment={comment} /> */}
          {reply.replierId._id === userProfile?._id && (
            <Box
              cursor='pointer'
              onClick={() => {
                onOpen();
              }}
              px='2px'
              borderRadius={'5px'}
            >
              <Icon as={TrashIcon} />
            </Box>
          )}
        </Flex>
      </Box>
      <Sure
        isOpen={isOpen}
        onClose={onClose}
        buttonText='Delete'
        header=''
        description='Are you sure you want to delete this reply?'
        onClick={() => handleDeleteReply(reply._id)}
        isLoading={deleteReplyStatus.isLoading}
      />
    </Flex>
  );
}

export default EachReply;
