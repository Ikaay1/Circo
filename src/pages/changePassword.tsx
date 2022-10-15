import { CliqueLogo } from 'component/Navbar';
import React, { useEffect, useState } from 'react';
import { changePasswordInputData, controlInput } from '@constants/utils';
import { Box, Image, Text } from '@chakra-ui/react';
import { changePasswordInputData, controlInput } from '@constants/utils';
import { ShowAuthHeader, ShowAuthImage, SocialMedia } from './login';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
    }, [confirmPassword, password]);

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
                            ({name, key, placeholder, inputName}) => (
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
                                            type={'password'}
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
                                            {placeholder}
                                        </Text>
                                        <Image
                                            position='absolute'
                                            right={'4.5%'}
                                            bottom='26%'
                                            src='/assets/Password-lock.png'
                                            cursor={'pointer'}
                                            alt='show password'
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
