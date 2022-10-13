import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { controlInput, signUpInputData } from '@/constantsutils';
import { Box, Image, Text } from '@chakra-ui/react';

import { ShowAuthHeader, ShowAuthImage, SocialMedia } from './login';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
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
        if (inputs[2].value) {
            controlInput(4, 5, false, texts);
        }
        if (inputs[3].value) {
            controlInput(6, 7, false, texts);
        }
        if (inputs[4].value) {
            controlInput(8, 9, false, texts);
        }
        if (inputs[0].value === '') {
            controlInput(0, 1, true, texts);
        }
        if (inputs[1].value === '') {
            controlInput(2, 3, true, texts);
        }
        if (inputs[2].value === '') {
            controlInput(4, 5, true, texts);
        }
        if (inputs[3].value === '') {
            controlInput(6, 7, true, texts);
        }
        if (inputs[4].value === '') {
            controlInput(8, 9, true, texts);
        }
    }, [userName, password, email, firstName, lastName]);

    return (
        <Box
            display={'flex'}
            justifyContent='space-between'
            alignItems={'center'}
        >
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
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='login-form'
                    >
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
                                                    : inputName === 'userName'
                                                    ? userName
                                                    : inputName === 'firstName'
                                                    ? firstName
                                                    : inputName === 'lastName'
                                                    ? lastName
                                                    : email
                                            }
                                            onChange={
                                                image
                                                    ? (e) =>
                                                          setPassword(
                                                              e.target.value,
                                                          )
                                                    : inputName === 'firstName'
                                                    ? (e) =>
                                                          setFirstName(
                                                              e.target.value,
                                                          )
                                                    : inputName === 'lastName'
                                                    ? (e) =>
                                                          setLastName(
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
                                            fontSize='20px'
                                            color='#FFFFFF'
                                            position='absolute'
                                            left={'4.5%'}
                                            bottom='20%'
                                            className='placeholder'
                                        >
                                            {placeholder}
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
                        <button
                            type='submit'
                            className='login-submit'
                            style={{marginTop: '1.2rem'}}
                        >
                            Sign Up
                        </button>
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
