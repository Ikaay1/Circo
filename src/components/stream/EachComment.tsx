import moment from "moment";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { useAppSelector } from "redux/app/hooks";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

function EachComment({ comment }: { comment: any }) {
  console.log(comment);
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  return (
    <Flex mt="15px" bg="clique.ashGrey" rounded="10px" p="20px">
      <AvataWithSpace
        name={
          comment?.commentUser?.firstName + " " + comment?.commentUser?.lastName
        }
        url={comment?.commentUser?.profilePicture}
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
            color={"clique.white"}
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
          color={"clique.white"}
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
              <Box onClick={() => {}}>
                <Icon
                  color={1 === 1 ? "clique.base" : "clique.white"}
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
                54665
              </Text>
            </Flex>

            <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
              <Box onClick={() => {}}>
                <Icon
                  color={1 === 1 ? "clique.base" : "clique.white"}
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
                64565
                {/* {comment.comment.dislikes.length} */}
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
