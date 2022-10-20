import {
  Box,
  Button,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";
import React from "react";
import BodyOne from "./BodyOne";
import BodyTwo from "./BodyTwo";
import Card from "./EventCard";

function EventModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);
  return (
    <>
      <Card onOpen={onOpen} />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW="400px"
          w="400px"
          bottom="0"
          minH="100vh"
          overflowY={"scroll"}
          sx={scrollBarStyle}
          m="0"
          py="30px"
          position={"absolute"}
          right={0}
          bg="clique.black"
        >
          <Box px="50px">
            <Image
              h={"300px"}
              w="full"
              alt="event flyer"
              src="/eventFlyer.png"
            />
            <Text
              pt="10px"
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontWeight={500}
              textTransform={"capitalize"}
              fontSize="smHead"
            >
              N16,000
            </Text>
            <Text
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontWeight={500}
              textTransform={"capitalize"}
              fontSize="smSubHead"
            >
              per Ticket
            </Text>

            {step === 1 && (
              <SlideFade in={step === 1} offsetX="0px" offsetY={"0"} dir="left">
                <BodyOne setStep={setStep} />
              </SlideFade>
            )}
            {/* {step === 2 && (
              <SlideFade
                in={step === 2}
                offsetX="80px"
                offsetY={"0"}
                dir="right"
              >
                <BodyTwo setStep={setStep} />
              </SlideFade>
            )} */}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventModal;
