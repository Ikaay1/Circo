import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'redux/app/hooks';
import { useLoginMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Image, Text } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import { CliqueLogo } from '@components/landing/Navbar';
import { loginInputData, socialMediaIconsData } from '@constants/utils';

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
                    payload: res?.data.data,
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
        <Box
            display={'flex'}
            justifyContent='space-between'
            alignItems={'center'}
        >
            <CliqueLogo />
            <ShowAuthImage height='800px' />
            <Box width={'700px'} marginTop='2rem'>
                <Box
                    padding={'1rem'}
                    width='450px'
                    height={'100%'}
                    margin='0 auto'
                >
                    <ShowAuthHeader
                        header='Login'
                        detail='Welcome, join the Clique!'
                    />
                    <form onSubmit={handleLogin} className='login-form'>
                        {loginInputData.map(({name, image, key}) => (
                            <div key={key}>
                                <Box
                                    position='relative'
                                    height='57px'
                                    marginTop={'1.5rem'}
                                >
                                    <AuthInput
                                        image={image}
                                        name={name}
                                        handleShowPassword={handleShowPassword}
                                        theState={image ? password : userName}
                                        setTheState={
                                            image ? setPassword : setUserName
                                        }
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
                            <Text
                                cursor='pointer'
                                fontSize='sm'
                                color='clique.secondaryRed'
                            >
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
                        login={false}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Login;

export const SocialMedia = ({
    haveAccount,
    login,
}: {
    haveAccount: string;
    login: boolean;
}) => {
    return (
        <Box marginTop={'2.5rem'}>
            <Text textAlign={'center'}>Or</Text>
            <Box
                marginTop={'2.5rem'}
                display={'flex'}
                justifyContent={'center'}
            >
                {socialMediaIconsData.map((iconData) => (
                    <Box
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
                    </Box>
                ))}
            </Box>
            <Box
                fontSize='sm2'
                color='clique.white'
                textAlign={'center'}
                marginTop={'1.7rem'}
            >
                <Text display={'inline'} marginRight='.25rem'>
                    {haveAccount}
                </Text>
                <span style={{color: '#892cdc'}}>
                    <Link href={login ? '/login' : '/signup'}>
                        {login ? 'Login' : 'Sign Up'}
                    </Link>
                </span>
            </Box>
        </Box>
    );
};

export const ShowAuthImage = ({height}: {height: string}) => {
    return (
        <Box width='640px' height={height}>
            <Image
                height='100%'
                src='/assets/auth-image.png'
                alt='auth-image'
                objectFit={'cover'}
            />
        </Box>
    );
};

export const ShowAuthHeader = ({
    header,
    detail,
}: {
    header: string;
    detail: string;
}) => {
    return (
        <Box>
            <Text
                fontWeight='600'
                fontSize='medium'
                textAlign='center'
                letterSpacing='-0.02em'
                color='clique.white'
            >
                {header}
            </Text>
            <Text color='clique.secondaryGrey2' textAlign='center'>
                {detail}
            </Text>
        </Box>
    );
};
