import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

import {
  Avatar,
  Box,
  Fade,
  Flex,
  Icon,
  ScaleFade,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddToPlaylistModal from "@components/profile/AddToPlaylistModal";
import PlaylistAddIcon from "@icons/PlaylistAddIcon";
import ShareE from "@icons/ShareE";
import TrashIcon from "@icons/TrashIcon";
import VideoSideIcon from "@icons/VideoSideIcon";

import { API, baseUrl, contentData } from "../../constants/utils";
import { useRoutingChannel } from "../../hooks/useRoutingChannel";
import HoverCard from "./HoverCard";
import SubScribeModal from "./SubScribeModal";
import SmallMenu from "./SmallMenu";

function VideoThumb({
  video,
  thumbWidth,
  isSubscribed,
  lastElementRef,
  setContents,
}: {
  video: contentData;
  thumbWidth: { base: string; lg: string; mlg: string; xl: string };
  isSubscribed: boolean;
  lastElementRef?: any;
  setContents?: any;
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPlay,
    onOpen: onOpenPlay,
    onClose: onClosePlay,
  } = useDisclosure();
  const [isHover, setIsHover] = React.useState(false);
  const { handleRouting } = useRoutingChannel();
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = async (i: number) => {
    if (i === 1) {
      onOpenPlay();
    } else if (i === 2) {
      await API.delete(`${baseUrl}content/delete-video/${video._id}`);
      toast({
        title: "Video successfully deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      // router.reload();
      setContents((prevContents: contentData[]) =>
        prevContents.filter((content) => content._id !== video._id)
      );
    }
  };
  return (
    <>
      <Box position={"relative"} ref={lastElementRef}>
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
          <Box position={"relative"}>
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
              <SubScribeModal
                onClose={onClose}
                isOpen={isOpen}
                onOpen={onOpen}
                id={video?.uploader_id?._id}
                userName={video?.uploader_id?.userName}
              />
              <Box
                h={{ lg: "130px", mlg: "180px" }}
                bgImage={`url(${video?.thumbNail})`}
                bgSize="cover"
                bgPosition="center"
                rounded={"10px"}
              />
            </Box>

            <Flex mt="15px">
              <Avatar
                mr={"10px"}
                p="0"
                size="sm"
                name={
                  video?.uploader_id?.firstName +
                  " " +
                  video?.uploader_id?.lastName
                }
                src={video?.uploader_id?.photo}
                onClick={() => handleRouting(video?.uploader_id?._id)}
                cursor="pointer"
              />

              <Box w="calc(100% - 40px)">
                <Text
                  noOfLines={1}
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
              <Flex>
                {/* <SmallMenu /> */}
                <Icon
                  as={VideoSideIcon}
                  fontSize="25px"
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                ></Icon>
              </Flex>
            </Flex>
            {show ? (
              <Box
                position={"absolute"}
                bottom="0"
                right="0.2"
                bg="clique.darkGrey1"
                p="3"
                borderTopLeftRadius={15}
                borderBottomRightRadius={"10px"}
                pl="1"
                sx={{
                  transition: "all 3s ease-in-out",
                }}
                onMouseLeave={() => setShow(false)}
              >
                {router.asPath === "/channel/1/content"
                  ? VideoSideMenu.map((each, i) => (
                      <Flex
                        align="center"
                        justifyItems={"center"}
                        mb="2"
                        key={i}
                        cursor="pointer"
                        onClick={() => handleClick(i)}
                      >
                        <Icon
                          as={each.icon}
                          fontSize="15px"
                          cursor="pointer"
                        ></Icon>
                        <Text ml="2" fontSize={"sm3"}>
                          {each.text}
                        </Text>
                      </Flex>
                    ))
                  : VideoSideMenu2.map((each, i) => (
                      <Flex
                        align="center"
                        justifyItems={"center"}
                        mb="2"
                        key={i}
                        cursor="pointer"
                        onClick={() => handleClick(i)}
                      >
                        <Icon
                          as={each.icon}
                          fontSize="15px"
                          cursor="pointer"
                        ></Icon>
                        <Text ml="2" fontSize={"sm3"}>
                          {each.text}
                        </Text>
                      </Flex>
                    ))}
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
      <AddToPlaylistModal
        isOpen={isOpenPlay}
        onClose={onClosePlay}
        videoId={video._id}
      />
    </>
  );
}

export default VideoThumb;

const VideoSideMenu2 = [
  { icon: ShareE, text: "Share" },
  { icon: PlaylistAddIcon, text: "Add to playlist" },
];

const VideoSideMenu = [
  { icon: ShareE, text: "Share" },
  { icon: PlaylistAddIcon, text: "Add to playlist" },
  { icon: TrashIcon, text: "Delete Video" },
];
