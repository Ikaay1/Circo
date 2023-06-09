import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {BiDislike, BiLike} from 'react-icons/bi';
import {useAppSelector} from 'redux/app/hooks';
import {
  useDislikeStreamCommentMutation,
  useLikeStreamCommentMutation,
} from 'redux/services/livestream/streamComment.service';

import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

import EachReply from './EachReply';
import NewReplyComment from './NewReplyComment';

function EachChatComment({comment}: {comment: any}) {
  const router = useRouter();
  const {id} = router.query;
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  const [likeStreamComment, commentInfo] = useLikeStreamCommentMutation();
  const [dislikeStreamComment, commentInfo2] =
    useDislikeStreamCommentMutation();

  const [show, setShow] = useState(false);
  return (
    <Box position={'relative'}>
      <Box mt='5px' rounded='10px' px='20px' pt='20px'>
        <Flex>
          <AvataWithSpace
            name={comment?.commentUser?.name ?? 'NA'}
            url={comment?.commentUser?.photo}
            mr='20px'
            size='40px'
            borderThickness='2px'
            borderColor='clique.base'
          />
          <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text
                mr='10px'
                noOfLines={2}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'subHead'}
                lineHeight={'1.2'}
                maxW={'200px'}
              >
                {comment?.commentUser?.name ?? ' NA '}
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

            <Text
              mt='5px'
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1.3'}
            >
              {comment?.commentBody}
            </Text>
            {/* <Flex
              alignItems={"center"}
              justifyContent="space-between"
              mt="15px"
            >
              <Flex alignItems={"center"}>
                <Flex cursor={"pointer"} alignItems={"center"}>
                  <Box
                    onClick={async () => {
                      await likeStreamComment({
                        commentId: comment._id,
                      });
                    }}
                  >
                    <Icon
                      color={
                        comment?.likes?.includes(userProfile?._id)
                          ? "clique.base"
                          : "clique.white"
                      }
                      mr="5px"
                      fontSize="20px"
                      as={BiLike}
                    />
                  </Box>
                  <Text
                    color={"clique.white"}
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={"smSubHead"}
                    lineHeight={"1.2"}
                  >
                    {comment?.countCommentLikes}
                  </Text>
                </Flex>

                <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
                  <Box
                    onClick={async () => {
                      await dislikeStreamComment({
                        commentId: comment._id,
                      });
                    }}
                  >
                    <Icon
                      color={
                        comment?.dislikes?.includes(userProfile?._id)
                          ? "clique.base"
                          : "clique.white"
                      }
                      mr="5px"
                      fontSize="smHead"
                      as={BiDislike}
                    />
                  </Box>
                  <Text
                    color={"clique.white"}
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={"smSubHead"}
                    lineHeight={"1.2"}
                  >
                    {comment?.countCommentDislikes}
                  </Text>
                </Flex>
              </Flex>
            </Flex> */}
          </Box>
        </Flex>
        {/* <Flex>
          {comment?.replies?.length > 0 && (
            <>
              <Text
                fontSize={"sm"}
                mt=".5rem"
                cursor="pointer"
                color="clique.white"
                onClick={() => setShow((prevShow) => !prevShow)}
              >
                {!show ? "Show replies" : "Hide replies"}{" "}
                <Text
                  color="clique.base"
                  fontWeight={"bold"}
                  as="span"
                >{`(${comment?.replies?.length})`}</Text>
              </Text>
            </>
          )}
          <Text
            fontSize={"sm"}
            mt=".5rem"
            ml="1rem"
            cursor="pointer"
            color="clique.white"
            onClick={() => setShow((prevShow) => !prevShow)}
          >
            Reply
          </Text>
        </Flex> */}
      </Box>{' '}
      {show && (
        <Box mt='.5rem'>
          <NewReplyComment id={comment._id} />
        </Box>
      )}
      {show && comment?.replies?.length > 0 && (
        <>
          {comment?.replies?.map((reply: any) => (
            <Box key={reply._id}>
              <EachReply reply={reply} commentId={comment._id} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

export default EachChatComment;
