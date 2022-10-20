import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSignupMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box, Button, Image, Text } from '@chakra-ui/react';
import { CliqueLogo } from '@components/landing/Navbar';
import { LoginDataInterface } from '@constants/interface';

import { useAppDispatch } from '../redux/app/hooks';
import { ShowAuthHeader, ShowAuthImage } from './login';

const Referral = () => {
    const [otp, setOtp] = useState('');

    const [signup, signUpStatus] = useSignupMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allData = JSON.parse(localStorage.getItem('userData')!);
        const hashedOtp = JSON.parse(localStorage.getItem('hashedOtp')!);
        const userData = {
            ...allData,
            otp_code: otp,
            otp_hash: `${hashedOtp}`,
            social: 'NULL',
        };
        const res: LoginDataInterface = await signup(userData);
        if ('data' in res) {
            dispatch(
                setCredentials({
                    payload: res?.data.data,
                }),
            );
            router.push(`/home`);
        } else if (res.error) {
            //@ts-ignore
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
                        header='Referral Code'
                        detail='were you referred by someone? paste the referral code.'
                    />
                    <form onSubmit={handleSignUp} className='login-form'>
                        <Box
                            position='relative'
                            height='57px'
                            marginTop={'.5rem'}
                        >
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className='input'
                                type={'text'}
                                required={true}
                                placeholder='OTP'
                            />
                            <Text
                                position='absolute'
                                top='6%'
                                left={'4.5%'}
                                fontSize='12px'
                                color='#FFFFFF'
                                className='placeholder small'
                            >
                                OTP
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
                            marginTop='6.5rem'
                            fontWeight='500'
                            fontSize='26px'
                            letterSpacing='-0.02em;'
                            color='#ffffff '
                            isLoading={signUpStatus.isLoading}
                        >
                            Next
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Referral;
