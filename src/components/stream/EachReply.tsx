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
  useDislikeCommentReplyMutation,
  useLikeCommentReplyMutation,
} from 'redux/services/livestream/streamComment.service';

import {
  Box,
  Flex,
  Icon,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import TrashIcon from '@icons/TrashIcon';

import replyInterface from '../../constants/utils';

function EachReply({reply, commentId}: {reply: any; commentId: string}) {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [likeStreamReply, likeInfo] = useLikeCommentReplyMutation();
  const [dislikeCommentReply, dislikeInfo] = useDislikeCommentReplyMutation();

  const handleLikeReply = async (replyId: string) => {
    await likeStreamReply({commentId, replyId});
  };

  const handleReply = async (replyId: string) => {
    await dislikeCommentReply({commentId, replyId});
  };

  return (
    <Flex
      w='85%'
      ml='auto'
      mt='15px'
      bg={useColorModeValue('clique.ashGrey', 'clique.ashGrey')}
      rounded='10px'
      p='20px'
      color={'clique.darkGrey'}
    >
      <Box
        mr='20px'
        cursor={'pointer'}
        onClick={() =>
          router.push(
            userProfile?._id === reply?.replierId?._id
              ? '/myChannel/content'
              : `/channel/${reply?.name}`,
          )
        }
      >
        <AvataWithSpace
          name={reply?.name}
          url={reply?.photo}
          size='40px'
          borderThickness='2px'
          borderColor='clique.base'
        />
      </Box>

      <Box>
        <Flex alignItems={'center'}>
          <Tooltip
            label={`${reply?.name}`}
            bg='none'
            hasArrow
            color={useColorModeValue('clique.black', 'clique.white')}
            fontSize='sm'
            p='0'
            mt='0'
            placement='top'
          >
            <Text
              noOfLines={1}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'subHead'}
              lineHeight={'1.2'}
              mr='20px'
            >
              {`${reply?.name}`}
            </Text>
          </Tooltip>
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
        </Flex>
      </Box>
    </Flex>
  );
}

export default EachReply;
