import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

import {
  Avatar,
  Box,
  Fade,
  Flex,
  ScaleFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { contentData } from "../../constants/utils";
import HoverCard from "./HoverCard";
import SubScribeModal from "./SubScribeModal";

function VideoThumb({
  video,
  thumbWidth,
  isSubscribed,
}: {
  video: contentData;
  thumbWidth: { base: string; lg: string; mlg: string; xl: string };
  isSubscribed: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHover, setIsHover] = React.useState(false);
  console.log(video.uploader_id);

  const router = useRouter();
  return (
    <Box position={"relative"}>
      {isHover ? (
        <ScaleFade reverse unmountOnExit in={isHover}>
          <HoverCard
            setIsHover={setIsHover}
            isSubscribed={isSubscribed}
            id={video._id}
            video={video}
          />
        </ScaleFade>
      ) : (
        <Box
          onMouseEnter={() => setIsHover(true)}
          cursor={"pointer"}
          w="full"
          onClick={() => {
            if (isSubscribed) {
              router.push(`/player/${video._id}`);
            } else {
              onOpen();
            }
          }}
        >
          <SubScribeModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
          <Box
            h={{ lg: "130px", mlg: "180px" }}
            bgImage={`url(${video?.thumbNail})`}
            bgSize="cover"
            bgPosition="center"
            rounded={"10px"}
          />

          <Flex mt="15px">
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
                {video?.title}
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
              <Flex alignItems={"center"} mt="5px">
                <Text
                  noOfLines={2}
                  color={"clique.darkGrey"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"14px"}
                  lineHeight={"1.2"}
                  mr="10px"
                >
                  {video?.view} views
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
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default VideoThumb;
