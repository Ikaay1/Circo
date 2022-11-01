import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EventsCard from "./EventsCard";

function EventModal({ imgUrl }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EventsCard onOpen={onOpen} imgUrl={imgUrl} />

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
              src={imgUrl}
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
                BURNABOY LIVE CONCERT
              </Text>
              <Text
                color={"clique.base"}
                fontFamily={"Poppins"}
                fontWeight={500}
                fontSize={"smSubHead"}
                lineHeight={"1.3"}
                mr="5px"
              >
                Friday 12th March 2021
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
                </Text>{" "}
                Lörem ipsum suledes. Safönde pred in. Oskap nil reaning har
                ultrare. Vajuska varade, cynfili parade, på öl. Intrabel
                tralingar. Prer gps-väst som kat igöskapet. Söning 5:2-diet
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
                    Fee:
                  </Text>{" "}
                  N5000
                </Text>

                <Button
                  fontFamily={"Poppins"}
                  rounded="full"
                  bg={"clique.darkGrey"}
                  color="clique.black "
                  px="10px"
                  fontWeight={400}
                  size={"sm"}
                >
                  pay for live
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
