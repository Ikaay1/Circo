import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Color from "@constants/color";
import { useAppSelector } from "redux/app/hooks";
import ShareIcon from "@icons/ShareIcon";
import CopyBox from "@components/player/CopyBox";

function VideoDetails({ stream }: { stream: any }) {
  const { token } = useAppSelector((store) => store.app.userReducer);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const blackAndWhite = Color().blackAndWhite2;

  return (
    <Box mt="20px">
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="smHead"
      >
        {stream?.eventId?.title}
      </Text>
      <Flex my="10px" justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Flex
            mr="20px"
            alignItems={"center"}
            justifyContent="center"
            p="4px"
            border={"4px solid"}
            borderColor="clique.base"
            rounded="full"
          >
            <Avatar
              p="0"
              size="md"
              name={stream?.streamerId?.name ?? "NA"}
              src={stream?.streamerId?.photo}
            />
          </Flex>

          <Box>
            <Text
              noOfLines={2}
              color={Color().blackAndWhite}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="subHead"
              textTransform={"uppercase"}
              lineHeight={"1.2"}
            >
              {stream?.streamerId?.name ?? "NA"}
            </Text>
            <Text
              mt="5px"
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="smSubHead"
              lineHeight={"1.2"}
            ></Text>
          </Box>
        </Flex>
        {token && (
          <Flex alignItems={"center"}>
            <Box
              mr="1rem"
              cursor="pointer"
              onClick={() => {
                onOpen();
              }}
            >
              <Icon as={ShareIcon} color={blackAndWhite} />
            </Box>
            {/* <Box
              p=".6rem 1.2rem"
              rounded="full"
              fontWeight={400}
              bg={
                subscribers.includes(userProfile._id)
                  ? "clique.grey"
                  : "clique.base"
              }
              color="clique.white"
              onClick={
                !subscribers.includes(userProfile._id)
                  ? () => router.push(`/channel/${video?.channel_id?.name}`)
                  : () => {}
              }
              cursor={
                !subscribers.includes(userProfile._id) ? "pointer" : "default"
              }
            >
              {subscribers.includes(userProfile._id)
                ? "Subscribed"
                : "Subscribe"}
            </Box> */}
            <Button
              rounded="full"
              fontWeight={400}
              bg={"clique.purple"}
              cursor="pointer"
              onClick={() => console.log("clicked")}
            >
              Subscribed
            </Button>
          </Flex>
        )}
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position="absolute"
            left={"50%"}
            transform={"translate(-50%, 60%)"}
            w={{ base: "100%", lg: "auto" }}
          >
            <CopyBox
              link={`${stream?.streamerId?.name}/stream/${stream?.eventId?._id}`}
              type="stream"
            />
          </Box>
        </ModalContent>
      </Modal>
      <Text
        mt="5px"
        noOfLines={2}
        color={"clique.darkGrey"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.2"}
      >
        Video Description
      </Text>{" "}
      <Text
        mt="5px"
        color={Color().blackAndWhite}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.5"}
        w="70%"
      >
        {stream?.eventId?.description}
      </Text>
    </Box>
  );
}

export default VideoDetails;
