import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { controlInput, loginInputData } from '@/constantsutils';
import { Box, Image, Text } from '@chakra-ui/react';

import { socialMediaIconsData } from '../constants/utils';

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
            <Box width='640px' height='800px'>
                <Image
                    height='100%'
                    src='/assets/auth-image.png'
                    alt='auth-image'
                />
            </Box>
            <Box width={'700px'} marginTop='2rem'>
                <Box
                    padding={'1rem'}
                    width='450px'
                    height={'100%'}
                    margin='0 auto'
                >
                    <Box>
                        <Text
                            fontWeight='600'
                            fontSize='36px'
                            textAlign='center'
                            letterSpacing='-0.02em'
                            color='FFFFFF'
                        >
                            Login
                        </Text>
                        <Text color='#A1A1A1' textAlign='center'>
                            Welcome, join the Clique!
                        </Text>
                    </Box>
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
                                        className='placeholder'
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        font-size='20px'
                                        color='#FFFFFF'
                                        position='absolute'
                                        left={'4.5%'}
                                        bottom='20%'
                                        className='placeholder'
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
                    <div key={iconData}>
                        <Box
                            width='77px'
                            height='77px'
                            background='#292927'
                            boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
                            borderRadius='42px'
                            display={'flex'}
                            justifyContent='center'
                            alignItems={'center'}
                            marginRight={
                                iconData !== 'facebook' ? '2.5rem' : ''
                            }
                        >
                            <Image
                                src={`/assets/${iconData}.png`}
                                alt={`${iconData} icon`}
                                width={'47px'}
                                height={'47px'}
                            />
                        </Box>
                    </div>
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
