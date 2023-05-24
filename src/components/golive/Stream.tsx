import { Field, Form, Formik } from "formik";
import React from "react";
import { useAppDispatch } from "redux/app/hooks";
import { useCategoryQuery } from "redux/services/category.service";
import {
  useCreateEventMutation,
  useCreateLiveStreamMutation,
  useUpdateEventMutation,
} from "redux/services/livestream/live.service";
import { setStreamDetails } from "redux/slices/streamSlice";
import { streamSchema } from "schemas/livestream.schema";
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

function Stream({
  state,
  setTabIndex,
  streamDetails,
}: {
  state: string;
  setTabIndex: any;
  streamDetails: any;
}) {
  const toast = useToast();
  const { data, isLoading } = useCategoryQuery("");
  const [createEvent, createEventInfo] = useCreateEventMutation();
  const [updateEvent, updateInfo] = useUpdateEventMutation();
  const [createLiveStream, createLiveInfo] = useCreateLiveStreamMutation();
  const dispatch = useAppDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: streamDetails?.eventId?.title || "",
        description: streamDetails?.eventId?.description || "",
        thumbNail: streamDetails?.eventId?.thumbNails[0] || "",
        category: streamDetails?.eventId?.categoryId || "",
        fee: streamDetails?.eventId?.fee || 0,
        ageRange: streamDetails?.eventId?.ageRange || "",
        trailer: streamDetails?.eventId?.trailer || null,
      }}
      validationSchema={streamSchema}
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
        if (values.trailer) {
          formData.append("trailer", values.trailer);
        }

        //check if the stream is being created or updated
        if (streamDetails?.eventId?._id) {
          const res: any = await updateEvent({
            id: streamDetails?.eventId?._id,
            body: formData,
          });
          if (res.data) {
            toast({
              title: "Event Updated",
              description: "Stream Updated Successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });

            dispatch(
              setStreamDetails({
                payload: {
                  ...streamDetails,
                  eventId: res?.data?.data,
                },
              })
            );
          } else {
            toast({
              title: "Event Update Failed",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
        } else {
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
              dispatch(
                setStreamDetails({
                  payload: {
                    ...createLive.data?.data?.livestream,
                    eventId: res.data?.data,
                  },
                })
              );
              setTabIndex(1);
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

              <Box w="100%">
                <DetailCard
                  limit={70}
                  input={true}
                  name="title"
                  label="Live title"
                />
                <DetailCard
                  w="full"
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
                />{" "}
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
                            <Box
                              bgImage={
                                props.values.thumbNail?.name
                                  ? URL.createObjectURL(props.values.thumbNail)
                                  : props.values.thumbNail
                              }
                              rounded="10px"
                              h="250px"
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
              w={{ base: "full", lg: "50%" }}
              px="40px"
              flexDir={"column"}
              justify="space-between"
            >
              {state === "liveevent" ? (
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
                    <DetailCard
                      w="48%"
                      input={true}
                      name="time"
                      label="Time"
                      type="time"
                    />
                    <DetailCard
                      w="48%"
                      input={true}
                      name="date"
                      type="date"
                      label="Date"
                    />
                  </Flex>
                </Box>
              ) : (
                <Box></Box>
              )}
              <Box w="100%" pt="20px">
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

export default Stream;
