import {Form, Formik, FormikHelpers} from 'formik';
import {useRouter} from 'next/router';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/app/hooks';
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from 'redux/services/user.service';
import {setPhoto, setUser} from 'redux/slices/authSlice';
import {changePasswordSchema} from 'schemas/changePassword.schema';
import {editProfileSchema} from 'schemas/editProfile.schema';

import {Box, Flex, Text, useToast, VStack} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import Uploaders from '@components/channel/Uploaders';

import CustumField from './CustumField';

interface UpdateProfile {
  firstName: string;
  lastName: string;
  // dob: string;
  // email: string;
  photo?: string;
  cover?: string;
  username: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

// export type UpdateChannelInterface =
//   | { data: UpdateChannel }
//   | { error: SerializedError };

const EditProfile = () => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const coverRef = useRef<HTMLInputElement | any>();
  const profileRef = useRef<HTMLInputElement | any>();
  const [imageState, setimageState] = useState({
    cover: userProfile?.cover ? userProfile?.cover : '',
    profile: userProfile?.photo ? userProfile?.photo : '',
  });

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    cover: boolean,
  ) => {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    const url = URL?.createObjectURL(image);
    if (cover) {
      setimageState({...imageState, cover: url});
    } else {
      setimageState({...imageState, profile: url});
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
    {setSubmitting}: FormikHelpers<UpdateProfile>,
  ) => {
    console.log('entered for submit');
    const myFormData = new FormData();
    myFormData.append('firstName', values.firstName);
    myFormData.append('lastName', values.lastName);
    // myFormData.append("email", values.email);
    userProfile?.userNameChange < 2 &&
      userProfile?.userName !== values.username &&
      myFormData.append('userName', values.username);
    // myFormData.append("dateOfBirth", values.dob);
    coverRef.current.files[0] &&
      myFormData.append('cover', coverRef.current.files[0]);
    profileRef.current.files[0] &&
      myFormData.append('photo', profileRef.current.files[0]);
    const res: any = await updateProfile(myFormData);

    if ('data' in res) {
      dispatch(
        setUser({
          payload: res?.data?.data?.user,
        }),
      );
      dispatch(
        setPhoto({
          payload: res?.data?.data?.user,
        }),
      );

      console.log(res?.data?.data?.user),
        toast({
          title: 'Profile successfully updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      setSubmitting(false);
      // router.push("/profile/content");
    } else if (res.error) {
      toast({
        title: res.error.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const submitPassword = async (
    values: ChangePassword,
    {setSubmitting, resetForm}: FormikHelpers<ChangePassword>,
  ) => {
    const res: any = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    if ('data' in res) {
      dispatch(
        setUser({
          payload: res?.data?.data,
        }),
      );
      toast({
        title: 'Successfully changed password',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setSubmitting(false);
      resetForm();
    } else if (res.error) {
      toast({
        title: res.error.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const initialValues = {
    firstName: userProfile?.firstName ? userProfile?.firstName : '',
    lastName: userProfile?.lastName ? userProfile?.lastName : '',
    // email: userProfile?.email ? userProfile?.email : "",
    username: userProfile?.userName ? userProfile?.userName : '',
    // dob: user?.dateOfBirth ? user?.dateOfBirth : "",
  };
  const passWordInitialValues = {
    passwordConfirmation: '',
    newPassword: '',
    oldPassword: '',
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
        // validationSchema={editProfileSchema}
      >
        {(props) => (
          <Form>
            <Flex justifyContent={'end'} mt={{base: '7rem', lg: '5'}} mr='5'>
              <Btn
                submit={true}
                text='Save Changes'
                isLoading={props.isSubmitting}
              ></Btn>
            </Flex>
            <VStack
              mt={{base: '50px', lg: '100px'}}
              justify={'center'}
              alignSelf='center'
              paddingX='1rem'
            >
              <CustumField
                name='First name'
                // sideContent='Edit'
                nameValue='firstName'
              />
              <CustumField
                name='Last name'
                // sideContent='Edit'
                nameValue='lastName'
              />
              <CustumField
                name='Username'
                sideContent='(Username can only be changed 2 times a year)'
                nameValue='username'
                userNameChange={userProfile?.userNameChange >= 2 ? true : false}
              />
              {/* <CustumField name="Email" sideContent="Edit" nameValue="email" /> */}

              {/* <CustumField
                name="Date of Birth"
                sideContent="Edit"
                nameValue="dob"
              /> */}
            </VStack>
          </Form>
        )}
      </Formik>

      {userProfile?.social === 'NULL' && (
        <Formik
          initialValues={passWordInitialValues}
          onSubmit={submitPassword}
          validationSchema={changePasswordSchema}
        >
          {(props) => (
            <Form>
              <VStack
                mt={{base: '70px', lg: '100px'}}
                justifyContent={{lg: 'center'}}
                alignItems={{base: 'start', lg: 'center'}}
                paddingX='1rem'
              >
                <Box pr={{lg: '35%'}}>
                  <Text>Change Password</Text>
                </Box>
                <VStack
                  mt='100px'
                  justifyContent={{lg: 'center'}}
                  alignSelf={{lg: 'center'}}
                  mb='12'
                  w={{base: '100%'}}
                >
                  <CustumField
                    name='Old Password'
                    nameValue='oldPassword'
                    type='password'
                  />
                  <CustumField
                    name='New Passowrd'
                    nameValue='newPassword'
                    type='password'
                  />
                  <CustumField
                    name='Confirm New Password'
                    nameValue='passwordConfirmation'
                    type='password'
                  />
                </VStack>

                <Box pr={{lg: '27%'}} mx={{lg: 'auto'}} pt='5%'>
                  <Btn
                    submit={true}
                    text='Change password'
                    isLoading={props.isSubmitting}
                    px='12'
                    py='6'
                  ></Btn>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditProfile;
