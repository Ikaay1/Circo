import moment from "moment";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { VscReport } from "react-icons/vsc";

import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

function EachComment({ comment }: { comment: any }) {
  return (
    <Flex mt="15px" bg="clique.ashGrey" rounded="10px" p="20px">
      <AvataWithSpace
        name="Prosper Otemuyiwa"
        url="https://bit.ly/prosper-baba"
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
            fontFamily={"Unbounded"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.2"}
          >
            {`${
              comment.commenterId.firstName[0].toUpperCase() +
              comment.commenterId.firstName.slice(1)
            } ${comment.commenterId.lastName[0].toUpperCase()}`}
          </Text>
          <Text
            noOfLines={2}
            color={"clique.darkGrey"}
            fontFamily={"Unbounded"}
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
          fontFamily={"Unbounded"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.3"}
        >
          {comment.comment.comment}
        </Text>
        <Flex alignItems={"center"} justifyContent="space-between" mt="15px">
          <Flex alignItems={"center"}>
            <Flex cursor={"pointer"} alignItems={"center"}>
              <Icon color="clique.white" mr="5px" fontSize="20px" as={BiLike} />
              <Text
                color={"clique.white"}
                fontFamily={"Unbounded"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment.comment.likes.length}
              </Text>
            </Flex>

            <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
              <Icon
                color="clique.white"
                mr="5px"
                fontSize="smHead"
                as={BiDislike}
              />
              <Text
                color={"clique.white"}
                fontFamily={"Unbounded"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                {comment.comment.dislikes.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default EachComment;
