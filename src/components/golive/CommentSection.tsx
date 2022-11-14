import React, { useState } from "react";
import {
  useGetContentCommentsQuery,
  usePostCommentOnContentMutation,
} from "redux/services/content.service";

import { Box, Spinner, Text } from "@chakra-ui/react";

import EachComment from "./EachComment";
import NewComment from "./NewComment";
import { scrollBarStyle } from "@constants/utils";

function CommentSection({ id }: { id: string }) {
  const { data, isLoading, refetch } = useGetContentCommentsQuery(id);
  const [postCommentOnContent, postCommentOnContentStatus] =
    usePostCommentOnContentMutation();
  const [comment, setComment] = useState("");
  const handleComment = async () => {
    if (comment) {
      setComment("");
      postCommentOnContent({ videoId: id, comment }).then(() => {
        console.log("commented");
      });
      refetch();
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          pos={"relative"}
          w="400px"
          maxW="400px"
          px="20px"
          pb="80px"
          minW="400px"
          bg="clique.black"
          h="100%"
          pt={"20px"}
          overflowY="scroll"
          sx={scrollBarStyle}
        >
          <Text
            textAlign={"left"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="smHead"
          >
            Comments
          </Text>

          {data?.data?.comments.map((comment: any) => (
            <EachComment key={comment._id} comment={comment} />
          ))}
          <NewComment
            handleComment={handleComment}
            setComment={setComment}
            comment={comment}
          />
        </Box>
      )}
    </>
  );
}

export default CommentSection;
