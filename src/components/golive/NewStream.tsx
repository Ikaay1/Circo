import { Field, Form, Formik } from "formik";
import React from "react";
import { useAppDispatch } from "redux/app/hooks";
import { useCategoryQuery } from "redux/services/category.service";
import {
  useCreateEventMutation,
  useCreateLiveStreamMutation,
} from "redux/services/livestream/live.service";
import { setStreamDetails } from "redux/slices/streamSlice";
import { newStreamSchema } from "schemas/livestream.schema";
import * as Yup from "yup";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Icon,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import { CategoriesInterface } from "@constants/interface";
import AddIcon from "@icons/AddIcon";

import DetailCard from "./DetailCard";
import SelectField from "./SelectField";
import PreviewIcon from "@icons/PreviewIcon";

function NewStream({
  state,
  setTabIndex,
  setState,
}: {
  state: string;
  setTabIndex: any;
  setState: any;
}) {
  const toast = useToast();
  const { data, isLoading } = useCategoryQuery("");
  const [createEvent, createEventInfo] = useCreateEventMutation();
  const [createLiveStream, createLiveInfo] = useCreateLiveStreamMutation();
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        thumbNail: "" as any,
        category: "",
        fee: 0,
        ageRange: "",
        schedule: "",
        trailer: null as any,
      }}
      validationSchema={newStreamSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const data = {
          title: values.title,
          description: values.description,
          ageRange: values.ageRange,
          paidToWatch: values.fee > 0 ? true : false,
          category: state === "stream" ? "LIVE" : "SCHEDULE",
          categoryId: values.category,
        };

        const formData = new FormData();
        formData.append("thumbNail", values.thumbNail);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("ageRange", values.ageRange);
        formData.append("paidToWatch", values.fee > 0 ? "true" : "false");
        formData.append("category", state === "stream" ? "LIVE" : "SCHEDULE");
        formData.append("categoryId", values.category);
        formData.append("fee", values.fee.toString());
        formData.append("schedule", values.schedule);
        if (values.trailer) {
          formData.append("trailer", values.trailer);
        }

        const res: any = await createEvent(formData);
        if (res.data) {
          const createLive: any = await createLiveStream({
            eventId: res.data?.data?._id,
          });
          if (createLive.data) {
            toast({
              title: "Event Created Successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });

            setState("liveevent");
          } else {
            toast({
              title: createLive.error?.data?.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
        } else {
          toast({
            title: "Event Creation Failed",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
        setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w="full" flexDir={{ base: "column", lg: "row" }}>
            <Box w={{ base: "full", lg: "50%" }}>
              <Text fontSize="smSubHead" color="clique.text">
                Live details
              </Text>

              <Box>
                <DetailCard
                  limit={70}
                  input={true}
                  name="title"
                  label="Live title"
                />
                <DetailCard
                  input={false}
                  name="description"
                  label="Description"
                  limit={300}
                />
                <Input
                  type={"file"}
                  onChange={(e: any) => {
                    props.setFieldValue("thumbNail", e.target.files[0]);
                  }}
                  display={"none"}
                  id={"thumbnail"}
                  accept="image/*"
                />
                <Input
                  type={"file"}
                  visibility={"hidden"}
                  onChange={(e: any) => {
                    //if video duration is greater than 10 min
                    if (e.target.files[0].duration > 60) {
                      toast({
                        title: "File Cant be longer than 1 min",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                      });
                      return;
                    }
                    props.setFieldValue("trailer", e.target.files[0]);
                  }}
                  id={"trailer"}
                  //only video
                  accept="video/*"
                />
                <Text mt="7" fontSize="smSubHead">
                  Thumbnail
                </Text>
                <Text fontSize="xsl" color="clique.secondaryGrey2" mb="2">
                  Select or upload a picture that shows what is your video
                </Text>
                <Field>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.thumbNail && form.touched.thumbNail
                      }
                    >
                      <label htmlFor={"thumbnail"}>
                        {props.values.thumbNail ? (
                          <Box mt="7" mb="4">
                            {" "}
                            <Box
                              bgImage={
                                "url(" +
                                URL.createObjectURL(props.values.thumbNail) +
                                ")"
                              }
                              rounded="10px"
                              h="250px"
                              w="250px"
                              bgRepeat={"no-repeat"}
                              bgSize={"cover"}
                              bgPos={"center"}
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
                              h="250px"
                              w="250px"
                              borderRadius={"10px"}
                              borderColor="clique.secondaryGrey2"
                              borderStyle="dashed"
                            >
                              <Icon as={AddIcon} />
                              <Text fontSize="smSubHead">Upload Thumbnail</Text>
                            </Flex>
                          </Flex>
                        )}
                      </label>
                      <FormErrorMessage>
                        {form.errors.thumbNail}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Text fontSize="smSubHead">Preview Video</Text>
                <Text fontSize="xsl" color="clique.secondaryGrey2" mb="2">
                  Select or upload a preview video fro your live show (Max.
                  1min)
                </Text>
                <Field>
                  {({ field, form }: any) => (
                    <FormControl>
                      <label htmlFor={"trailer"}>
                        {props.values.trailer ? (
                          <Box mt="7" mb="4">
                            <Box
                              rounded="10px"
                              h="250px"
                              w="250px"
                              maxH="250px"
                              bgRepeat={"no-repeat"}
                              bgSize={"cover"}
                              bgPosition={"center"}
                            >
                              <video
                                src={
                                  props.values.trailer?.name
                                    ? URL.createObjectURL(props.values.trailer)
                                    : props.values.trailer
                                }
                                width="100%"
                                height="100%"
                                style={{
                                  maxHeight: "250px",
                                }}
                                controls={false}
                              ></video>
                            </Box>
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
                              h="250px"
                              w="250px"
                              borderRadius={"10px"}
                              borderColor="clique.secondaryGrey2"
                              borderStyle="dashed"
                            >
                              <Icon as={PreviewIcon} />
                              <Text fontSize="smSubHead">Upload Video</Text>
                            </Flex>
                          </Flex>
                        )}
                      </label>
                      {/* <FormErrorMessage>
                        {form.errors.thumbNail}
                      </FormErrorMessage> */}
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Text fontSize={"subHead"} mb="4">
                Other Parameters
              </Text>

              <Grid templateColumns="repeat(4, 1fr)" w="100%" gap={4}>
                <GridItem colSpan={2}>
                  <SelectField
                    w="full"
                    name="category"
                    placeholder="Select Category"
                    pointerEvents={isLoading ? "none" : "auto"}
                  >
                    {data &&
                      data?.data?.map(
                        (category: CategoriesInterface, index: number) => (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        )
                      )}
                  </SelectField>
                </GridItem>
                <GridItem colSpan={2}>
                  <SelectField name="ageRange" placeholder="Select Age Range">
                    <option value={"18 and above"}>18 and above</option>
                    <option value={"Below 18"}>Below 18</option>{" "}
                    <option value={"ALL"}>All</option>{" "}
                  </SelectField>
                </GridItem>
              </Grid>
            </Box>

            <Flex
              mt={{ base: "20px", lg: "0" }}
              w={{ base: "full", lg: "50%" }}
              px={{ base: 0, lg: "40px" }}
              flexDir={"column"}
              justify="space-between"
            >
              {state === "create" ? (
                <Box>
                  <Text fontSize="smSubHead" color="clique.text">
                    Live fee per ticket
                  </Text>
                  <DetailCard
                    input={true}
                    name="fee"
                    fee={true}
                    label="Enter fee for live"
                  />
                  <Text mt="10px" fontSize="smSubHead" color="clique.text">
                    Schedule
                  </Text>

                  <Flex alignItems={"center"} justifyContent="space-between">
                    {/* <DetailCard
                      w="48%"
                      input={true}
                      name="time"
                      label="Time"
                      type="time"
                    /> */}
                    <DetailCard
                      w="48%"
                      input={true}
                      name="schedule"
                      type="date"
                      label="date - time"
                    />
                  </Flex>
                </Box>
              ) : (
                <Box></Box>
              )}
              <Box w="100%" pt={{ base: "10px", lg: "0" }}>
                <AuthButton
                  name={"Save"}
                  h="60px"
                  fontSize="subHead"
                  status={{ isLoading: props.isSubmitting }}
                />
              </Box>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default NewStream;
