import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'redux/app/hooks';
import { useLoginMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Text } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import SocialMedia from '@components/auth/SocialMedia';
import { loginInputData } from '@constants/utils';

import { LoginDataInterface } from '../constants/interface';

const Login = () => {
  const [login, loginStatus] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    let userNameDetail;
    if (userName.includes('@')) {
      userNameDetail = userName.toLowerCase().trim();
    } else {
      userNameDetail = userName.trim();
    }
    const userData = {
      userNameOrEmail: userNameDetail,
      password: password.trim(),
    };
    const res: LoginDataInterface = await login(userData);

    if ('data' in res) {
      dispatch(
        setCredentials({
          payload: res?.data,
        }),
      );
      router.push('/home');
      // localStorage.setItem('token', res.data?.token);
    } else if (res.error) {
      //@ts-ignore
      toast.error(res?.error?.data?.message);
    } else {
      toast.error('Something went wrong');
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <ShowAuthHeader header='Login' detail='Welcome, join the Clique!' />
          <form onSubmit={handleLogin} className='login-form'>
            {loginInputData.map(({name, image, key}) => (
              <div key={key}>
                <Box position='relative' height='57px' marginTop={'1.5rem'}>
                  <AuthInput
                    image={image}
                    name={name}
                    handleShowPassword={handleShowPassword}
                    theState={image ? password : userName}
                    setTheState={image ? setPassword : setUserName}
                    showPassword={showPassword}
                  />
                </Box>
              </div>
            ))}
            <Box display={'flex'} justifyContent={'space-between'}>
              <label className='remember'>
                <input type='checkbox' name='' />
                Remember me?
              </label>
              <Text cursor='pointer' fontSize='sm' color='clique.secondaryRed'>
                Forgot Password
              </Text>
            </Box>
            <AuthButton
              status={loginStatus}
              {...{marginTop: '4rem'}}
              name='Login'
            />
          </form>
          <SocialMedia
            haveAccount={"Don't have an account?"}
            text={'Sign Up'}
          />
          <Box mt='.35rem' textAlign={'center'}>
            <Text display={'inline'} marginRight='.25rem'>
              Need help? send a mail to
            </Text>
            <span style={{color: '#892cdc'}}>
              <a href='mailto: support@clique.com'>support@clique.com</a>
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
