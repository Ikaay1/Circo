import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { Box, Image, Text } from '@chakra-ui/react';

const Navbar = () => {
    return (
        <Box
            display='flex'
            justifyContent={'space-between'}
            alignItems='center'
        >
            <Box display={'flex'} alignItems='center'>
                <Box
                    display={'flex'}
                    alignItems='center'
                    marginRight={{lg: '5.5rem'}}
                    fontWeight={{lg: '700'}}
                    fontSize='22.6935px'
                    letterSpacing='0.709173px'
                    color='#FFFFFF'
                >
                    <Image src='/assets/clique-logo.png' alt='clique-logo' />
                    CLIQUE
                </Box>
                <Text
                    display={{base: 'none', lg: 'block'}}
                    letterSpacing='0.5px'
                    color='#FFFFFF'
                >
                    About
                </Text>
            </Box>
            <Box display={{base: 'none', lg: 'flex'}} alignItems='center'>
                <Text letterSpacing='0.5px' color='#FFFFFF'>
                    Login
                </Text>
                <Text
                    marginLeft={'3rem'}
                    background='#892CDC'
                    borderRadius='30px'
                    w='221px'
                    h='50px'
                    display={'flex'}
                    justifyContent='center'
                    alignItems='center'
                >
                    Sign Up For Free
                </Text>
            </Box>
            <Box display={{lg: 'none'}}>
                <AiOutlineMenu style={{width: '29px', height: '55px'}} />
            </Box>
        </Box>
    );
};

export default Navbar;
