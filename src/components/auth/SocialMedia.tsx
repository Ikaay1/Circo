import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {useAppDispatch} from 'redux/app/hooks';
import {
  useLoginMutation,
  useSocialPreSignupMutation,
} from 'redux/services/auth.service';
import {setCredentials} from 'redux/slices/authSlice';

import {Box, Button, Image, Text, useToast} from '@chakra-ui/react';
import Color from '@constants/color';
import {useGoogleLogin} from '@react-oauth/google';

export const SocialMedia = ({
  haveAccount,
  text,
}: {
  haveAccount: string;
  text: string;
}) => {
  const router = useRouter();
  const [login, loginStatus] = useLoginMutation();
  const [socialPreSignup, socialPreSignupStatus] = useSocialPreSignupMutation();
  const dispatch = useAppDispatch();
  const {next}: any = router.query;
  const toast = useToast();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('entered login');
      let userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse?.access_token}`,
          },
        },
      );
      console.log(userInfo);
      if (userInfo?.data?.email) {
        const {family_name, given_name, picture, email} = userInfo.data;
        console.log('userInfo', userInfo);
        if (router.asPath === '/signup') {
          const res: any = await socialPreSignup({email});
          if ('data' in res) {
            const data = {
              firstName: family_name ? family_name.trim() : given_name.trim(),
              lastName: given_name.trim(),
              userName: email.split('@')[0].trim(),
              email: email.toLowerCase().trim(),
              photo: picture,
              social: 'GOOGLE',
            };
            localStorage.setItem('userData', JSON.stringify(data));
            router.push(`/ageRange`);
          } else {
            toast({
              title: 'Error',
              description: res.error?.data?.message || 'Something went wrong',
              status: 'error',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
          }
        } else {
          const userData = {
            userNameOrEmail: email,
          };
          const res: any = await login(userData);

          if ('data' in res) {
            dispatch(
              setCredentials({
                payload: res.data,
              }),
            );
            next ? router.push(next) : router.push('/home');
          } else {
            toast({
              title: 'Error',
              description: res.error?.data?.message || 'Something went wrong',
              status: 'error',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
          }
        }
      }
    },
    onError(errorResponse) {
      console.log(errorResponse);
    },
  });

  const responseFacebook = async (response: any) => {
    console.log(response);
    if (response?.accessToken) {
      const {name, picture, email} = response;
      if (router.asPath.includes('/signup')) {
        if (email) {
          const res: any = await socialPreSignup({email});
          if ('data' in res) {
            const data = {
              firstName: name.split(' ')[0].trim(),
              lastName: name.split(' ')[1].trim(),
              userName: email.split('@')[0].trim(),
              email: email.toLowerCase().trim(),
              photo: picture?.data?.url,
              social: 'FACEBOOK',
            };
            localStorage.setItem('userData', JSON.stringify(data));
            router.push(`/ageRange`);
          } else {
            toast({
              title: 'Error',
              description: res.error?.data?.message || 'Something went wrong',
              status: 'error',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Error',
            description:
              'No email registered to this facebook account. Please use a facebook account that has an email registered to it to signup',
            status: 'error',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
          });
        }
      } else {
        if (email) {
          const userData = {
            userNameOrEmail: email,
          };
          const res: any = await login(userData);
          if ('data' in res) {
            dispatch(
              setCredentials({
                payload: res.data,
              }),
            );
            next ? router.push(next) : router.push('/home');
          } else {
            toast({
              title: 'Error',
              description: res.error?.data?.message || 'Something went wrong',
              status: 'error',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Error',
            description:
              'No email registered to this facebook account. Please use a facebook account that has an email registered to it and one you have signed up with to login',
            status: 'error',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Box marginTop={'20px'}>
      <Text textAlign={'center'}>Or</Text>
      <Box
        marginTop={'20px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          onClick={() => loginGoogle()}
          width='60px'
          height='60px'
          background='clique.secondaryGrey4'
          boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
          borderRadius='42px'
          display={'flex'}
          justifyContent='center'
          alignItems={'center'}
          cursor='pointer'
          border='none'
          mr='30px'
          p='0'
        >
          <Image
            src={`/assets/google.png`}
            alt={`google icon`}
            width={'27px'}
            height={'27px'}
          />
        </Button>
        <FacebookLogin
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APPID!}
          autoLoad={false}
          fields='name,email,picture'
          scope='public_profile,email,user_friends'
          callback={(response) => responseFacebook(response)}
          icon='fa-facebook'
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              width='60px'
              height='60px'
              background='clique.secondaryGrey4'
              boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
              borderRadius='42px'
              display={'flex'}
              justifyContent='center'
              alignItems={'center'}
              cursor='pointer'
              border='none'
              p='0'
            >
              <Image
                src={`/assets/facebook.png`}
                alt={`facebook icon`}
                width={'37px'}
                height={'37px'}
              />
            </Button>
          )}
        />
      </Box>
      <Box
        fontSize='subHead'
        fontWeight={500}
        color='clique.white'
        textAlign={'center'}
        marginTop={'1.7rem'}
      >
        <Text
          display={'inline'}
          marginRight='.25rem'
          color={Color().blackAndWhite2}
        >
          {haveAccount}
        </Text>
        <a>
          <Box
            as='span'
            color='clique.purple'
            onClick={
              router.asPath.includes('/signup')
                ? () => window.location.replace('/login')
                : () => window.location.replace('/signup')
            }
            cursor='pointer'
          >
            {text}
          </Box>
        </a>
      </Box>
    </Box>
  );
};

export default SocialMedia;
