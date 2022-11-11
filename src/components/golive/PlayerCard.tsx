import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";

function PlayerCard({ streamDetails }: any) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (e: string) => {
    navigator.clipboard.writeText(e);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <Box w="400px" maxW="400px" rounded={"10px"} overflow="hidden">
      <Box h="300px">
        <MuxPlayer
          style={{ height: "100%", maxWidth: "100%" }}
          placeholder={
            streamDetails?.eventId?.thumbNails &&
            streamDetails?.eventId?.thumbNails[0]
          }
          playbackId={streamDetails?.playbackId}
          metadata={{
            video_id: streamDetails?.eventId?._id,
            video_title: streamDetails?.eventId?.title,
            viewer_user_id: streamDetails?.eventId?._id,
          }}
          streamType="live:dvr"
          autoPlay
          muted
          loading="page"
        />
      </Box>
      <Box
        roundedBottom={"10px"}
        bg="clique.secondaryGrey1"
        px="15px"
        pt="10px"
        pb="30px"
      >
        <Text
          position={"relative"}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Live Link
        </Text>
        <HStack justifyContent={"space-between"}>
          <Text
            position={"relative"}
            color={"clique.primaryBlue"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="smSubHead"
          >
            https://clique.com/8u6yt26f
          </Text>

          <Button
            onClick={() => {
              handleCopy("https://clique.com/8u6yt26f");
            }}
            _hover={{
              bg: "none",
            }}
            bg="none"
            fontSize={"sm"}
          >
            {isCopied ? "Copied" : <Icon fontSize={"sm2"} as={BiCopy} />}
          </Button>
        </HStack>
        <Text
          mt="10px"
          position={"relative"}
          color={"clique.secondaryGrey2"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Title
        </Text>
        <Text
          position={"relative"}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize="smSubHead"
          textTransform={"uppercase"}
        >
          {streamDetails?.eventId?.title}
        </Text>
        <Text
          mt="10px"
          position={"relative"}
          color={"clique.secondaryGrey2"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Title
        </Text>
        <Text
          position={"relative"}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize="smSubHead"
          textTransform={"uppercase"}
        >
          {streamDetails?.eventId?.title}
        </Text>
        <Flex w="full" justifyContent={"center"}>
          <Button
            mt="80px"
            rounded="full"
            bg="clique.red"
            color="white"
            colorScheme={"red"}
            fontFamily={"Poppins"}
          >
            End Live Session
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default PlayerCard;
