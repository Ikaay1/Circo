import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Icon,
  Text,
  Box,
  FormControl,
  Checkbox,
} from "@chakra-ui/react";
import CliqueGiftIcon from "@icons/CliqueGiftIcon";
import { Field, Form, Formik } from "formik";
import React from "react";
import GiftOption from "./GiftOption";

function GiftModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Icon
        onClick={onOpen}
        fontSize="28px"
        cursor={"pointer"}
        as={CliqueGiftIcon}
      />
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="0" p="40px" rounded={"20px"} bg="clique.primaryBg">
          <Text
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"14px"}
            lineHeight={"1"}
            textAlign="center"
          >
            Select a Clique gift for{" "}
            <Text as="span" color="clique.base">
              Tiwa Savage
            </Text>
          </Text>

          <Box mt="20px">
            <Formik
              initialValues={{}}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
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
                    icon="/gift2.svg"
                    id="2"
                  />

                  <GiftOption
                    props={props}
                    title="Sopphire"
                    price="5000"
                    icon="/gift3.svg"
                    id="3"
                  />
                  <GiftOption
                    props={props}
                    title="Diamond"
                    price="10,000"
                    icon="/gift1.svg"
                    id="4"
                  />
                  <Button
                    mt={"20px"}
                    w="full"
                    size="lg"
                    bg="clique.base"
                    color="clique.white"
                    rounded={"full"}
                    colorScheme="purple"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Pay from wallet
                  </Button>
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
