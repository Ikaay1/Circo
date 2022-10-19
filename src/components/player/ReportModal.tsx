import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { VscReport } from "react-icons/vsc";
function ReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Icon
        onClick={onOpen}
        cursor={"pointer"}
        mr="40px"
        fontSize="18px"
        as={VscReport}
        color="clique.white"
      />
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
          m="0"
          p="0"
          position={"absolute"}
          right={0}
          bg="clique.black"
        >
          <Box px="50px">
            <Text
              py="30px"
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontWeight={500}
              textTransform={"capitalize"}
              fontSize="20px"
            >
              Report
            </Text>
            <Text
              mt="5px"
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"14px"}
              lineHeight={"1.3"}
            >
              Why are you reporting this?
            </Text>{" "}
            <Text
              mt="15px"
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"14px"}
              lineHeight={"1.5"}
            >
              Your report is anonymous, feel free to click all related issues as
              to why you are making this report to help our team keep this
              platform safe, and secure.
            </Text>
            <Box>
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
                    <Field name="spam" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={form.errors.spam && form.touched.spam}
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            It’s spam
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="sexual" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={form.errors.sexual && form.touched.sexual}
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            Nudity or sexual activity
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="dislike" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={
                            form.errors.dislike && form.touched.dislike
                          }
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            I just don’t like it
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="symbols" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={
                            form.errors.symbols && form.touched.symbols
                          }
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            Hate speech or symbols
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="dangerous" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={
                            form.errors.dangerous && form.touched.dangerous
                          }
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            Viloence or dangerous organisations
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="harassment" type="checkbox">
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          display={"flex"}
                          alignItems={"center"}
                          isInvalid={
                            form.errors.harassment && form.touched.harassment
                          }
                        >
                          <Checkbox {...field} mr="10px" />
                          <Text
                            color={"clique.white"}
                            fontFamily={"Poppins"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"1"}
                          >
                            Bullying or harassment
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={"50px"}
                      w="full"
                      size="lg"
                      bg="clique.base"
                      color="clique.white"
                      rounded={"full"}
                      colorScheme="purple"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReportModal;
