import {
  Box,
  Flex,
  FormErrorMessage,
  Grid,
  GridItem,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Stream from "./Stream";
import * as Yup from "yup";
import DetailCard from "./DetailCard";
import SelectField from "./SelectField";
import AuthButton from "@components/auth/AuthButton";
import AddIcon from "@icons/AddIcon";
import WebCamIcon from "@icons/WebCamIcon";

function WebCamModal({ setState }: { setState: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        mt="5px"
        cursor={"pointer"}
        onClick={() => {
          onOpen();
        }}
        h="40px"
        position={"relative"}
      >
        <Flex
          pl="10"
          _hover={{
            color: "clique.base",
          }}
          transition={"all 0.2s ease-in-out"}
          color={isOpen ? "clique.base" : "clique.whiteGrey"}
          alignItems={"center"}
        >
          <Icon as={WebCamIcon} fontSize="head" />
          <Text
            fontSize="subHead"
            fontFamily={"Poppins"}
            fontWeight={500}
            pl="5"
          >
            Webcam
          </Text>
        </Flex>
      </Flex>

      <Modal size={"4xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay /> <ModalOverlay />
        <ModalContent
          bg="clique.black"
          borderColor="clique.black"
          borderRadius="xl"
        >
          <ModalBody>
            <Formik
              initialValues={{ title: "", description: "", thumbNail: null }}
              validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
                thumbNail: Yup.mixed().required("Required"),
                ageRange: Yup.string().required("Required"),
                category: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 4000);
              }}
            >
              {(props) => (
                <Form>
                  <Flex w="full">
                    <Box w="100%">
                      <Text fontSize="smSubHead" color="clique.text">
                        Live details
                      </Text>

                      <Box>
                        <DetailCard
                          input={true}
                          name="title"
                          label="Live title"
                        />
                        <DetailCard
                          input={false}
                          name="description"
                          label="Description"
                        />
                        <Input
                          type={"file"}
                          onChange={(e: any) => {
                            props.setFieldValue("thumbNail", e.target.files[0]);
                          }}
                          display={"none"}
                          id={"thumbnail"}
                        />{" "}
                        <Text mt="7" fontSize="smSubHead">
                          Thumbnail
                        </Text>
                        <Text
                          fontSize="xsl"
                          color="clique.secondaryGrey2"
                          mb="2"
                        >
                          Select or upload a picture that shows what is your
                          video
                        </Text>
                        <label htmlFor={"thumbnail"}>
                          {props.values.thumbNail ? (
                            <Box mt="7">
                              {" "}
                              <Box
                                bgImage={
                                  "url(" +
                                  URL.createObjectURL(props.values.thumbNail) +
                                  ")"
                                }
                                rounded="10px"
                                h="120px"
                                w="250px"
                                bgRepeat={"no-repeat"}
                                bgSize={"cover"}
                              ></Box>
                            </Box>
                          ) : (
                            <Flex gap="2" mb="4" cursor={"pointer"}>
                              <Flex
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent="center"
                                gap="2"
                                py={4}
                                border="1px"
                                width="40%"
                                borderRadius={"10px"}
                                borderColor="clique.secondaryGrey2"
                                borderStyle="dashed"
                              >
                                <Icon as={AddIcon} />
                                <Text fontSize="smSubHead">
                                  Upload Thumbnail
                                </Text>
                              </Flex>
                            </Flex>
                          )}
                        </label>
                        <FormErrorMessage>
                          {props.errors.thumbNail}
                        </FormErrorMessage>
                      </Box>

                      <Text fontSize={"subHead"} mb="4">
                        Other Parameters
                      </Text>

                      <Grid
                        pb="50px "
                        templateColumns="repeat(4, 1fr)"
                        w="100%"
                        gap={4}
                      >
                        <GridItem colSpan={2}>
                          <SelectField
                            w="full"
                            name="category"
                            placeholder="Select Category"
                          >
                            <option>lsd;lfksdmlf</option>
                          </SelectField>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <SelectField name="ageRange" placeholder="Age Range">
                            <option value={"1"}>lsd;lfksdmlf</option>
                          </SelectField>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <AuthButton
                            w="50%"
                            mx="auto"
                            name={"Save"}
                            h="60px"
                            fontSize="subHead"
                            status={{ isLoading: props.isSubmitting }}
                          />
                        </GridItem>
                      </Grid>
                    </Box>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WebCamModal;
