import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { useAppSelector } from "redux/app/hooks";
import {
  useDislikeStreamCommentMutation,
  useLikeStreamCommentMutation,
} from "redux/services/livestream/streamComment.service";

import {
  Box,
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import Color from "@constants/color";

function EachComment({ comment }: { comment: any }) {
  const router = useRouter();
  const { id } = router.query;
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const [likeStreamComment, likeInfo] = useLikeStreamCommentMutation();
  const [dislikeStreamComment, dislikeInfo] = useDislikeStreamCommentMutation();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);

  return (
    <Flex
      mt="15px"
      bg={useColorModeValue("clique.lightPrimaryBg", "clique.ashGrey")}
      rounded="10px"
      p="20px"
    >
      <AvataWithSpace
        name={
          comment?.commentUser?.firstName + " " + comment?.commentUser?.lastName
        }
        url={comment?.commentUser?.photo}
        mr="20px"
        size="40px"
        borderThickness="2px"
        borderColor="clique.base"
      />
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            mr="10px"
            noOfLines={2}
            color={Color().blackAndWhite}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.2"}
          >
            {comment?.commentUser?.userName ?? " NA "}
          </Text>
          <Text
            noOfLines={2}
            color={"clique.darkGrey"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"smSubHead"}
            lineHeight={"1.2"}
          >
            {moment(comment.createdAt).fromNow()}
          </Text>
        </Flex>

        <Text
          mt="5px"
          color={Color().blackAndWhite}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.3"}
        >
          {comment?.commentBody}
        </Text>
        <Flex alignItems={"center"} justifyContent="space-between" mt="15px">
          <Flex alignItems={"center"}>
            <Flex cursor={"pointer"} alignItems={"center"}>
              {likeInfo.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
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
                        : Color().blackAndWhite
                    }
                    mr="5px"
                    fontSize="20px"
                    as={BiLike}
                  />
                </Box>
              )}
              <Text
                color={Color().blackAndWhite}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment?.countCommentLikes}
              </Text>
            </Flex>

            <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
              {dislikeInfo.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
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
                        : Color().blackAndWhite
                    }
                    mr="5px"
                    fontSize="smHead"
                    as={BiDislike}
                  />
                </Box>
              )}
              <Text
                color={Color().blackAndWhite}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment?.countCommentDislikes}
              </Text>
            </Flex>
          </Flex>
          {/* <ReportModal comment={comment} /> */}
        </Flex>
      </Box>
    </Flex>
  );
}

export default EachComment;
