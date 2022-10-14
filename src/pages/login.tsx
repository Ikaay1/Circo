import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { CliqueLogo } from '@/componentsNavbar';
import { controlInput, loginInputData } from '@/constantsconstants';
import { Box, Image, Text } from '@chakra-ui/react';

import { socialMediaIconsData } from '../constants/constants';

const Login = () => {
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
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='login-form'
                    >
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
                                <input
                                    type='checkbox'
                                    required={true}
                                    name=''
                                />
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
                        <button type='submit' className='login-submit'>
                            Login
                        </button>
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
