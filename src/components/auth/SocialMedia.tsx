import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from 'redux/app/hooks';
import { useLoginMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Button, Image, Text } from '@chakra-ui/react';
import Color from '@constants/color';
import { useGoogleLogin } from '@react-oauth/google';

export const SocialMedia = ({
  haveAccount,
  text,
}: {
  haveAccount: string;
  text: string;
}) => {
  const router = useRouter();
  const [login, loginStatus] = useLoginMutation();
  const dispatch = useAppDispatch();

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

        if (router.asPath === '/signup') {
          const data = {
            firstName: family_name.trim(),
            lastName: given_name.trim(),
            userName: email.split('@')[0].trim(),
            email: email.toLowerCase().trim(),
            photo: picture,
            social: 'GOOGLE',
          };
          localStorage.setItem('userData', JSON.stringify(data));
          router.push(`/ageRange`);
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
            router.push('/home');
          } else {
            toast.error(res.error?.data?.message);
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
      if (router.asPath === '/signup') {
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
          router.push('/home');
        } else {
          toast.error(res.error?.data?.message);
        }
      }
    }
  };

  return (
    <Box marginTop={'2.5rem'}>
      <Text textAlign={'center'}>Or</Text>
      <Box
        marginTop={'2.5rem'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          onClick={() => loginGoogle()}
          width='77px'
          height='77px'
          background='clique.secondaryGrey4'
          boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
          borderRadius='42px'
          display={'flex'}
          justifyContent='center'
          alignItems={'center'}
          cursor='pointer'
          border='none'
          mr='.8rem'
        >
          <Image
            src={`/assets/google.png`}
            alt={`google icon`}
            width={'47px'}
            height={'47px'}
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
              width='77px'
              height='77px'
              background='clique.secondaryGrey4'
              boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
              borderRadius='42px'
              display={'flex'}
              justifyContent='center'
              alignItems={'center'}
              cursor='pointer'
              border='none'
            >
              <Image
                src={`/assets/facebook.png`}
                alt={`facebook icon`}
                width={'47px'}
                height={'47px'}
              />
            </Button>
          )}
        />
      </Box>
      <Box
        fontSize='sm2'
        color='clique.white'
        textAlign={'center'}
        marginTop={'1.7rem'}
      >
        <Text
          display={'inline'}
          marginRight='.25rem'
          color={Color().blackAndWhite}
        >
          {haveAccount}
        </Text>
        <span style={{color: '#892cdc'}}>
          <Link href={text === 'Login here' ? '/login' : '/signup'}>
            {text}
          </Link>
        </span>
      </Box>
    </Box>
  );
};

export default SocialMedia;
