import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import GoogleLogin, {
// 	GoogleLoginResponse,
// 	GoogleLoginResponseOffline,
// } from 'react-google-login';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from 'redux/app/hooks';
import { useLoginMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Button, Image, Text } from '@chakra-ui/react';
import Color from '@constants/color';
import { getDecodedOAuthJwtGoogle } from '@constants/googleDecode';
import { socialMediaIconsData } from '@constants/utils';
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

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

  // const responseGoogle = async (response: any) => {
  //   if (response?.profileObj) {

  //   }
  // };

  // const responseError = (error: any) => {
  //   console.log(error);
  //   // toast.error(error?.error);
  // };

  const loginGoogle = async (credentialResponse: CredentialResponse) => {
    const realUserData: any = jwt_decode(credentialResponse?.credential!);
    console.log(realUserData);
    if (realUserData?.email) {
      const {family_name, given_name, picture, email} = realUserData;
      const data = {
        firstName: family_name.trim(),
        lastName: given_name.trim(),
        userName: email.split('@')[0].trim(),
        email: email.toLowerCase().trim(),
        photo: picture,
        social: 'GOOGLE',
      };
      localStorage.setItem('userData', JSON.stringify(data));
      if (router.asPath === '/signup') {
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

  // useEffect(() => {
  //   const gapi = import('gapi-script').then((pack) => pack.gapi);
  //   async function start() {
  //     const d = await gapi;
  //     d.client.init({
  //       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //       scope: 'email',
  //       plugin_name: 'chat',
  //     });
  //   }

  //   gapi.then((d) => d.load('client:auth2', start));
  // }, []);

  return (
    <Box marginTop={'2.5rem'}>
      <Text textAlign={'center'}>Or</Text>
      <Box marginTop={'2.5rem'} display={'flex'} justifyContent={'center'}>
        {/* {socialMediaIconsData.map((iconData) => ( */}
        {/* <Box
            width='77px'
            height='77px'
            background='clique.secondaryGrey4'
            boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
            borderRadius='42px'
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
            marginRight={iconData !== 'facebook' ? '2.5rem' : ''}
            cursor='pointer'
            key={iconData}
          >
            <Image
              src={`/assets/${iconData}.png`}
              alt={`${iconData} icon`}
              width={'47px'}
              height={'47px'}
            />
          </Box> */}
        {/* // ))} */}
        {/* <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
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
                src={`/assets/google.png`}
                alt={`google icon`}
                width={'47px'}
                height={'47px'}
              />
            </Button>
          )}
          onSuccess={(response) => responseGoogle(response)}
          onFailure={(error) => responseError(error)}
          cookiePolicy='single_host_origin'
        /> */}
        <GoogleLogin
          onSuccess={(credentialResponse) => loginGoogle(credentialResponse)}
          onError={() => {
            console.log('Login Failed');
          }}
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
