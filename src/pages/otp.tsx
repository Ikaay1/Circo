import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSignupMutation } from 'redux/services/auth.service';
import { setCredentials } from 'redux/slices/authSlice';

import { Box } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
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
            otp_code: otp.trim(),
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
                        header='Enter OTP'
                        detail='Enter the OTP sent to your email address'
                    />
                    <form onSubmit={handleSignUp} className='login-form'>
                        <Box
                            position='relative'
                            height='57px'
                            marginTop={'.5rem'}
                        >
                            <AuthInput
                                name={'OTP'}
                                theState={otp}
                                setTheState={setOtp}
                            />
                        </Box>
                        <AuthButton
                            status={signUpStatus}
                            {...{marginTop: '6.5rem'}}
                            name='Next'
                        />
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Referral;
