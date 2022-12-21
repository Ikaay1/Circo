import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useVerifyEmailMutation } from 'redux/services/auth.service';

import { Box, Text } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';

const ConfirmEmail = () => {
  const [email, setEmail] = useState('');
  const [verifyEmail, verifyEmailStatus] = useVerifyEmailMutation();
  const router = useRouter();

  const handleVerifyEmail = async () => {
    const res: any = await verifyEmail({email});
    if ('data' in res) {
      toast.success('Please check your email, a link has been sent there');
    } else {
      toast.error(res.error?.data?.message);
    }
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
            header='Change Password'
            detail='Enter your Circo email address to chnage password'
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyEmail();
            }}
            className='login-form'
          >
            <Box position='relative' height='57px' marginTop={'.5rem'}>
              <AuthInput
                name={'Email'}
                theState={email}
                setTheState={setEmail}
              />
            </Box>
            <Text
              color='clique.secondaryGrey2'
              textAlign='center'
              marginTop='5.5rem'
            >
              You will receive an email with a link to verify your account then,
              you can change your password
            </Text>
            <AuthButton
              {...{marginTop: '.8rem'}}
              name='Next'
              status={verifyEmailStatus}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
