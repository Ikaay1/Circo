import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Uploaders from "@components/createChannel/Uploaders";
import SideMenu from "@components/settings/SideMenu";
import Header from "@components/widgets/Header";
import Btn from "@components/Button/Btn";
import { createChannelMenu, scrollBarStyle } from "@constants/utils";
import { useCreateChannelMutation } from "redux/services/channel.service";
import { createChannelSchema } from "schemas/channel.schema";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/app/hooks";
import { setChannel } from "redux/slices/channelSlice";

interface CreateChannel {
  name: string;
  bioDescription: string;
  subscriptionFee: string;
  subscriptionInfo: string;
}

export type CreateChannelInterFace =
  | { data: CreateChannel }
  | { error: FetchBaseQueryError | SerializedError };

const CreateChannel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createChannel, status] = useCreateChannelMutation();
  const coverRef = useRef<HTMLInputElement | any>();
  const profileRef = useRef<HTMLInputElement | any>();
  const [imageState, setimageState] = useState({ cover: "", profile: "" });
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    cover: boolean
  ) => {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    if (cover) {
      setimageState({ ...imageState, cover: url });
    } else {
      setimageState({ ...imageState, profile: url });
    }
  };

  const handleChooseCover = () => {
    coverRef.current.click();
  };
  const handleChooseProfile = () => {
    profileRef.current.click();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (values: CreateChannel, actions: any) => {
    const myFormData = new FormData();
    myFormData.append("name", values.name);
    myFormData.append("bio", values.bioDescription);
    myFormData.append("subscriptionInfo", values.subscriptionInfo);
    myFormData.append("subscriptionFee", values.subscriptionFee);
    coverRef.current.files[0] &&
      myFormData.append("cover", coverRef.current.files[0]);
    profileRef.current.files[0] &&
      myFormData.append("photo", profileRef.current.files[0]);
    const res: CreateChannelInterFace = await createChannel(myFormData);
    if ("data" in res) {
      dispatch(setChannel(res.data));
      router.push("/channel/1/content");
    } else if (res.error) {
      //@ts-ignore
      toast.error(res?.error?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    isValidating,
    validateField,
  } = useFormik({
    initialValues: {
      name: "",
      bioDescription: "",
      subscriptionFee: "",
      subscriptionInfo: "",
    },
    validationSchema: createChannelSchema,
    onSubmit,
  });

  return (
    <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
      <Header upload={onOpen} />
      <Box h={{ lg: "90vh" }} display="flex">
        <Box flex="1.3" h="100%">
          <SideMenu menuList={createChannelMenu} create={true} />
        </Box>
        <Box flex="5.5" h="100%">
          <Box
            height={"100%"}
            overflowY="scroll"
            position={"relative"}
            sx={scrollBarStyle}
          >
            <FormControl isInvalid={!isValid}>
              <Uploaders
                coverRef={coverRef}
                handleChooseCover={handleChooseCover}
                handleChooseProfile={handleChooseProfile}
                handleFileChange={handleFileChange}
                profileRef={profileRef}
                state={imageState}
              />
              <Box
                display="flex"
                justifyContent={"space-between"}
                mt="6"
                pl="8"
                pr="11"
              >
                <Box w="55%" h="" pb="20">
                  <Text
                    fontWeight="600"
                    fontSize="subHead"
                    lineHeight="24px"
                    color="clique.secondaryGrey2"
                  >
                    Bio
                  </Text>

                  <Box
                    bg="clique.secondaryGrey1"
                    px="2"
                    py="3"
                    mb="10"
                    borderRadius={"10px"}
                    w="70%"
                  >
                    <Text
                      fontSize={"smSubHead"}
                      fontWeight="400"
                      mb="1"
                      color={"clique.secondaryGrey2"}
                    >
                      Bio Description
                    </Text>
                    <Textarea
                      variant="filled"
                      value={values.bioDescription}
                      bg="clique.secondaryGrey1"
                      name="bioDescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>
                        {errors.bioDescription}
                      </FormErrorMessage>
                  </Box>

                  <Box
                    bg="clique.secondaryGrey1"
                    px="2"
                    py="3"
                    mb="10"
                    maxW={"100%"}
                    borderRadius={"10px"}
                  >
                    <Text
                      fontSize={"smSubHead"}
                      fontWeight="400"
                      mb="1"
                      color={"clique.secondaryGrey2"}
                    >
                      Channel Name
                    </Text>
                    <Input
                      variant="filled"
                      value={values.name}
                      bg="clique.secondaryGrey1"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.name} </FormErrorMessage>
                  </Box>

                  <Box
                    bg="clique.secondaryGrey1"
                    px="2"
                    py="3"
                    mb="10"
                    borderRadius={"10px"}
                  >
                    <Text
                      fontSize={"smSubHead"}
                      fontWeight="400"
                      mb="1"
                      color={"clique.secondaryGrey2"}
                    >
                      Subscription Information
                    </Text>
                    <Textarea
                      variant="filled"
                      value={values.subscriptionInfo}
                      bg="clique.secondaryGrey1"
                      name="subscriptionInfo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>
                      {errors.subscriptionInfo}{" "}
                    </FormErrorMessage>
                  </Box>

                  <Box
                    bg="clique.secondaryGrey1"
                    px="2"
                    py="3"
                    mb="10"
                    borderRadius={"10px"}
                  >
                    <Text
                      fontSize={"smSubHead"}
                      fontWeight="400"
                      mb="1"
                      color={"clique.secondaryGrey2"}
                    >
                      Subscription Fee
                    </Text>
                    <Input
                      variant="filled"
                      value={values.subscriptionFee}
                      bg="clique.secondaryGrey1"
                      name="subscriptionFee"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>
                      {errors.subscriptionFee}
                    </FormErrorMessage>
                  </Box>
                </Box>

                <Box>
                  <Btn
                    submit={true}
                    text="Create channel"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                  ></Btn>
                </Box>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateChannel;
