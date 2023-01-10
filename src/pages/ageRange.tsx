import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useVerifyEmailMutation } from 'redux/services/auth.service';

import { Box, Text } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import Color from '@constants/color';

const ConfirmEmail = () => {
  const [ageRange, setAgeRange] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('userData')!)) {
      router.push('login');
    }
  }, []);

  const handleAgeRange = () => {
    const data = JSON.parse(localStorage.getItem('userData')!);
    const userData = {
      ...data,
      ageRange,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    router.push('/interests');
  };

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
            header='Change Password'
            detail='Please select an age range'
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAgeRange();
            }}
            className='login-form'
          >
            <Box position='relative' height='57px' marginTop={'.5rem'}>
              <AuthInput
                name={'Age Range'}
                option={['18 and above', 'Below 18']}
                ageRange={ageRange}
                setAgeRange={setAgeRange}
              />
            </Box>
            <AuthButton
              {...{marginTop: '.8rem'}}
              name='Next'
              // status={verifyEmailStatus}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
