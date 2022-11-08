import { ChangeEvent, useRef, useState } from "react";
import { Form, useFormik } from "formik";
import {
  Box,
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

const CreateChannel = () => {
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

  const [state, setState] = useState({
    name: "",
    bioDescription: "",
    subscriptionFee: "",
    subscriptionInfo: "",
  });

  // const handleChange = (
  //   e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  // ) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (values: any, actions: any) => {};

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
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
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={true}>
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
                      />
                      <FormErrorMessage>Email is required. </FormErrorMessage>
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
                      />
                      <FormErrorMessage>Email is required. </FormErrorMessage>
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
                      />
                      <FormErrorMessage>Email is required. </FormErrorMessage>
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
                      />
                      <FormErrorMessage>Email is required. </FormErrorMessage>
                    </Box>
                  </Box>

                  <Box>
                    <Btn
                      text="Create channel"
                      py="6"
                      isLoading={false}
                      type="submit"
                    />
                  </Box>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateChannel;
