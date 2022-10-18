import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { VscReport } from "react-icons/vsc";
import ReportModal from "./ReportModal";

function EachComment() {
  return (
    <Flex mt="15px" bg="clique.ashGrey" rounded="10px" p="20px">
      <Flex
        mr="10px"
        alignItems={"center"}
        justifyContent="center"
        p="2px"
        w="40px"
        h="40px"
        maxH="40px"
        maxW="40px"
        border={"2px solid"}
        borderColor="clique.base"
        rounded="full"
      >
        <Avatar
          p="0"
          m="0"
          size="sm"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />
      </Flex>
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"16px"}
            lineHeight={"1.2"}
          >
            Emmanuel N.
          </Text>
          <Text
            noOfLines={2}
            color={"clique.darkGrey"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"14px"}
            lineHeight={"1.2"}
          >
            2hrs ago
          </Text>
        </Flex>

        <Text
          mt="5px"
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"12px"}
          lineHeight={"1.3"}
        >
          This video is good and it’s it good and i’m out of comment because i
          need to fill this box i created to post comments.
        </Text>
        <Flex alignItems={"center"} justifyContent="space-between" mt="15px">
          <Flex alignItems={"center"}>
            <Flex cursor={"pointer"} alignItems={"center"}>
              <Icon color="clique.white" mr="5px" fontSize="20px" as={BiLike} />
              <Text
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"1.2"}
              >
                12
              </Text>
            </Flex>

            <Flex cursor={"pointer"} mx="20px" alignItems={"center"}>
              <Icon
                color="clique.white"
                mr="5px"
                fontSize="20px"
                as={BiDislike}
              />
              <Text
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"1.2"}
              >
                12
              </Text>
            </Flex>
          </Flex>
          <ReportModal />
        </Flex>
      </Box>
    </Flex>
  );
}

export default EachComment;
