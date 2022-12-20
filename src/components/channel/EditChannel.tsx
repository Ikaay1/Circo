import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from 'redux/app/hooks';
import { useCreatorsCategoryQuery } from 'redux/services/category.service';
import { useUpdateChannelMutation } from 'redux/services/channel.service';
import { updateChannelSchema } from 'schemas/channel.schema';

import {
	Box,
	FormControl,
	Select,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import CustumField from '@components/channel/CustumField';
import Uploaders from '@components/channel/Uploaders';
import { CategoriesInterface } from '@constants/interface';
import { SerializedError } from '@reduxjs/toolkit';

// import { setChannel } from "redux/slices/channelSlice";
import { Channel } from './UserDetail';

interface UpdateChannel {
  name: string;
  bioDescription: string;
  subscriptionFee: string;
  subscriptionInfo: string;
  category: string;
  photo?: string;
  cover?: string;
}

export type UpdateChannelInterface =
  | {data: UpdateChannel}
  | {error: SerializedError};

const EditChannel = ({data}: {data?: Channel}) => {
  console.log('data', data);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateChannel, status] = useUpdateChannelMutation();
  const coverRef = useRef<HTMLInputElement | any>();
  const profileRef = useRef<HTMLInputElement | any>();
  const {data: categoryData, isLoading} = useCreatorsCategoryQuery('');
  const [imageState, setimageState] = useState({
    cover: data?.cover ? data.cover : '',
    profile: data?.photo ? data.photo : '',
  });
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    cover: boolean,
  ) => {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
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
  const {isOpen, onOpen, onClose} = useDisclosure();

  const onSubmit = async (
    values: UpdateChannel,
    {setSubmitting}: FormikHelpers<UpdateChannel>,
  ) => {
    console.log(values);
    const myFormData = new FormData();
    myFormData.append('name', values.name);
    myFormData.append('bio', values.bioDescription);
    myFormData.append('subscriptionInfo', values.subscriptionInfo);
    myFormData.append('subscriptionFee', values.subscriptionFee);
    myFormData.append('category', values.category);
    coverRef.current.files[0] &&
      myFormData.append('cover', coverRef.current.files[0]);
    profileRef.current.files[0] &&
      myFormData.append('photo', profileRef.current.files[0]);
    const res: any = await updateChannel(myFormData);
    if ('data' in res) {
      toast({
        title: 'Channel successfully updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setSubmitting(false);
    } else if (res.error) {
      toast({
        title: res.error?.data?.message,
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
    name: data?.name ? data.name : '',
    bioDescription: data?.bio ? data?.bio : '',
    category: data?.category?._id ? data?.category?._id : '',
    subscriptionFee: data?.subscriptionFee ? String(data?.subscriptionFee) : '',
    subscriptionInfo: data?.subscriptionInfo ? data?.subscriptionInfo : '',
  };

  return (
    <>
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
        validationSchema={updateChannelSchema}
      >
        {(props) => (
          <Form>
            <Box
              display='flex'
              justifyContent={'space-between'}
              mt='6'
              pl='8'
              pr='11'
            >
              <Box w='55%' h='' pb='20'>
                <Text
                  fontWeight='600'
                  fontSize='subHead'
                  lineHeight='24px'
                  color='clique.secondaryGrey2'
                >
                  Bio
                </Text>

                <Box mb='3rem'>
                  <CustumField
                    name='Bio Description'
                    nameValue='bioDescription'
                    textArea={true}
                    variant='small'
                  />
                </Box>

                <CustumField
                  name='Channel Name'
                  nameValue='name'
                  textArea={false}
                />

                <Field as='select' name={'category'}>
                  {({field, form: {touched, errors}}: any) => (
                    <FormControl
                      isInvalid={errors[field.name] && touched[field.name]}
                    >
                      <Select
                        placeholder={'Category'}
                        bg='clique.secondaryGrey1'
                        borderColor='clique.secondaryGrey1'
                        size='md'
                        height={'40px'}
                        mb='5'
                        name={'category'}
                        required={true}
                        {...field}
                      >
                        {categoryData?.data.map(
                          (category: CategoriesInterface) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ),
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <CustumField
                  name='Subscription Information'
                  nameValue='subscriptionInfo'
                  textArea={true}
                />
                <CustumField
                  name='Subscription Fee'
                  nameValue='subscriptionFee'
                  textArea={false}
                />
              </Box>

              <Box>
                <Btn
                  submit={true}
                  text='Save Changes'
                  isLoading={props.isSubmitting}
                ></Btn>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditChannel;
