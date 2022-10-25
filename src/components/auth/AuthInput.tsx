import React from 'react';

import { Box, Icon, Text } from '@chakra-ui/react';
import PasswordIcon from '@icons/PasswordIcon';

const AuthInput = ({
    image,
    theState,
    name,
    showPassword,
    showPassword0,
    showPassword1,
    handleShowPassword,
    email,
    i,
    setTheState,
    referral,
}: any) => {
    return (
        <>
            <input
                value={theState}
                onChange={(e) => setTheState(e.target.value)}
                className='input'
                type={
                    !i
                        ? image
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : email
                            ? 'email'
                            : 'text'
                        : i === 1
                        ? showPassword0
                            ? 'text'
                            : 'password'
                        : showPassword1
                        ? 'text'
                        : 'password'
                }
                required={referral ? false : true}
                placeholder={name}
            />
            <Text
                position='absolute'
                top='6%'
                left={'4.5%'}
                fontSize='sm'
                color='clique.white'
                className='placeholder small'
            >
                {name}
            </Text>
            {image && (
                <Box
                    position='absolute'
                    right={'4.5%'}
                    bottom='26%'
                    cursor={'pointer'}
                    onClick={handleShowPassword}
                >
                    <Icon as={PasswordIcon} />
                </Box>
            )}
        </>
    );
};

export default AuthInput;
