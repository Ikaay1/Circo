import React from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Color from "@constants/color";
import End from "@components/stream/End";
import { useRouter } from "next/router";
import moment from "moment";

function EndWebLiveModal({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endStreamDetails, setEndStreamDetails] = React.useState(null as any);
  const router = useRouter();
  console.log(endStreamDetails);
  return (
    <>
      <Button
        pos={"absolute"}
        bottom={"30px"}
        left={"50%"}
        transform={"translateX(-50%)"}
        mt="80px"
        rounded="full"
        bg={"clique.dangerRed"}
        colorScheme={"red"}
        fontFamily={"Poppins"}
        onClick={() => {
          onOpen();
        }}
        color={"white"}
      >
        End Live Stream
      </Button>
      <Modal size={"xl"} isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          px="50px"
          m="0"
          py="40px"
          rounded={"20px"}
          bg={Color().lightAndPrimary}
        >
          <Text
            color={Color().blackAndWhite}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.5"}
            textAlign="center"
          >
            {endStreamDetails ? `Live Ended` : "End Live Stream"}
          </Text>
          {!endStreamDetails ? (
            <>
              <Text
                my="10px"
                color={Color().blackAndWhite}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.5"}
                textAlign="center"
                py="20px"
              >
                Are you sure you want to end this live session?
              </Text>
              <Flex justifyContent={"space-between"}>
                <Button
                  mt={"30px"}
                  size="md"
                  bg="none"
                  w="120px"
                  color={Color().blackAndWhite}
                  border={"1px solid #fff"}
                  onClick={onClose}
                  rounded={"full"}
                  fontWeight={400}
                  colorScheme="whiteAlpha"
                >
                  Cancel
                </Button>

                <End
                  id={id as string}
                  setEndStreamDetails={setEndStreamDetails}
                />
              </Flex>
            </>
          ) : (
            <>
              <AvatarGroup size="md" mt="20px" justifyContent="center" max={8}>
                {endStreamDetails?.views.map((view: any, index: number) => {
                  return (
                    <Avatar key={index} name={view?.name} src={view?.photo} />
                  );
                })}
              </AvatarGroup>

              <Flex justifyContent={"space-between"}>
                <Text
                  my="20px"
                  color={Color().blackAndWhite}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.5"}
                  textAlign="center"
                >
                  Duration:{" "}
                  <span style={{ color: "white" }}>
                    {moment(endStreamDetails?.createdAt).fromNow(
                      endStreamDetails?.endTime
                    )}
                  </span>
                </Text>
                <Text
                  my="20px"
                  color={Color().blackAndWhite}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.5"}
                  textAlign="center"
                >
                  Views:{" "}
                  <span style={{ color: "white" }}>
                    {endStreamDetails?.views.length}
                  </span>{" "}
                </Text>
              </Flex>

              <Button
                mt="10px"
                rounded="full"
                bg={"clique.base"}
                colorScheme={"purple"}
                fontFamily={"Poppins"}
                onClick={() => {
                  router.push("/home");
                }}
                color={"white"}
                size={"md"}
              >
                Back to home
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EndWebLiveModal;
