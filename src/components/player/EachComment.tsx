import moment from "moment";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { VscReport } from "react-icons/vsc";
import { useAppSelector } from "redux/app/hooks";

import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

import commentInterface from "../../constants/utils";
import ReportModal from "./ReportModal";
import {
  useDislikeContentCommentMutation,
  useLikeContentCommentMutation,
} from "redux/services/content.service";

function EachComment({ comment }: { comment: commentInterface }) {
  const [likeComment, likeInfo] = useLikeContentCommentMutation();
  const [dislikeComment, dislikeInfo] = useDislikeContentCommentMutation();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const handleLikeComment = async (id: string) => {
    await likeComment({ commentId: id });
  };

  const handleDislikeComment = async (id: string) => {
    await dislikeComment({ commentId: id });
  };
  return (
    <Flex mt="15px" bg="clique.ashGrey" rounded="10px" p="20px">
      <AvataWithSpace
        name={
          comment?.commenterId?.firstName + " " + comment?.commenterId?.lastName
        }
        url={comment?.commenterId?.photo}
        mr="20px"
        size="40px"
        borderThickness="2px"
        borderColor="clique.base"
      />
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.2"}
            mr="10px"
          >
            {`${
              comment.commenterId.firstName[0].toUpperCase() +
              comment.commenterId.firstName.slice(1)
            } ${comment.commenterId.lastName[0].toUpperCase()}`}
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
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.3"}
        >
          {comment.comment.comment}
        </Text>
        <Flex alignItems={"center"} justifyContent="space-between" mt="15px">
          <Flex alignItems={"center"}>
            <Flex cursor={"pointer"} alignItems={"center"}>
              {likeInfo.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
                <Box onClick={() => handleLikeComment(comment._id)}>
                  <Icon
                    color={
                      comment.comment.likes.includes(userProfile?._id)
                        ? "clique.base"
                        : "clique.white"
                    }
                    mr="5px"
                    fontSize="20px"
                    as={BiLike}
                  />
                </Box>
              )}
              <Text
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment.comment.likes.length}
              </Text>
            </Flex>

            <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
              {dislikeInfo.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
                <Box onClick={() => handleDislikeComment(comment._id)}>
                  <Icon
                    color={
                      comment.comment.dislikes.includes(userProfile?._id)
                        ? "clique.base"
                        : "clique.white"
                    }
                    mr="5px"
                    fontSize="smHead"
                    as={BiDislike}
                  />
                </Box>
              )}
              <Text
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment.comment.dislikes.length}
              </Text>
            </Flex>
          </Flex>
          <ReportModal comment={comment} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default EachComment;
