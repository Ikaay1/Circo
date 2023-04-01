import { Field, Form, Formik } from "formik";
import React from "react";
import { useGiftUserMutation } from "redux/services/wallet.service";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Color from "@constants/color";
import CliqueGiftIcon from "@icons/CliqueGiftIcon";

import { contentData } from "../../constants/utils";
import GiftOption from "./GiftOption";

function GiftModal({
  video,
  isFullScreen,
  Bref,
}: {
  video: contentData;
  isFullScreen: boolean;
  Bref: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [giftUser, giftUserStatus] = useGiftUserMutation();
  const toast = useToast();
  return (
    <>
      <Tooltip
        portalProps={{ containerRef: Bref }}
        label="Gift"
        bg="none"
        hasArrow
        color="clique.white"
        fontSize="sm"
        p="0"
        mt="0"
        placement="top"
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            onClick={onOpen}
            fontSize="bigHead"
            cursor={"pointer"}
            color={"clique.white"}
            as={CliqueGiftIcon}
          />
        </span>
      </Tooltip>

      <Modal size={"xl"} isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          m="0"
          p="40px"
          rounded={"20px"}
          bg={Color().lightAndPrimary}
        >
          <Text
            color={Color().blackAndPureWhite}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"smSubHead"}
            lineHeight={"1"}
            textAlign="center"
          >
            Select a Circo gift for{" "}
            <Text as="span" color="clique.base">
              {video?.channel_id?.name}
            </Text>
          </Text>

          <Box mt="20px">
            <Formik
              initialValues={{}}
              onSubmit={async (values: any, actions) => {
                if (!values.selected) {
                  toast({
                    title: "Please select an option",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  return;
                }
                const res: any = await giftUser({
                  amount: Number(values.selected),
                  description: "Gift",
                  receiversId: video.uploader_id._id,
                });
                if ("data" in res) {
                  toast({
                    title: `You've successfully gifted ${video.uploader_userName}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  actions.setValues({});
                  onClose();
                } else {
                  toast({
                    title: res?.error
                      ? res.error?.data?.message
                      : "Something went wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                }
              }}
            >
              {(props) => (
                <Form>
                  <GiftOption
                    props={props}
                    title="Ruby"
                    price="500"
                    icon="/gift1.svg"
                    id="1"
                  />
                  <GiftOption
                    props={props}
                    title="Emerald"
                    price="1000"
                    icon="/gift3.svg"
                    id="2"
                  />

                  <GiftOption
                    props={props}
                    title="Sopphire"
                    price="5000"
                    icon="/gift5.svg"
                    id="3"
                  />
                  <GiftOption
                    props={props}
                    title="Diamond"
                    price="10000"
                    icon="/gift6.svg"
                    id="4"
                  />
                  <Flex justifyContent={"center"}>
                    <Button
                      mt={"30px"}
                      w="70%"
                      size="lg"
                      bg="clique.base"
                      color="clique.white"
                      rounded={"full"}
                      fontWeight={400}
                      colorScheme="purple"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Pay from wallet
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GiftModal;
