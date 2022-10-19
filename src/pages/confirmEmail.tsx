import Link from 'next/link';
import React, { useState } from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { CliqueLogo } from '@components/landing/Navbar';

import { ShowAuthHeader, ShowAuthImage } from './login';

const ConfirmEmail = () => {
    const [email, setEmail] = useState('');

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
                        header='Change Password'
                        detail='Enter your Clique email address to chnage password'
                    />
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='login-form'
                    >
                        <Box
                            position='relative'
                            height='57px'
                            marginTop={'.5rem'}
                        >
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input'
                                type={'text'}
                                required={true}
                                placeholder='Email'
                            />
                            <Text
                                position='absolute'
                                top='6%'
                                left={'4.5%'}
                                fontSize='12px'
                                color='#FFFFFF'
                                className='placeholder small'
                            >
                                Email
                            </Text>
                        </Box>
                        <Text
                            color='#A1A1A1'
                            textAlign='center'
                            marginTop='5.5rem'
                        >
                            You will receive an email with a link to verify your
                            account then, you can change your password
                        </Text>
                        <button
                            type='submit'
                            className='login-submit'
                            style={{marginTop: '.8rem'}}
                        >
                            Change Password
                        </button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default ConfirmEmail;
