import {
  Box,
  Divider,
  Flex,
  FormErrorMessage,
  Grid,
  GridItem,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import Btn from "@components/Button/Btn";
import { videoDetails } from "@constants/utils";
import AddIcon from "@icons/AddIcon";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import DetailCard from "./DetailCard";
import SelectField from "./SelectField";

function Stream({ state }: { state: string }) {
  return (
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
            <Box w="50%">
              <Text fontSize="smSubHead" color="clique.text">
                Live details
              </Text>

              <Box>
                <DetailCard input={true} name="title" label="Live title" />
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
                <Text fontSize="xsl" color="clique.secondaryGrey2" mb="2">
                  Select or upload a picture that shows what is your video
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
                        <Text fontSize="smSubHead">Upload Thumbnail</Text>
                      </Flex>
                    </Flex>
                  )}
                </label>
                <FormErrorMessage>{props.errors.thumbNail}</FormErrorMessage>
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
                  >
                    <option>lsd;lfksdmlf</option>
                  </SelectField>
                </GridItem>
                <GridItem colSpan={2}>
                  <SelectField name="ageRange" placeholder="Age Range">
                    <option value={"1"}>lsd;lfksdmlf</option>
                  </SelectField>
                </GridItem>
              </Grid>
            </Box>

            <Flex w="50%" px="40px" flexDir={"column"} justify="space-between">
              {state === "liveevent" ? (
                <Box>
                  <Text fontSize="smSubHead" color="clique.text">
                    Live fee per ticket
                  </Text>
                  <DetailCard
                    input={true}
                    name="fee"
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
              <Box w="50%">
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
