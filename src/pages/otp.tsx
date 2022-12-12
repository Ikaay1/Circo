import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';

const Referral = () => {
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allData = JSON.parse(localStorage.getItem('userData')!);
    const hashedOtp = JSON.parse(localStorage.getItem('hashedOtp')!);
    const userData = {
      ...allData,
      otp_code: otp.trim(),
      otp_hash: `${hashedOtp}`,
      social: 'NULL',
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.removeItem('hashedOtp');
    router.push('/interests');
  };

  return (
    <Box display={'flex'} justifyContent='space-between' alignItems={'center'}>
      <CliqueLogo />
      <ShowAuthImage />
      <Box
        marginLeft={{base: '40%', xl: '50%'}}
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
            <AuthButton {...{marginTop: '6.5rem'}} name='Next' />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Referral;
