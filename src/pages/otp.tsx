import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useVerifyAuthOtpMutation} from 'redux/services/auth.service';

import {Box, useToast} from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import Color from '@constants/color';

const Referral = () => {
  const [otp, setOtp] = useState('');
  const [verifyOtp, veriftOtpStatus] = useVerifyAuthOtpMutation();
  const toast = useToast();

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allData = JSON.parse(localStorage.getItem('userData')!);
    const hashedOtp = JSON.parse(localStorage.getItem('hashedOtp')!);
    const res: any = await verifyOtp({
      otp_code: otp.trim(),
      otp_hash: `${hashedOtp}`,
    });
    if ('data' in res) {
      const userData = {
        ...allData,
        otp_code: otp.trim(),
        otp_hash: `${hashedOtp}`,
        social: 'NULL',
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.removeItem('hashedOtp');
      router.push('/interests');
    } else {
      toast({
        title: 'Error',
        //@ts-ignore
        description: res?.error?.data?.errors?.otp_code
          ? res?.error?.data?.errors?.otp_code
          : res?.error?.data?.message
          ? res?.error?.data?.message
          : 'Something went wrong, please try again ',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('hashedOtp')!)) {
      toast({
        title: 'Error',
        //@ts-ignore
        description: 'Please sign up with your details first',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      router.push('/signup');
    }
  }, []);

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      alignItems={'center'}
      // backgroundColor={Color().whiteAndBlack}
    >
      <CliqueLogo />
      <Box display={{base: 'none', lg: 'block'}}>
        <ShowAuthImage />
      </Box>
      <Box
        marginLeft={{base: '0', xl: '50%'}}
        minW={{base: '60%', xl: '50%'}}
        py='50px'
      >
        <Box padding={'1rem'} width='450px' height={'100%'} margin='0 auto'>
          <ShowAuthHeader
            header='Enter OTP'
            detail='Enter the OTP sent to your email address'
          />
          <form onSubmit={handleSignUp} className='login-form'>
            <Box position='relative' height='57px' marginTop={'.5rem'}>
              <AuthInput name={'OTP'} theState={otp} setTheState={setOtp} />
            </Box>
            <AuthButton
              status={veriftOtpStatus}
              {...{marginTop: '6.5rem'}}
              name='Next'
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Referral;
