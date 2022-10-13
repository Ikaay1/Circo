import Navbar from 'component/Navbar';

import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';

import { cliquePlatformData1, cliquePlatformData2 } from '../constants/utils';

import type {NextPage} from 'next';
const Home: NextPage = () => {
    return (
        <Box>
            <Box
                marginTop={{base: '2.5rem', sm: '3.5rem', lg: '1.8rem'}}
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
            >
                <Navbar />
            </Box>
            <Box pb={'2.5rem'} px={{base: '1rem', sm: '2rem', lg: '5rem'}}>
                <Box
                    marginTop={{base: '5rem', lg: '6.5rem'}}
                    display={{lg: 'flex'}}
                    justifyContent={{lg: 'space-between', xl: 'space-around'}}
                    alignItems={{lg: 'center'}}
                >
                    <Box
                        // border={'1px solid red'}
                        w={{lg: '490px'}}
                        h={{lg: '100%'}}
                    >
                        <Text
                            fontWeight={{base: '600', lg: '700'}}
                            fontSize={{base: '36px', lg: '48px'}}
                            lineHeight={{base: '44px', lg: '110%'}}
                            letterSpacing={{base: '-0.02em', lg: '-0.5px'}}
                            color='#FFFFFF'
                        >
                            Deliver exclusive content to more people in real
                            time.
                        </Text>
                        <Text
                            fontSize={{base: '14px', lg: '20px'}}
                            lineHeight={{base: '20px', lg: '30px'}}
                            color='#FFFFFF'
                            marginTop={{base: '.75rem', lg: '1.25rem'}}
                            letterSpacing='0.5px'
                        >
                            Clique is that platform that offers the creators
                            more expression with their exclusive content. Get
                            connected to millions of followers for your daily
                            contents and real time events.
                        </Text>
                        <Box
                            display={{base: 'none', lg: 'flex'}}
                            alignItems={'center'}
                            marginTop={'2.2rem'}
                        >
                            <Text
                                marginRight={'1.3rem'}
                                background='#892CDC'
                                borderRadius='30px'
                                w='221px'
                                h='50px'
                                display='flex'
                                justifyContent={'center'}
                                alignItems={'center'}
                                fontWeight='500'
                                letterSpacing='0.5px'
                            >
                                Sign Up For Free
                            </Text>
                            <Text
                                marginRight={'1.7rem'}
                                background='#171717'
                                borderRadius='30px'
                                w='220px'
                                h='50px'
                                display='flex'
                                justifyContent={'center'}
                                alignItems={'center'}
                                fontWeight='500'
                                letterSpacing='0.5px'
                                border={'1px solid white'}
                            >
                                Login
                            </Text>
                        </Box>
                        <Box
                            display={{base: 'flex', lg: 'none'}}
                            justifyContent={{
                                base: 'space-between',
                                sm: 'space-evenly',
                            }}
                            alignItems={'center'}
                            marginTop='2.7rem'
                        >
                            <Text
                                width={{
                                    base: '150px',
                                    sm: '200px',
                                    md: '250px',
                                }}
                                height='50px'
                                background='#FFFFFF'
                                borderRadius='10.7285px'
                                fontSize='10.7285px'
                                lineHeight='21px'
                                textAlign='center'
                                color='#000000'
                                display={'flex'}
                                justifyContent='center'
                                alignItems='center'
                            >
                                Apple App Store{' '}
                                <Image
                                    src='/assets/apple-icon.png'
                                    alt='apple icon'
                                    marginLeft={'.6rem'}
                                />
                            </Text>
                            <Text
                                width={{
                                    base: '150px',
                                    sm: '200px',
                                    md: '250px',
                                }}
                                height='50px'
                                background='#000000'
                                borderRadius='10.7285px'
                                fontSize='10.7285px'
                                textAlign='center'
                                color='#FFFFFF'
                                display={'flex'}
                                justifyContent='center'
                                alignItems='center'
                            >
                                Google PlayStore{' '}
                                <Image
                                    src='/assets/google-icon.png'
                                    alt='google icon'
                                    marginLeft={'.6rem'}
                                />
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        w={{base: '316.96px', lg: '661px'}}
                        h={{base: '209.07px', lg: '436px'}}
                        // mx='auto'
                        marginTop={'5.5rem'}
                        position='relative'
                        transform={{lg: 'translateY(-20%)'}}
                    >
                        <Image
                            w={{base: '316.96px', lg: '661px'}}
                            h={{base: '164px', lg: '342px'}}
                            src='/assets/video-player.png'
                            alt='video player'
                        />
                        <Image
                            w={{base: '96.86px', lg: '202px'}}
                            h={{base: '209.07px', lg: '436px'}}
                            src='/assets/mobile-player.png'
                            alt='video player'
                            position='absolute'
                            top={{base: '-9.5%', lg: 'auto'}}
                            bottom={{lg: '-20%'}}
                            left='0'
                        />
                        <Box
                            width={{base: '34.53px', lg: '72px'}}
                            height={{base: '14.39px', lg: '30px'}}
                            background='#FFFFFF'
                            boxShadow='0px 2.3976px 10.0699px 4.79521px rgba(0, 0, 0, 0.25)'
                            borderRadius='7.19281px'
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            position='absolute'
                            top={'0'}
                            right={'0'}
                        >
                            <Box
                                mr={'.25rem'}
                                width={{base: '2.88px', lg: '6px'}}
                                height={{base: '2.88px', lg: '6px'}}
                                background='#FF0000'
                                borderRadius={'50%'}
                            ></Box>
                            <Text
                                fontFamily='Mitr'
                                fontSize={{base: '7.67233px', lg: '16px'}}
                                color='#141516'
                            >
                                Live
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={{base: 'space-between', xl: 'space-around'}}
                    alignItems='center'
                    mt={{base: '4rem', lg: '9rem'}}
                >
                    <Image
                        w={{base: '55px', lg: 'auto'}}
                        src='/assets/tv.png'
                        alt='tv'
                    />
                    <Image
                        w={{base: '55px', lg: 'auto'}}
                        src='/assets/androidtv.png'
                        alt='androidtv'
                    />
                    <Image
                        w={{base: '55px', lg: 'auto'}}
                        src='/assets/watch.png'
                        alt='watch'
                    />
                    <Image
                        w={{base: '55px', lg: 'auto'}}
                        src='/assets/iphone.png'
                        alt='iphone'
                    />
                    <Image
                        w={{base: '55px', lg: 'auto'}}
                        src='/assets/android.png'
                        alt='android'
                    />
                </Box>
            </Box>
            <Box
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
                pt={{base: '3rem', sm: '3.5rem', lg: '4rem'}}
                pb={{base: '4.5rem', sm: '5rem', lg: '5.5rem'}}
                bg={'white'}
            >
                <Text
                    fontWeight={{base: '600', lg: '700'}}
                    fontSize={{base: '20px', lg: '48px'}}
                    color='#000000'
                    textAlign={'center'}
                >
                    One-Clique-Platfrom
                </Text>
                <Text
                    fontSize='14px'
                    lineHeight='21px'
                    textAlign='center'
                    color='#000000'
                    mt={'.9rem'}
                >
                    You take care of your contnet choice, and we’ll take care of
                    the rest.
                </Text>
                <Box>
                    <Box
                        mt={'3.5rem'}
                        display={{lg: 'flex'}}
                        justifyContent={{
                            lg: 'space-between',
                            xl: 'space-around',
                        }}
                    >
                        {cliquePlatformData1.map(
                            ({key, name, detail, image}) => (
                                <Box mt={'2.8rem'} w={{lg: '400px'}} key={key}>
                                    <Box
                                        fontWeight='600'
                                        fontSize='18px'
                                        color='#141516'
                                        display={'flex'}
                                        alignItems='center'
                                    >
                                        <Image
                                            src={`/assets/${image}.png`}
                                            alt='money logo'
                                            mr={'.8rem'}
                                        />
                                        {name}
                                    </Box>
                                    <Text
                                        fontWeight='400'
                                        fontSize={{base: '12px'}}
                                        lineHeight={{base: '20px', lg: '150%'}}
                                        color='#141516'
                                    >
                                        {detail}
                                    </Text>
                                </Box>
                            ),
                        )}
                    </Box>
                    <Box
                        mt={'3.5rem'}
                        display={{lg: 'flex'}}
                        justifyContent={{
                            lg: 'space-between',
                            xl: 'space-around',
                        }}
                    >
                        {cliquePlatformData2.map(
                            ({key, name, detail, image}) => (
                                <Box mt={'2.8rem'} w={{lg: '400px'}} key={key}>
                                    <Box
                                        fontWeight='600'
                                        fontSize='18px'
                                        color='#141516'
                                        display={'flex'}
                                        alignItems='center'
                                    >
                                        <Image
                                            src={`/assets/${image}.png`}
                                            alt='money logo'
                                            mr={'.8rem'}
                                        />
                                        {name}
                                    </Box>
                                    <Text
                                        fontWeight='400'
                                        fontSize={{base: '12px'}}
                                        lineHeight={{base: '20px', lg: '150%'}}
                                        color='#141516'
                                    >
                                        {detail}
                                    </Text>
                                </Box>
                            ),
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
