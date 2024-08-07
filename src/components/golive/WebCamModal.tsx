import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "redux/app/hooks";
import { useCategoryQuery } from "redux/services/category.service";
import {
  useCreateEventMutation,
  useCreateLiveStreamMutation,
  useCreateSpaceMutation,
} from "redux/services/livestream/live.service";
import { setWebCamStream } from "redux/slices/streamSlice";
import * as Yup from "yup";

import {
  Box,
  Button,
  Flex,
  FormControl,
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
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import Color from "@constants/color";
import { CategoriesInterface } from "@constants/interface";
import { scrollBarStyle } from "@constants/utils";
import AddIcon from "@icons/AddIcon";
import WebCamIcon from "@icons/WebCamIcon";

import DetailCard from "./DetailCard";
import SelectField from "./SelectField";
import PreviewIcon from "@icons/PreviewIcon";

function WebCamModal({ setState }: { setState: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data, isLoading } = useCategoryQuery("");
  const [createEvent, createEventInfo] = useCreateEventMutation();
  const [createLiveStream, createLiveInfo] = useCreateLiveStreamMutation();
  const [createSpace, createSpaceInfo] = useCreateSpaceMutation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const router = useRouter();

  useEffect(() => {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = "" + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "OPR" or after "Version"
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MS Edge, the true version is after "Edg" in userAgent
    else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
      browserName = "Microsoft Edge";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    if (browserName !== "Firefox" && browserName !== "Chrome") {
      setDisabled(true);
    } else {
      if (browserName === "Firefox") {
        if (majorVersion < 53) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      } else if (browserName === "Chrome") {
        if (majorVersion < 60) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      } else {
        setDisabled(true);
      }
    }
  }, []);

  return (
    <>
      <Flex
        display={{ base: "none", lg: "none" }}
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
          color={isOpen ? "clique.base" : Color().blackAndWhite}
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

      <Button
        display={{ base: "none", lg: "none" }}
        size={"sm"}
        onClick={() => {
          onOpen();
        }}
        color={isOpen ? "clique.base" : Color().blackAndWhite}
      >
        Webcam
      </Button>

      <Modal size={"3xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay /> <ModalOverlay />
        <ModalContent
          m={0}
          mx={{ base: "20px", lg: "0" }}
          bg={Color().whiteAndBlack}
          maxH={"90vh"}
          borderColor={Color().whiteAndBlack}
          borderRadius="xl"
          px={{ base: "0", md: "60px" }}
          py="30px"
          overflowY={"scroll"}
          sx={scrollBarStyle}
        >
          <ModalBody>
            <Formik
              initialValues={{
                title: "",
                description: "",
                thumbNail: "" as any,
                trailer: null as any,
                category: "",
                fee: 0,
                ageRange: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Title is Required"),
                description: Yup.string().required("Description is Required"),
                thumbNail: Yup.mixed().required("ThumbNail is Required"),
                ageRange: Yup.string().required("Age Range Required"),
                category: Yup.string().required("Category is Required"),
                fee: Yup.number().required("Fee Required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                const data = {
                  title: values.title,
                  description: values.description,
                  ageRange: values.ageRange,
                  paidToWatch: values.fee > 0 ? true : false,
                  category: "LIVE",
                  categoryId: values.category,
                };

                const formData = new FormData();
                formData.append("thumbNail", values.thumbNail);
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("ageRange", values.ageRange);
                formData.append(
                  "paidToWatch",
                  values.fee > 0 ? "true" : "false"
                );
                formData.append("category", "LIVE");
                formData.append("categoryId", values.category);
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

                    // const createSpaceRes: any = await createSpace({
                    //   muxStreamId:
                    //     createLive.data?.data?.livestream?.muxStreamId,
                    // });
                    // if (!createSpaceRes?.data?.data) {
                    //   toast({
                    //     title: "Space Creation Failed",
                    //     status: "error",
                    //     duration: 3000,
                    //     isClosable: true,
                    //     position: "top-right",
                    //   });
                    //   setLoading(false);
                    //   return;
                    // }

                    dispatch(
                      setWebCamStream({
                        payload: {
                          ...createLive?.data?.data?.livestream,
                          // ...createSpaceRes?.data?.data,
                        },
                      })
                    );
                    // router.push(
                    //   `/stream/webcam/${res.data?.data?._id}/?streamKey=${createLive.data?.data?.livestream?.streamKey}&spaceId=${createSpaceRes?.data?.data?.space?.id}&token=${createSpaceRes.data?.data?.token}&muxStreamId=${createLive.data?.data?.livestream?.muxStreamId}&broadcastId=${createSpaceRes?.data?.data?.broadcast?.id}&title=${values.title}`
                    // );
                    router.push(
                      `/stream/webcam/${res.data?.data?._id}/?streamKey=${createLive.data?.data?.livestream?.streamKey}&muxStreamId=${createLive.data?.data?.livestream?.muxStreamId}&title=${values.title}`
                    );
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
                setLoading(false);
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
                          visibility={"hidden"}
                          onChange={(e: any) => {
                            props.setFieldValue("thumbNail", e.target.files[0]);
                          }}
                          id={"thumbNail"}
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
                        <Text fontSize="smSubHead">Thumbnail</Text>
                        <Text
                          fontSize="xsl"
                          color="clique.secondaryGrey2"
                          mb="2"
                        >
                          Select or upload a picture that shows what is your
                          video
                        </Text>
                        <Field>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.thumbNail && form.touched.thumbNail
                              }
                            >
                              <label htmlFor={"thumbNail"}>
                                {props.values.thumbNail ? (
                                  <Box mt="7" mb="4">
                                    <Box
                                      bgImage={
                                        "url(" +
                                        URL.createObjectURL(
                                          props.values.thumbNail
                                        ) +
                                        ")"
                                      }
                                      rounded="10px"
                                      h="250px"
                                      w="250px"
                                      bgRepeat={"no-repeat"}
                                      bgSize={"cover"}
                                      bgPosition={"center"}
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
                                      <Text fontSize="smSubHead">
                                        Upload Thumbnail
                                      </Text>
                                    </Flex>
                                  </Flex>
                                )}
                              </label>
                              <FormErrorMessage>
                                {form.errors.thumbNail}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>{" "}
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
                            {data &&
                              data?.data?.map(
                                (
                                  category: CategoriesInterface,
                                  index: number
                                ) => (
                                  <option key={index} value={category._id}>
                                    {category.name}
                                  </option>
                                )
                              )}
                          </SelectField>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <SelectField name="ageRange" placeholder="Age Range">
                            <option value={"18 and above"}>18 and above</option>
                            <option value={"Below 18"}>Below 18</option>{" "}
                            <option value={"ALL"}>All</option>{" "}
                          </SelectField>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <AuthButton
                            w="50%"
                            mx="auto"
                            name={"Go Live"}
                            h="60px"
                            fontSize="subHead"
                            status={{ isLoading: loading }}
                            disabled={disabled}
                          />
                          {disabled && (
                            <Text
                              fontSize={"smSubHead"}
                              color="clique.base"
                              textAlign={"center"}
                              mt=".4rem"
                            >
                              Your browser does not support webcam livestream
                            </Text>
                          )}
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
