import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {useVerifyEmailMutation} from 'redux/services/auth.service';

import {Box, Text, useToast} from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import Color from '@constants/color';

const ConfirmEmail = () => {
  const [email, setEmail] = useState('');
  const [verifyEmail, verifyEmailStatus] = useVerifyEmailMutation();
  const router = useRouter();
  const toast = useToast();

  const handleVerifyEmail = async () => {
    const res: any = await verifyEmail({email});
    if ('data' in res) {
      toast({
        title: 'Success',
        description: 'Please check your email, a link has been sent there',
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: res.error?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      if (res.error?.data?.message.includes('Social Sign up')) {
        router.push('/login');
      }
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      alignItems={'center'}
      backgroundColor={Color().lightAndPrimary}
    >
      <CliqueLogo />
      <Box display={{base: 'none', lg: 'block'}}>
        <ShowAuthImage />
      </Box>
      <Box
        marginLeft={{base: '0', xl: '50%'}}
        minW={{base: '60%', xl: '50%'}}
        py='50px'
        minH={'100vh'}
      >
        <Box
          padding={'1rem'}
          width={{base: 'full', md: '450px'}}
          height={'100%'}
          margin='0 auto'
        >
          <ShowAuthHeader
            header='Confirm Email'
            detail='Enter your Circo email address to change password'
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
                email={true}
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
export {getServerSideProps} from '../components/widgets/Chakara';
