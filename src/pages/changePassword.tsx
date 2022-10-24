import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
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
                            ({name, key, inputName}, i) => (
                                <div key={key}>
                                    <Box
                                        position='relative'
                                        height='57px'
                                        marginTop={'.5rem'}
                                    >
                                        <AuthInput
                                            image={true}
                                            name={name}
                                            handleShowPassword={() =>
                                                handleShowPassword(i)
                                            }
                                            theState={
                                                inputName === 'password'
                                                    ? password
                                                    : confirmPassword
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
                            ),
                        )}
                        <AuthButton
                            {...{marginTop: '4.7rem'}}
                            name='Change Password'
                        />
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePassword;
