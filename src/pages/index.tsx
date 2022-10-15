import Navbar from 'component/Navbar';
import Link from 'next/link';

import { Box, Image, Text } from '@chakra-ui/react';

import {
	cliquePlatformData1,
	cliquePlatformData2,
	helpGrowData,
	walletData,
} from '@constants/utils';

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
                        w={{lg: '682px'}}
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
                                <Link href='/signup'>Sign Up For Free</Link>
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
                                <Link href='/login'>Login</Link>
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
                            <DownloadButtons baseWidth='150px' height='50px' />
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
                                <Box mt={'2.8rem'} w={{lg: '387px'}} key={key}>
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
                                        mt={{lg: '.5rem'}}
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
                                        mt={{lg: '.5rem'}}
                                    >
                                        {detail}
                                    </Text>
                                </Box>
                            ),
                        )}
                    </Box>
                </Box>
            </Box>
            <Box
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
                pt={{base: '3.2rem', sm: '4.2rem', lg: '5.5rem'}}
                pb={{base: '2rem', sm: '3rem', lg: '4rem'}}
            >
                <Text
                    fontWeight={{base: '600', lg: '700'}}
                    fontSize={{base: '20px', lg: '48px'}}
                    lineHeight='36px'
                    textAlign='center'
                    letterSpacing='-0.02em'
                    color='#FFFFFF'
                >
                    We help you grow
                </Text>
                <Box mt={'4.5rem'}>
                    {helpGrowData.map(({key, header, image, bigImage}, i) => (
                        <Box
                            key={key}
                            display={{lg: 'flex'}}
                            justifyContent={{lg: 'space-between'}}
                            alignItems={{lg: 'center'}}
                        >
                            <Box
                                mt={'4.5rem'}
                                w={{lg: '445px'}}
                                h={{lg: '100%'}}
                            >
                                <Text
                                    fontSize={{base: '18px', lg: '40px'}}
                                    lineHeight={{base: '28px', lg: '49px'}}
                                    color='#FFFFFF'
                                    fontWeight={{lg: '600'}}
                                >
                                    {header}
                                </Text>
                                <Text
                                    fontSize={{base: '12px', lg: '20px'}}
                                    lineHeight={{base: '20px', lg: '150%'}}
                                    color='#FFFFFF'
                                    mt={{base: '.45rem', lg: '.75'}}
                                >
                                    Your content is your craft and we know this.
                                    Hence, we have created this platform to help
                                    you monitize your craft. With each
                                    subscriber paying you, and tickets selling
                                    for each of your live events, you earning
                                    will surly increase!
                                </Text>
                            </Box>
                            <Box
                                mt='5rem'
                                position={'relative'}
                                h={{lg: '466px'}}
                                w={{
                                    lg: '683px',
                                }}
                                order={{lg: i === 1 ? '-1' : '1'}}
                                // border='1px solid red'
                            >
                                <Image
                                    src={`/assets/${image}.png`}
                                    alt={`${image}`}
                                    w={{
                                        base: i === 0 ? '290px' : '320px',
                                    }}
                                    ml={{
                                        base: 'auto',
                                    }}
                                    mr={{base: i === 1 ? 'auto' : ''}}
                                    display={{lg: 'none'}}
                                />
                                <Image
                                    src={`/assets/${bigImage}.png`}
                                    alt={`${image}`}
                                    w={{
                                        lg: i === 0 ? '600px' : '683px',
                                    }}
                                    h={{lg: i === 0 ? '400px' : '466px'}}
                                    ml={{
                                        lg: i === 0 ? 'auto' : '',
                                    }}
                                    display={{base: 'none', lg: 'block'}}
                                />
                                {i === 0 && (
                                    <Box
                                        w={{base: '185px', lg: '422px'}}
                                        p={{base: '.5rem', lg: '1.1rem'}}
                                        background='#1D1D1D'
                                        borderRadius='8.1807px'
                                        position={'absolute'}
                                        top='-15%'
                                        left={'0'}
                                    >
                                        {walletData.map(
                                            ({key, image, time, amount}, i) => (
                                                <Box
                                                    display={'flex'}
                                                    justifyContent='space-between'
                                                    background='#232323'
                                                    borderRadius='4.09035px'
                                                    p={{
                                                        base: '.3rem',
                                                        lg: '.7rem',
                                                    }}
                                                    mb={{
                                                        base: '.2rem',
                                                        lg: '.4rem',
                                                    }}
                                                    key={key}
                                                >
                                                    <Box display={'flex'}>
                                                        <Box
                                                            w={{
                                                                base: '16px',
                                                                lg: '30px',
                                                            }}
                                                            h={{
                                                                base: '16px',
                                                                lg: '30px',
                                                            }}
                                                            borderRadius={'50%'}
                                                            display={'flex'}
                                                            justifyContent='center'
                                                            alignItems={
                                                                'center'
                                                            }
                                                            bg={
                                                                i !== 2
                                                                    ? 'rgba(133, 191, 154, 0.3)'
                                                                    : 'rgba(195, 46, 46, 0.26)'
                                                            }
                                                            mr={{
                                                                base: '.15rem',
                                                                lg: '.55rem',
                                                            }}
                                                        >
                                                            <Image
                                                                src={`/assets/${image}.png`}
                                                                alt='arrow up icon'
                                                                w={{
                                                                    base: '12px',
                                                                    lg: '24px',
                                                                }}
                                                                h={{
                                                                    base: '12px',
                                                                    lg: '24px',
                                                                }}
                                                            />
                                                        </Box>

                                                        <Text
                                                            fontSize={{
                                                                base: '6.5px',
                                                                lg: '12px',
                                                            }}
                                                            lineHeight={{
                                                                base: '8px',
                                                                lg: '20px',
                                                            }}
                                                            color='#FFFFFF'
                                                        >
                                                            {i !== 2
                                                                ? 'Clique Wallet credited with'
                                                                : 'Clique Wallet debited with'}{' '}
                                                            <Text
                                                                display={
                                                                    'inline'
                                                                }
                                                                color={
                                                                    i !== 2
                                                                        ? '#22C55E'
                                                                        : '#D52B2B'
                                                                }
                                                            >
                                                                {amount}
                                                            </Text>
                                                        </Text>
                                                    </Box>
                                                    <Text
                                                        fontSize={{
                                                            base: '6.5px',
                                                            lg: '12px',
                                                        }}
                                                        lineHeight={{
                                                            base: '8px',
                                                            lg: '20px',
                                                        }}
                                                        color='#FFFFFF'
                                                    >
                                                        {time}
                                                    </Text>
                                                </Box>
                                            ),
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}

                    {/* <Box mt={'4.5rem'}>
                        <Text fontSize='18px' lineHeight='28px' color='#FFFFFF'>
                            Increase your earning
                        </Text>
                        <Text
                            fontSize='12px'
                            lineHeight='20px'
                            color='#FFFFFF'
                            mt='.45rem'
                        >
                            Your content is your craft and we know this. Hence,
                            we have created this platform to help you monitize
                            your craft. With each subscriber paying you, and
                            tickets selling for each of your live events, you
                            earning will surly increase!
                        </Text>
                    </Box>
                    <Box mt='5rem' position={'relative'}>
                        <Image
                            src='/assets/microphone.png'
                            alt='microphone'
                            w='320px'
                            m={'0 auto'}
                        />
                    </Box> */}
                </Box>
            </Box>
            <Box
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
                pt={{base: '7rem', lg: '5rem'}}
                pb={{base: '3.8rem', lg: '3.8rem'}}
            >
                <Text
                    fontWeight='600'
                    fontSize={{base: '20px', lg: '48px'}}
                    lineHeight={{base: '36px', lg: '59px'}}
                    textAlign='center'
                    letterSpacing='-0.02em'
                    color='#FFFFFF'
                >
                    Become that Creative you desire
                </Text>
                <Text
                    fontSize={{base: '14px', lg: '20px'}}
                    lineHeight={{base: '129%', lg: '150%'}}
                    textAlign='center'
                    color='#FFFFFF'
                    mt='.5rem'
                >
                    Channel your inner Pikaso and start creating content to be
                    monetized
                </Text>
                <Box
                    mt={{base: '3rem', lg: '10rem'}}
                    position={{lg: 'relative'}}
                    w={{lg: '1122px'}}
                    mx={{lg: 'auto'}}
                >
                    <Box w={{lg: '1122px'}}>
                        <Image
                            src='/assets/video.png'
                            w={{base: '344px', lg: '100%'}}
                            mx={{base: 'auto'}}
                            alt=''
                            display={{lg: 'none'}}
                        />
                        <Image
                            src='/assets/big-video.png'
                            w={{base: '344px', lg: '100%'}}
                            mx={{base: 'auto'}}
                            alt=''
                            display={{base: 'none', lg: 'block'}}
                        />
                    </Box>
                    <Box
                        mt={{base: '1.7rem'}}
                        display={{base: 'flex'}}
                        justifyContent={{base: 'space-between'}}
                    >
                        <Box
                            w={{base: '132px', lg: '321px'}}
                            h={{base: '285.79px', lg: '695px'}}
                            position={{lg: 'absolute'}}
                            top={{lg: '-8.4%'}}
                            right={{lg: '0'}}
                        >
                            <Image
                                src='/assets/mobile-video.png'
                                w={'100%'}
                                h={'100%'}
                                alt=''
                                display={{lg: 'none'}}
                            />
                            <Image
                                src='/assets/big-mobile-video.png'
                                alt=''
                                display={{base: 'none', lg: 'block'}}
                            />
                        </Box>
                        <Box
                            display={{base: 'flex'}}
                            flexDirection={{base: 'column', lg: 'row'}}
                            justifyContent={{base: 'center', lg: 'center'}}
                            alignItems={{base: 'center', lg: 'center'}}
                            w={{lg: '100%'}}
                            mt={{lg: '6.5rem'}}
                        >
                            <DownloadButtons
                                baseWidth='162px'
                                height='42.91px'
                                marginBottom='1.4rem'
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
                pt={{base: '3rem', sm: '3.5rem', lg: '4rem'}}
                pb={{base: '4.5rem', sm: '5rem', lg: '5.5rem'}}
                bg={'white'}
            >
                <Text
                    fontWeight='600'
                    fontSize='20px'
                    lineHeight='36px'
                    textAlign='center'
                    letterSpacing='-0.02em'
                    color='#1E1E1E'
                    display={{lg: 'none'}}
                >
                    Become that Creative you desire
                </Text>
                <Text
                    fontWeight='700'
                    fontSize='48px'
                    lineHeight='59px'
                    textAlign='center'
                    color='#141516'
                    display={{base: 'none', lg: 'block'}}
                >
                    Famous Creators on our platform
                </Text>
                <Text
                    fontSize={{base: '14px', lg: '20px'}}
                    lineHeight={{base: '129%', lg: '150%'}}
                    textAlign='center'
                    color={{base: '#000000', lg: '#141516'}}
                    mt={{base: '.4rem'}}
                >
                    At the end of the day have fun with celebrities
                </Text>
                {/* <Box>
                    <Image src='/assets/banky.png' alt='' />
                </Box> */}
            </Box>
        </Box>
    );
};

export default Home;

const DownloadButtons = ({
    baseWidth,
    height,
    marginBottom,
}: {
    baseWidth: string;
    height: string;
    marginBottom?: string;
}) => {
    return (
        <>
            <Text
                width={{
                    base: baseWidth,
                    sm: '200px',
                    md: '250px',
                    lg: '275.58',
                }}
                height={{base: height, lg: '73px'}}
                background='#FFFFFF'
                borderRadius={{base: '10.7285px', lg: '18.25px'}}
                fontSize={{base: '10.7285px', lg: '18.25'}}
                lineHeight={{base: '21px', lg: '36px'}}
                textAlign='center'
                color='#000000'
                display={'flex'}
                justifyContent='center'
                alignItems='center'
                mb={{
                    base: marginBottom ? '1.4rem' : '0rem',
                    lg: marginBottom ? '0rem' : '0rem',
                }}
                mr={{lg: '3.4rem'}}
            >
                Apple App Store{' '}
                <Image
                    src='/assets/apple-icon.png'
                    alt='apple icon'
                    marginLeft={'.6rem'}
                    w={{lg: '36.5px'}}
                    h={{lg: '36.5px'}}
                />
            </Text>
            <Text
                width={{
                    base: baseWidth,
                    sm: '200px',
                    md: '250px',
                    lg: '275.58',
                }}
                height={{base: height, lg: '73px'}}
                background='#000000'
                borderRadius={{base: '10.7285px', lg: '18.25px'}}
                fontSize={{base: '10.7285px', lg: '18.25'}}
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
                    w={{lg: '45.63px'}}
                    h={{lg: '41.25px'}}
                />
            </Text>
        </>
    );
};
