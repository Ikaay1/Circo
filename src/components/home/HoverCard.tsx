import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import SmallPlayer from "./SmallPlayer";
import SubScribeModal from "./SubScribeModal";

function HoverCard({
  setIsHover,
  isSubscribed,
  id,
}: {
  setIsHover: any;
  isSubscribed: boolean;
  id: string;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        if (isSubscribed) {
          router.push(`/player/${id}`);
        } else {
          onOpen();
        }
      }}
      position={"absolute"}
      cursor={"pointer"}
      rounded="20px"
      overflow={"hidden"}
      zIndex={100}
      bg="clique.secondaryGrey1"
      w="500px"
      h="350px"
    >
      <SmallPlayer />
      <Flex p="15px">
        <Avatar
          mr={"10px"}
          p="0"
          size="sm"
          name="Prosper Otemuyiwa"
          src={
            length === 4
              ? "/assets/ayarstar.png"
              : "https://bit.ly/prosper-baba"
          }
        />
        <Box>
          <Text
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"16px"}
            lineHeight={"1.2"}
          >
            What’s New in the 2023 Volkswagen Arteon, the pro’s and cons of our
            fav german auto
          </Text>

          <Text
            mt="5px"
            noOfLines={2}
            color={"clique.darkGrey"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"14px"}
            lineHeight={"1.2"}
          >
            {length === 4 ? "@ayrastar" : "@wenotch"}
          </Text>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Flex alignItems={"center"}>
              <Text
                noOfLines={2}
                color={"clique.darkGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"1.2"}
                mr="10px"
              >
                {length === 4 ? "1.5M" : "1.2k"} views
              </Text>
              <Text
                pos={"relative"}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 0,
                  width: "4px",
                  background: "clique.darkGrey",
                  height: "4px",
                  rounded: "full",
                }}
                pl="10px"
                noOfLines={2}
                color={"clique.darkGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"1.2"}
              >
                {length === 4 ? "3 hours" : "3 days"} ago
              </Text>
            </Flex>
            <Button
              color="clique.white"
              bg="clique.base"
              rounded={"full"}
              fontWeight="400"
              size={"sm"}
            >
              Subcribe
            </Button>
          </Flex>
        </Box>
      </Flex>
      <SubScribeModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
    </Box>
  );
}

export default HoverCard;
