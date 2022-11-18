import { ChangeEvent, useRef, useState } from "react";

import {
  Box,
  Flex, useToast,
  VStack
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import Uploaders from "@components/channel/Uploaders";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { useUpdateProfileMutation } from "redux/services/user.service";
import { setChannel } from "redux/slices/channelSlice";
import { editProfileSchema } from "schemas/editProfile.schema";
import CustumField from "./CustumField";

interface UpdateProfile {
  firstName: string;
  lastName: string;
  dob: string;
  password: string;
  email: string;
  photo?: string;
  cover?: string;
  username: string;
}

// export type UpdateChannelInterface =
//   | { data: UpdateChannel }
//   | { error: SerializedError };

const EditProfile = () => {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateProfile, status] = useUpdateProfileMutation();
  const coverRef = useRef<HTMLInputElement | any>();
  const profileRef = useRef<HTMLInputElement | any>();
  const [imageState, setimageState] = useState({
    cover: userProfile?.cover ? userProfile.cover : "",
    profile: userProfile?.photo ? userProfile.photo : "",
  });
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

  const onSubmit = async (
    values: UpdateProfile,
    { setSubmitting }: FormikHelpers<UpdateProfile>
  ) => {
    const myFormData = new FormData();
    myFormData.append("firstName", values.firstName);
    myFormData.append("lastName", values.lastName);
    myFormData.append("email", values.email);
    myFormData.append("password", values.password);
    myFormData.append("userName", values.username);
    myFormData.append("dateOfBirth", values.dob);
    coverRef.current.files[0] &&
      myFormData.append("cover", coverRef.current.files[0]);
    profileRef.current.files[0] &&
      myFormData.append("photo", profileRef.current.files[0]);
    const res: any = await updateProfile(myFormData);
    if ("data" in res) {
      dispatch(setChannel(res.data));
      toast({
        title: "Profile successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setSubmitting(false);
    } else if (res.error) {
      console.log(res.error);
      toast({
        title: res.error.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const initialValues = {
    firstName: userProfile.firstName ? userProfile.firstName : "",
    lastName: userProfile.lastName ? userProfile.lastName : "",
    email: userProfile.email ? userProfile.email : "",
    username: userProfile.userName ? userProfile.userName : "",
    password: userProfile.password ? userProfile.password : "",
    dob: userProfile.dateOfBirth ? userProfile.dateOfBirth : "",
  };

  return (
    <>
      <Box>
        <Uploaders
          coverRef={coverRef}
          handleChooseCover={handleChooseCover}
          handleChooseProfile={handleChooseProfile}
          handleFileChange={handleFileChange}
          profileRef={profileRef}
          state={imageState}
        />
      </Box>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={editProfileSchema}
      >
        {(props) => (
          <Form>
            <Flex justifyContent={"end"} mt="5">
              <Btn
                submit={true}
                text="Save Changes"
                isLoading={props.isSubmitting}
              ></Btn>
            </Flex>
            <VStack mt="100px" justify={"center"} alignSelf="center">
              <CustumField
                name="First name"
                sideContent="Edit"
                nameValue="firstName"
              />
              <CustumField
                name="Last name"
                sideContent="Edit"
                nameValue="lastName"
              />
              <CustumField
                name="Username"
                sideContent="(Username can only be changed 2 times a year)"
                nameValue="username"
              />
              <CustumField name="Email" sideContent="Edit" nameValue="email" />
              <CustumField
                name="Password"
                sideContent="Edit"
                nameValue="password"
              />
              <CustumField
                name="Date of Birth"
                sideContent="Edit"
                nameValue="dob"
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
