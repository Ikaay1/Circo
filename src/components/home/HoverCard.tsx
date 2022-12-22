import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
import { useRoutingChannel } from "../../hooks/useRoutingChannel";
import SmallPlayer from "./SmallPlayer";
import SubScribeModal from "./SubScribeModal";

function HoverCard({
  setIsHover,
  isSubscribed,
  id,
  video,
  name,
  userId,
  photo,
}: {
  setIsHover: any;
  isSubscribed: boolean;
  id: string;
  userId: string;
  video: contentData;
  name: string;
  photo: string;
}) {
  const router = useRouter();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [subscribe, subscribeStatus] = useSubscribeMutation();
  const { handleRouting } = useRoutingChannel();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);

  return (
    <Box
      onMouseLeave={() => setIsHover(false)}
      position={"absolute"}
      cursor={"pointer"}
      rounded="20px"
      overflow={"hidden"}
      zIndex={100}
      bg="clique.secondaryGrey1"
      w="calc(100% + 20px)"
      transform={"translateX(-10px)"}
    >
      <Box
        onClick={() => {
          if (isSubscribed) {
            router.push(`/player/${id}/${userId}`);
          } else {
            onOpen();
          }
        }}
      >
        <SmallPlayer video={video} />
      </Box>
      <Flex p="15px">
        {photo ? (
          <Avatar
            mr={"10px"}
            p="0"
            size="sm"
            name="Prosper Otemuyiwa"
            src={photo}
            onClick={() => handleRouting(video?.uploader_id?._id)}
            cursor="pointer"
          />
        ) : (
          <Avatar
            size="sm"
            name={
              video?.uploader_id?.firstName + " " + video?.uploader_id?.lastName
            }
            borderColor="clique.greenYellow"
            onClick={() => handleRouting(video?.uploader_id?._id)}
            cursor="pointer"
            mr={"10px"}
            p="0"
          />
        )}
        <Box>
          <Text
            noOfLines={1}
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
            @{name}
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
            {video.uploader_id?._id !== userProfile?._id && (
              <>
                {/* // <Button
              //   color='clique.white'
              //   bg={
              //     video.uploader_id.subscribers.includes(userProfile?._id)
              //       ? 'clique.grey'
              //       : 'clique.purple'
              //   }
              //   rounded={'full'}
              //   fontWeight='400'
              //   size={'sm'}
              // >
              //   {video.uploader_id.subscribers.includes(userProfile?._id)
              //     ? 'Subscribed'
              //     : 'Subscribe'}
              // </Button> */}
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      <SubScribeModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        id={video?.uploader_id?._id}
        userName={video?.uploader_id?.userName}
      />
    </Box>
  );
}

export default HoverCard;
