import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
	useChangePasswordMutation,
	useVerifyLinkCodeMutation,
} from 'redux/services/auth.service';

import { Box } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import Color from '@constants/color';
import { changePasswordInputData } from '@constants/utils';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword0, setShowPassword0] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const router = useRouter();
  const {code} = router.query;
  const [verifyLinkCode, verifyLinkCodeStatus] = useVerifyLinkCodeMutation();
  const [changePassword, changePasswordStatus] = useChangePasswordMutation();
  const firstTimeRef = useRef(0);

  const handleShowPassword = (num: number) => {
    if (num === 0) {
      setShowPassword0((prevShowPassword0) => !prevShowPassword0);
    } else {
      setShowPassword1((prevShowPassword1) => !prevShowPassword1);
    }
  };

  useEffect(() => {
    const handleVerifyCode = async () => {
      firstTimeRef.current += 1;
      if (firstTimeRef.current === 1) {
        const res: any = await verifyLinkCode({otp_code: code});

        if (res.error) {
          toast.error(res.error?.data?.message);
          router.push('/login');
        } else {
          localStorage.setItem(
            'email',
            JSON.stringify(res.data.data.user.email),
          );
        }
      }
    };
    if (code) {
      handleVerifyCode();
    }
  }, [code, router, verifyLinkCode]);

  const handleChangePassword = async () => {
    const email = JSON.parse(localStorage.getItem('email')!);
    const res: any = await changePassword({
      newPassword: password,
      confirmPassword,
      email,
    });
    console.log(res);

    if ('data' in res) {
      toast.success('Password changed successfully');
      setPassword('');
      setConfirmPassword('');
      router.push('/login');
    } else {
      toast.error(res.error?.data?.message);
    }
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
            detail='Enter your Circo email address to chnage password'
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
            className='login-form'
          >
            {changePasswordInputData.map(({name, key, inputName}, i) => (
              <div key={key}>
                <Box position='relative' height='57px' marginTop={'.5rem'}>
                  <AuthInput
                    image={true}
                    name={name}
                    handleShowPassword={() => handleShowPassword(i)}
                    theState={
                      inputName === 'password' ? password : confirmPassword
                    }
                    setTheState={
                      inputName === 'password'
                        ? setPassword
                        : setConfirmPassword
                    }
                    showPassword0={showPassword0}
                    showPassword1={showPassword1}
                    i={i + 1}
                  />
                </Box>
              </div>
            ))}
            <AuthButton
              {...{marginTop: '4.7rem'}}
              name='Change Password'
              disabled={verifyLinkCodeStatus.isLoading}
              status={changePasswordStatus}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
export { getServerSideProps } from "../components/widgets/Chakara";