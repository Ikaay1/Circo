import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EventsCard from "./EventsCard";
import moment from "moment";
import { useAppSelector } from "redux/app/hooks";
import { useRouter } from "next/router";
const NProgress = require("nprogress");

function EventModal({ event }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const userProfile = useAppSelector(
    (store) => store.app.userReducer.userProfile
  );
  return (
    <>
      <EventsCard onOpen={onOpen} event={event} />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW="250px"
          w="250px"
          bottom="0"
          m="0"
          p="0"
          position={"absolute"}
          right={0}
          bg="none"
        >
          <Box px="10px">
            <Image
              w="100%"
              borderTopRadius={"10px"}
              src={event?.eventId?.thumbNails[0]}
              alt="burnaboys event"
            />
            <Box bg="clique.lightGrey" rounded={"10px"} p="20px">
              <Text
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={500}
                fontSize={"smSubHead"}
                lineHeight={"1.3"}
                mr="5px"
              >
                {event?.eventId?.title}
              </Text>
              <Text
                color={"clique.base"}
                fontFamily={"Poppins"}
                fontWeight={500}
                fontSize={"smSubHead"}
                lineHeight={"1.3"}
                mr="5px"
              >
                {moment(event?.eventId?.schedule).format("MMM Do YYYY h:mm a")}
              </Text>
              <Text
                mt="20px"
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.3"}
                mr="5px"
              >
                <Text color={"clique.base"} as="span">
                  About:
                </Text>
                {event?.eventId?.description}
              </Text>

              <Flex
                mt="20px"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Text
                  color={"clique.white"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.3"}
                  mr="5px"
                >
                  <Text color={"clique.base"} as="span">
                    Fee:{" "}
                  </Text>
                  N{event?.eventId?.fee}
                </Text>

                <Button
                  fontFamily={"Poppins"}
                  rounded="full"
                  bg={"clique.darkGrey"}
                  color="clique.black "
                  px="10px"
                  fontWeight={400}
                  size={"sm"}
                  onClick={() => {
                    NProgress.start();

                    if (
                      event?.eventId?.fee === 0 ||
                      event?.eventId?.fee === "0" ||
                      !event?.eventId?.fee ||
                      event?.paid.includes(userProfile?._id) ||
                      event?.streamerId?._id === userProfile?._id
                    ) {
                      router.push(`/stream/${event?.eventId?._id}`);
                    } else {
                      //call paystack
                    }

                    NProgress.done();
                  }}
                >
                  {event?.eventId?.fee === 0 ||
                  event?.eventId?.fee === "0" ||
                  !event?.eventId?.fee ||
                  event?.paid.includes(userProfile?._id) ||
                  event?.streamerId?._id === userProfile?._id
                    ? "Join Stream"
                    : `Purchase Ticket`}
                </Button>
              </Flex>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventModal;
