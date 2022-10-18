import React, { useState } from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { CliqueLogo } from '@components/landing/Navbar';
import { changePasswordInputData } from '@constants/utils';

import { ShowAuthHeader, ShowAuthImage } from './login';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword0, setShowPassword0] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const handleShowPassword = (num: number) => {
        if (num === 0) {
            setShowPassword0((prevShowPassword0) => !prevShowPassword0);
        } else {
            setShowPassword1((prevShowPassword1) => !prevShowPassword1);
        }
    };

    return (
        <Box
            display={'flex'}
            justifyContent='space-between'
            alignItems={'center'}
        >
            <CliqueLogo />
            <ShowAuthImage height='900px' />
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
                        {changePasswordInputData.map(
                            ({name, key, placeholder, inputName}, i) => (
                                <div key={key}>
                                    <Box
                                        position='relative'
                                        height='57px'
                                        marginTop={'.5rem'}
                                    >
                                        <input
                                            value={
                                                inputName === 'password'
                                                    ? password
                                                    : confirmPassword
                                            }
                                            onChange={
                                                inputName === 'password'
                                                    ? (e) =>
                                                          setPassword(
                                                              e.target.value,
                                                          )
                                                    : (e) =>
                                                          setConfirmPassword(
                                                              e.target.value,
                                                          )
                                            }
                                            className='input'
                                            type={
                                                i === 0
                                                    ? showPassword0
                                                        ? 'text'
                                                        : 'password'
                                                    : showPassword1
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            required={true}
                                            placeholder={placeholder}
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
                                        <Image
                                            position='absolute'
                                            right={'4.5%'}
                                            bottom='26%'
                                            src='/assets/Password-lock.png'
                                            cursor={'pointer'}
                                            alt='show password'
                                            onClick={() =>
                                                handleShowPassword(Number(i))
                                            }
                                        />
                                    </Box>
                                </div>
                            ),
                        )}
                        <button
                            type='submit'
                            className='login-submit'
                            style={{marginTop: '4.7rem'}}
                        >
                            Change Password
                        </button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePassword;
