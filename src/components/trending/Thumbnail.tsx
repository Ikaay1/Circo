import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import SmallPlayer from "./SmallPlayer";
import { decrypt } from "@constants/utils";
import React, { useEffect } from "react";

function Thumbnail({ video }: { video: any }) {
  const [isHover, setIsHover] = React.useState(false);
  const [url, setUrl] = React.useState("");
  useEffect(() => {
    async function display(videoStream: string) {
      setUrl(videoStream);
    }

    display(decrypt(video?.video));
  }, []);

  return (
    <Box
      onMouseOver={() => {
        setTimeout(() => {
          setIsHover(true);
        }, 2500);
      }}
      onMouseOut={() => {
        setTimeout(() => {
          setIsHover(false);
        }, 2500);
      }}
      cursor={"pointer"}
      rounded="10px"
      // bg={useColorModeValue("clique.white", "clique.secondaryGrey1")}
      w="100%"
      h="100%"
      position={"relative"}

      //   display={show ? "block" : "none"}
    >
      {video?.isFree && (
        <Text
          bg="clique.freeColor"
          borderTopRightRadius={"8px"}
          borderBottomLeftRadius={"8px"}
          w="60px"
          h="21px"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          color="clique.black"
          fontWeight={"600"}
          position="absolute"
          top={"0"}
          right="0"
        >
          Free
        </Text>
      )}
      {!isHover && (
        <Image
          maxH={"100%"}
          h="100%"
          width="100%"
          objectFit={"cover"}
          src={video.thumbNail}
          alt="kortyvid"
          borderRadius="10px"
        />
      )}
      {isHover && <SmallPlayer url={url} video={video} />}
    </Box>
  );
}

export default Thumbnail;
