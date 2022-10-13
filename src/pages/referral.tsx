import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { controlInput, signUpInputData } from '@/constantsutils';
import { Box, Image, Text } from '@chakra-ui/react';

import { ShowAuthHeader, ShowAuthImage } from './login';

const Referral = () => {
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        const input: HTMLInputElement = document.querySelector('.input')!;
        const texts: NodeListOf<HTMLParagraphElement> =
            document.querySelectorAll('.placeholder')!;
        if (input.value) {
            controlInput(0, 1, false, texts);
        }
        if (input.value === '') {
            controlInput(0, 1, true, texts);
        }
    }, [referralCode]);

    return (
        <Box
            display={'flex'}
            justifyContent='space-between'
            alignItems={'center'}
        >
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
                        detail='where you refered by someone? paste the referal
                            code.'
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
                                value={referralCode}
                                onChange={(e) =>
                                    setReferralCode(e.target.value)
                                }
                                className='input'
                                type={'text'}
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
                                Referral Code
                            </Text>
                            <Text
                                fontSize='20px'
                                color='#FFFFFF'
                                position='absolute'
                                left={'4.5%'}
                                bottom='20%'
                                className='placeholder'
                            >
                                DD7Y47
                            </Text>
                        </Box>
                        <button
                            type='submit'
                            className='login-submit'
                            style={{marginTop: '6.5rem'}}
                        >
                            Next
                        </button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Referral;
