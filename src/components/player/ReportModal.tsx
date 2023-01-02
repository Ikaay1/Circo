import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { VscReport } from "react-icons/vsc";
import { useReportCommentMutation } from "redux/services/content.service";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import commentInterface from "../../constants/utils";

function ReportModal({ comment }: { comment: commentInterface }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reportComment, reportCommentStatus] = useReportCommentMutation();
  const theToast = useToast();

  const handleReport = async (values: any) => {
    const reports = [];
    for (const key in values) {
      if (values[key] === true) {
        reports.push(key);
      }
    }
    if (!reports.length) {
      toast.error("Please check your report(s)");
      return;
    }
    await reportComment({ commentId: comment._id, reports });
    theToast({
      title: "Comment reported successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
  };
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
              fontSize="smHead"
            >
              Report
            </Text>
            <Text
              mt="5px"
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={" smSubHead"}
              lineHeight={"1.3"}
            >
              Why are you reporting this?
            </Text>{" "}
            <Text
              mt="15px"
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"smSubHead"}
              lineHeight={"1.5"}
            >
              Your report is anonymous, feel free to click all related issues as
              to why you are making this report to help our team keep this
              platform safe, and secure.
            </Text>
            <Box>
              <Formik
                initialValues={{
                  "It’s spam": false,
                  "Nudity or sexual activity": false,
                  "I just don’t like it": false,
                  "Hate speech or symbols": false,
                  "Violence or dangerous organizations": false,
                  "Bullying or harassment": false,
                }}
                onSubmit={(values, actions) => { 
                  handleReport(values);
                  actions.resetForm();
                  actions.setValues({
                    "It’s spam": false,
                    "Nudity or sexual activity": false,
                    "I just don’t like it": false,
                    "Hate speech or symbols": false,
                    "Violence or dangerous organizations": false,
                    "Bullying or harassment": false,
                  });
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="It’s spam" type="checkbox">
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
                            fontSize={"smSubHead"}
                            lineHeight={"1"}
                          >
                            It’s spam
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="Nudity or sexual activity" type="checkbox">
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
                            fontSize={"smSubHead"}
                            lineHeight={"1"}
                          >
                            Nudity or sexual activity
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="I just don’t like it" type="checkbox">
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
                            fontSize={"smSubHead"}
                            lineHeight={"1"}
                          >
                            I just don’t like it
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="Hate speech or symbols" type="checkbox">
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
                            fontSize={"smSubHead"}
                            lineHeight={"1"}
                          >
                            Hate speech or symbols
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field
                      name="Violence or dangerous organizations"
                      type="checkbox"
                    >
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
                            fontSize={"smSubHead"}
                            lineHeight={"1"}
                          >
                            Violence or dangerous organizations
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="Bullying or harassment" type="checkbox">
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
                            fontSize={"smSubHead"}
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
                      isLoading={reportCommentStatus.isLoading}
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
