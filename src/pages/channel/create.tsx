import { Box, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import Uploaders from "@components/createChannel/Uploaders";
import SideMenu from "@components/settings/SideMenu";
import Header from "@components/widgets/Header";
import { createChannelMenu, scrollBarStyle } from "@constants/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import { useCreateChannelMutation } from "redux/services/channel.service";
import { createChannelSchema } from "schemas/channel.schema";
import CustumField from "@components/createChannel/CustumField";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
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

  const onSubmit = async (
    values: CreateChannel,
    { setSubmitting }: FormikHelpers<CreateChannel>
  ) => {
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
      setSubmitting(false);
    } else if (res.error) {
      //@ts-ignore
      toast.error(res?.error?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  };

  const initialValues = {
    name: "",
    bioDescription: "",
    subscriptionFee: "",
    subscriptionInfo: "",
  };

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
            <Uploaders
              coverRef={coverRef}
              handleChooseCover={handleChooseCover}
              handleChooseProfile={handleChooseProfile}
              handleFileChange={handleFileChange}
              profileRef={profileRef}
              state={imageState}
            />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={createChannelSchema}
            >
              {(props) => (
                <Form>
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

                      <CustumField
                        name="Bio Description"
                        nameValue="bioDescription"
                        textArea={true}
                      />
                      <CustumField
                        name="Channel Name"
                        nameValue="name"
                        textArea={false}
                      />
                      <CustumField
                        name="Subscription Information"
                        nameValue="subscriptionInfo"
                        textArea={true}
                      />
                      <CustumField
                        name="Subscription Fee"
                        nameValue="subscriptionFee"
                        textArea={false}
                      />
                    </Box>

                    <Box>
                      <Btn
                        submit={true}
                        text="Create channel"
                        isLoading={props.isSubmitting}
                      ></Btn>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateChannel;
