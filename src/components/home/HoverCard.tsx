import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "redux/app/hooks";
import { useSubscribeMutation } from "redux/services/user.service";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { contentData } from "../../constants/utils";
import SmallPlayer from "./SmallPlayer";
import SubScribeModal from "./SubScribeModal";

function HoverCard({
  setIsHover,
  isSubscribed,
  id,
  video,
}: {
  setIsHover: any;
  isSubscribed: boolean;
  id: string;
  video: contentData;
}) {
  const router = useRouter();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [subscribe, subscribeStatus] = useSubscribeMutation();
  console.log("video is...", video);

  return (
    <Box
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
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
      w="calc(100% + 20px)"
      transform={"translateX(-10px)"}
    >
      <SmallPlayer video={video} />
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
            {video.title}
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
            @{video?.uploader_id?.userName}
          </Text>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Flex alignItems={"center"} mr=".8rem">
              <Text
                noOfLines={2}
                color={"clique.darkGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"1.2"}
                mr="10px"
              >
                {video.view} views
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
                {moment(video?.createdAt).fromNow()}
              </Text>
            </Flex>
            {video.uploader_id._id !== userProfile?._id && (
              <>
                {/* <Box
                  bgImage={
                    props.values.thumbNail?.startsWith("http")
                      ? `url(${props.values.thumbNail})`
                      : `url(${URL.createObjectURL(props.values.thumbNail)})`
                  }
                  rounded="10px"
                  h="120px"
                  w="250px"
                  bgRepeat={"no-repeat"}
                  bgSize={"cover"}
                ></Box> */}
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      <SubScribeModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
    </Box>
  );
}

export default HoverCard;
