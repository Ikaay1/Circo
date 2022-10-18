import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'redux/app/hooks';
import { useLoginMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Button, Image, Text, Toast } from '@chakra-ui/react';
import { CliqueLogo } from '@components/landing/Navbar';
import {
	controlInput,
	loginInputData,
	socialMediaIconsData,
} from '@constants/utils';

const Login = () => {
    const [login, loginStatus] = useLoginMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const inputs: NodeListOf<HTMLInputElement> =
            document.querySelectorAll('.input');
        const texts: NodeListOf<HTMLParagraphElement> =
            document.querySelectorAll('.placeholder');
        if (inputs[0].value) {
            controlInput(0, 1, false, texts);
        }
        if (inputs[1].value) {
            controlInput(2, 3, false, texts);
        }
        if (inputs[0].value === '') {
            controlInput(0, 1, true, texts);
        }
        if (inputs[1].value === '') {
            controlInput(2, 3, true, texts);
        }
    }, [userName, password]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const data = {
            userNameOrEmail: userName,
            password: password,
        };
        const res: any = await login(data);

        if (res.data) {
            console.log(res.data);

            dispatch(
                setCredentials({
                    payload: res?.data,
                }),
            );
            router.push('/home');
            localStorage.setItem('token', res.data?.token);
        } else if (res.error) {
            toast.error(res?.error?.data?.message);
        } else {
            toast.error('Something went wrong');
        }
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
                                    <input
                                        value={image ? password : userName}
                                        onChange={
                                            image
                                                ? (e) =>
                                                      setPassword(
                                                          e.target.value,
                                                      )
                                                : (e) =>
                                                      setUserName(
                                                          e.target.value,
                                                      )
                                        }
                                        className='input'
                                        type={image ? 'password' : 'text'}
                                        required={true}
                                    />
                                    <Text
                                        position='absolute'
                                        top='6%'
                                        left={'4.5%'}
                                        fontSize='12px'
                                        color='#FFFFFF'
                                        className='placeholder small'
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        fontSize='16px'
                                        color='#FFFFFF'
                                        position='absolute'
                                        left={'4.5%'}
                                        bottom='20%'
                                        className='placeholder big'
                                    >
                                        {name}
                                    </Text>
                                    {image && (
                                        <Image
                                            position='absolute'
                                            right={'4.5%'}
                                            bottom='26%'
                                            src={image}
                                            cursor={'pointer'}
                                            alt='show password'
                                        />
                                    )}
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
                                fontSize='12px'
                                color='#BA1A1A'
                            >
                                Forgot Password
                            </Text>
                        </Box>

                        <Button
                            type='submit'
                            background='#892cdc'
                            borderRadius='50px'
                            width='100%;'
                            height='60px;'
                            display='flex;'
                            alignItems='center'
                            justifyContent='center'
                            marginTop='4rem'
                            fontWeight='500'
                            fontSize='26px'
                            letterSpacing='-0.02em;'
                            color='#ffffff '
                            isLoading={loginStatus.isLoading}
                        >
                            Login
                        </Button>
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
                        background='#292927'
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
                fontSize='18px'
                color='#FFFFFF'
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
                fontSize='36px'
                textAlign='center'
                letterSpacing='-0.02em'
                color='FFFFFF'
            >
                {header}
            </Text>
            <Text color='#A1A1A1' textAlign='center'>
                {detail}
            </Text>
        </Box>
    );
};
