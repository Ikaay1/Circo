import {Field, Form, Formik} from 'formik';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/app/hooks';
import {usePostTicketMutation} from 'redux/services/tickets.service';
import {logout} from 'redux/slices/authSlice';
import * as Yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import Lock from '@icons/Lock';

const SignupSchema = Yup.object().shape({
  reason: Yup.string().min(15, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});
const DeleteAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    reason: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const toast = useToast();
  const accessToken = useAppSelector((state) => state.app.userReducer.token);
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [postTicket, postTicketStatus] = usePostTicketMutation();

  useEffect(() => {
    if (!accessToken) {
      router.push(`/login`);
    } else if (accessToken) {
      // check if the token is expired
      const decodedToken: any = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast({
          title: 'Session expired ',
          position: 'top-right',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        dispatch(logout());
        window.location.href = '/login';
      }
    }
  }, []);

  const handlePostTicket = async () => {
    if (values.reason && values.email && values.password) {
      const res: any = await postTicket(values);
      if ('data' in res) {
        onClose();
        toast({
          title: 'Success',
          description: 'Request successfully submitted',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/home');
      } else {
        toast({
          title: 'Error',
          description: res?.error?.data?.message || 'Something went wrong',
          status: 'error',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box px={{base: '1rem', lg: '2rem'}} py='1.5rem'>
      <Link href='/home'>
        <Image
          src='/assets/circo-web.png'
          alt='circo logo'
          width='65px'
          height='53.42px'
          cursor={'pointer'}
        />
      </Link>

      <Box width={{base: '100%', lg: '550px'}} mx='auto' mt='4rem'>
        <Text
          fontFamily='Poppins'
          fontStyle='normal'
          fontWeight='600'
          fontSize='36px'
          lineHeight='44px'
          textAlign='center'
          letterSpacing='-0.02em'
          color='clique.black'
        >
          Delete account
        </Text>

        <Box mt='3rem'>
          <Formik
            initialValues={{
              reason: '',
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
              setValues(values);
              onOpen();
            }}
          >
            {(props) => (
              <Form>
                <Field name={'reason'}>
                  {({field, form: {touched, errors}}: any) => (
                    <FormControl
                      isInvalid={errors[field.name] && touched[field.name]}
                    >
                      <Textarea
                        width={{base: '100%', lg: '550px'}}
                        height={{base: '170px', lg: '204px'}}
                        background='#F1F1F1'
                        borderRadius='15px'
                        placeholder='Reason for deletion'
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='20px'
                        color='clique.secondaryGrey1'
                        _placeholder={{
                          fontFamily: 'Poppins',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          fontSize: '12px',
                          lineHeight: '20px',
                          color: 'clique.secondaryGrey1',
                        }}
                        name={'reason'}
                        {...field}
                      ></Textarea>
                      <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Box mt='1rem'>
                  <Field name={'email'}>
                    {({field, form: {touched, errors}}: any) => (
                      <FormControl
                        isInvalid={errors[field.name] && touched[field.name]}
                      >
                        <Input
                          width={{base: '100%', lg: '550px'}}
                          height={{base: '55px', lg: '80px'}}
                          background='#F1F1F1'
                          borderRadius='15px'
                          placeholder='Email'
                          type={'email'}
                          fontSize='12px'
                          lineHeight='20px'
                          color='clique.secondaryGrey1'
                          _placeholder={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: 'clique.secondaryGrey1',
                          }}
                          name={'email'}
                          {...field}
                        />
                        <FormErrorMessage>
                          {errors[field.name]}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box position='relative' mt='1rem'>
                  <Field name={'password'}>
                    {({field, form: {touched, errors}}: any) => (
                      <FormControl
                        isInvalid={errors[field.name] && touched[field.name]}
                      >
                        <Input
                          width={{base: '100%', lg: '550px'}}
                          height={{base: '55px', lg: '80px'}}
                          background='#F1F1F1'
                          borderRadius='15px'
                          placeholder='Password'
                          type={showPassword ? 'text' : 'password'}
                          fontSize='12px'
                          lineHeight='20px'
                          color='clique.secondaryGrey1'
                          _placeholder={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: 'clique.secondaryGrey1',
                          }}
                          name={'password'}
                          {...field}
                        />
                        <Icon
                          position='absolute'
                          cursor='pointer'
                          as={Lock}
                          width='20.83px'
                          height='20.83px'
                          right={'4.5%'}
                          top='33%'
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                        <FormErrorMessage>
                          {errors[field.name]}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Text
                  mt='3rem'
                  fontFamily='Poppins'
                  fontStyle='normal'
                  lineHeight='20px'
                  textAlign='center'
                  color='clique.secondaryGrey1'
                >
                  The Circo team will email you to confirm that you want to
                  delete your account
                </Text>
                <Button
                  width={{base: '100%', lg: '550px'}}
                  height={{base: '55px', lg: '80px'}}
                  background='clique.dangerRed'
                  borderRadius='50px'
                  mt='.7rem'
                  type={'submit'}
                >
                  Request Deletion
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Sure
        isOpen={isOpen}
        onClose={onClose}
        buttonText='Request for deletion'
        header='Delete Account'
        description='Are you sure you want to request for your account to be deleted?'
        onClick={handlePostTicket}
        isLoading={postTicketStatus.isLoading}
      />
    </Box>
  );
};

export default DeleteAccount;
export {getServerSideProps} from '../components/widgets/Chakara';
