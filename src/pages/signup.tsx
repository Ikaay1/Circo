import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	usePreSignupMutation,
	useSignupMutation,
} from 'redux/services/auth.service';

import { Box, Button, Image, Text } from '@chakra-ui/react';
import { CliqueLogo } from '@components/landing/Navbar';
import { signUpInputData } from '@constants/utils';

import { SignUpDataInterface } from '../constants/interface';
import { ShowAuthHeader, ShowAuthImage, SocialMedia } from './login';

const Signup = () => {
    const [preSignup, preSignupStatus] = usePreSignupMutation();
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePreSignup = async (e: any) => {
        e.preventDefault();

        const allData = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
        };

        const data = {
            firstName: firstName,
            email: email,
        };

        const res: SignUpDataInterface = await preSignup(data);
        console.log(res);
        if ('data' in res) {
            // redirect to otp page and pass all data
            localStorage.setItem(
                'hashedOtp',
                JSON.stringify(res.data.data.otp_hash),
            );
            localStorage.setItem('userData', JSON.stringify(allData));
            router.push(`/otp`);
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
            <ShowAuthImage height='900px' />
            <Box width={'700px'} marginTop='2rem'>
                <Box
                    padding={'1rem'}
                    width='450px'
                    height={'100%'}
                    margin='0 auto'
                >
                    <ShowAuthHeader
                        header='Sign Up'
                        detail='Connect to more Cliques today!'
                    />
                    <form onSubmit={handlePreSignup} className='login-form'>
                        <Box
                            display={'flex'}
                            justifyContent='space-between'
                            marginTop={'.5rem'}
                        >
                            <Box width='48%' height='57px' position='relative'>
                                <input
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className='input'
                                    type={'text'}
                                    required={true}
                                    placeholder='Tony'
                                />
                                <Text
                                    position='absolute'
                                    top='6%'
                                    left={'4.5%'}
                                    fontSize='12px'
                                    color='#FFFFFF'
                                    className='placeholder small'
                                >
                                    First name
                                </Text>
                            </Box>
                            <Box width='48%' height='57px' position='relative'>
                                <input
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className='input'
                                    type={'text'}
                                    required={true}
                                    placeholder='Clark'
                                />
                                <Text
                                    position='absolute'
                                    top='6%'
                                    left={'4.5%'}
                                    fontSize='12px'
                                    color='#FFFFFF'
                                    className='placeholder small'
                                >
                                    Last name
                                </Text>
                            </Box>
                        </Box>
                        {signUpInputData.map(
                            ({name, image, key, placeholder, inputName}) => (
                                <div key={key}>
                                    <Box
                                        position='relative'
                                        height='57px'
                                        marginTop={'.5rem'}
                                    >
                                        <input
                                            value={
                                                image
                                                    ? password
                                                    : inputName ===
                                                      'referralCode'
                                                    ? referralCode
                                                    : inputName === 'userName'
                                                    ? userName
                                                    : email
                                            }
                                            onChange={
                                                image
                                                    ? (e) =>
                                                          setPassword(
                                                              e.target.value,
                                                          )
                                                    : inputName ===
                                                      'referralCode'
                                                    ? (e) =>
                                                          setReferralCode(
                                                              e.target.value,
                                                          )
                                                    : inputName === 'email'
                                                    ? (e) =>
                                                          setEmail(
                                                              e.target.value,
                                                          )
                                                    : (e) =>
                                                          setUserName(
                                                              e.target.value,
                                                          )
                                            }
                                            className='input'
                                            type={
                                                image
                                                    ? showPassword
                                                        ? 'text'
                                                        : 'password'
                                                    : 'text'
                                            }
                                            required={
                                                inputName !== 'referralCode'
                                                    ? true
                                                    : false
                                            }
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
                                        {image && (
                                            <Image
                                                position='absolute'
                                                right={'4.5%'}
                                                bottom='26%'
                                                src={image}
                                                cursor={'pointer'}
                                                alt='show password'
                                                onClick={handleShowPassword}
                                            />
                                        )}
                                    </Box>
                                </div>
                            ),
                        )}
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            marginTop={'1.6rem'}
                        >
                            <label
                                className='remember'
                                style={{
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                <input
                                    type='checkbox'
                                    required={true}
                                    name=''
                                />
                                I agree to the&nbsp;
                                <span style={{color: '#892cdc'}}>
                                    Terms & Conditions&nbsp;
                                </span>
                                and&nbsp;
                                <span style={{color: '#892cdc'}}>
                                    Privacy Policy
                                </span>
                            </label>
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
                            fontWeight='500'
                            fontSize='26px'
                            letterSpacing='-0.02em'
                            color='#ffffff '
                            marginTop='1.2rem'
                            isLoading={preSignupStatus.isLoading}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <SocialMedia
                        haveAccount={'Already have an account?'}
                        login={true}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Signup;
