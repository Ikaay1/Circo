import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { Box, Image, Text } from '@chakra-ui/react';

const Navbar = ({
    showSideBar,
    setShowSideBar,
}: {
    showSideBar: boolean;
    setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
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
                    <Link href='/'>CLIQUE</Link>
                </Box>
                <Text
                    display={{base: 'none', lg: 'block'}}
                    letterSpacing='0.5px'
                    color='#FFFFFF'
                >
                    <Link href='/about'>About</Link>
                </Text>
            </Box>
            <Box display={{base: 'none', lg: 'flex'}} alignItems='center'>
                <Text letterSpacing='0.5px' color='#FFFFFF'>
                    <Link href='/login'>Login</Link>
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
                    cursor={'pointer'}
                    onClick={() => router.push('/signup')}
                >
                    <Link href='signup'>Sign Up For Free</Link>
                </Text>
            </Box>
            <Box display={{lg: 'none'}} onClick={() => setShowSideBar(true)}>
                <AiOutlineMenu style={{width: '29px', height: '55px'}} />
            </Box>
        </Box>
    );
};

export default Navbar;

export const CliqueLogo = () => {
    return (
        <Box
            display={'flex'}
            alignItems='center'
            fontWeight={{lg: '700'}}
            fontSize='22.6935px'
            letterSpacing='0.709173px'
            color='#FFFFFF'
            position={'absolute'}
            top='4%'
            left='5%'
        >
            <Image src='/assets/clique-logo.png' alt='clique-logo' />
            <Link href='/'>CLIQUE</Link>
        </Box>
    );
};
