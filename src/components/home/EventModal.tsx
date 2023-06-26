import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "redux/app/hooks";
import { usePayForLiveMutation } from "redux/services/livestream/live.service";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import EventsCard from "./EventsCard";
import Trailer from "./Trailer";

const NProgress = require("nprogress");

function EventModal({ event }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const userProfile = useAppSelector(
    (store) => store.app.userReducer.userProfile
  );

  const [payForLive, payInfor] = usePayForLiveMutation();
  const toast = useToast();

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
        <ModalOverlay bg="clique.modalOverlay" />
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
            {event?.eventId?.trailer && event?.eventId?.trailer?.length > 0 && (
              <Trailer url={event?.eventId?.trailer} />
            )}

            {(!event?.eventId?.trailer ||
              event?.eventId?.trailer?.length === 0) && (
              <Image
                w="100%"
                borderTopRadius={"10px"}
                src={event?.eventId?.thumbNails[0]}
                alt=" event"
              />
            )}
            <Box
              minH="300px"
              bg="clique.lightGrey"
              roundedBottom={"10px"}
              p="20px"
            >
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

              <Flex alignItems={"center"} mb="3px" mt="10px">
                <Flex
                  flexShrink={0}
                  onClick={() => {}}
                  cursor="pointer"
                  alignItems={"center"}
                  justifyContent="center"
                  p="2px"
                  mr="10px"
                  rounded="full"
                  background="linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)"
                >
                  <Avatar
                    p="0"
                    size="xs"
                    name={event?.streamerId?.name}
                    src={event?.streamerId?.photo}
                  />
                </Flex>
                <Text
                  noOfLines={1}
                  color={"clique.white"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.5"}
                >
                  {event?.streamerId?.name}
                </Text>
              </Flex>
              <Text
                mt="10px"
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
                  onClick={async () => {
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
                      const res: any = await payForLive({
                        eventId: event?.eventId?._id,
                        description: `${event?.eventId?.title}`,
                        amount: event?.eventId?.fee,
                        receiversId: event?.streamerId?._id,
                      });
                      if (res?.data) {
                        router.push(`/stream/${event?.eventId?._id}`);
                        toast({
                          title: "Payment Successful",
                          description:
                            "You have successfully paid for this event",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                          position: "top-right",
                        });
                      } else {
                        toast({
                          title: "Error",
                          description: res?.error
                            ? res.error?.data?.message
                            : "Something went wrong",
                          status: "error",
                          duration: 3000,
                          isClosable: true,
                          position: "top-right",
                        });
                      }
                    }

                    NProgress.done();
                  }}
                  isLoading={payInfor.isLoading}
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
