import Link from 'next/link';
import { useState } from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import { Box, Image, Text } from '@chakra-ui/react';
import Navbar from '@components/landing/Navbar';
import Sidebar from '@components/landing/Sidebar';
import {
	cliquePlatformData1,
	cliquePlatformData2,
	contactInfoData,
	famousCreatorsImageData,
	footerOthersData,
	helpGrowData,
	walletData,
} from '@constants/utils';

import type {NextPage} from 'next';
const Home: NextPage = () => {
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    return (
        <Box overflowX={'hidden'}>
            <Box
                marginTop={{base: '2.5rem', sm: '3.5rem', lg: '1.8rem'}}
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
            >
                <Navbar setShowSideBar={setShowSideBar} />
            </Box>
            <Box pb={'2.5rem'} px={{base: '1rem', sm: '2rem', lg: '5rem'}}>
                <Box
                    marginTop={{base: '5rem', lg: '6.5rem'}}
                    display={{lg: 'flex'}}
                    justifyContent={{lg: 'space-between', xl: 'space-around'}}
                    alignItems={{lg: 'center'}}
                >
                    <Box w={{lg: '682px'}} h={{lg: '100%'}}>
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
                                //
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
                pt={{base: '3rem', sm: '3.5rem', lg: '4rem'}}
                pb={{base: '11rem', sm: '12rem', lg: '38rem'}}
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
                <Box position='relative' zIndex={'0'}>
                    <Box
                        height={{base: '80px', lg: '264px'}}
                        borderRadius={'40%'}
                        zIndex='99999'
                        backgroundColor={'white'}
                    ></Box>
                    <Box
                        position={'absolute'}
                        bottom={{base: '-130px', lg: '-435px'}}
                        zIndex={'-2'}
                        display='flex'
                        justifyContent={'space-between'}
                        w='100%'
                    >
                        {famousCreatorsImageData.map((image) => (
                            <Image
                                w={{
                                    base: '80px',
                                    sm: '100px',
                                    md: '170px',
                                    lg: '238px',
                                    xl: '342px',
                                }}
                                h={{base: '159.79px', lg: '544px'}}
                                src={`/assets/${image}.png`}
                                alt=''
                                objectFit={'cover'}
                                key={image}
                            />
                        ))}
                        <Image
                            w={{lg: '238px', xl: '342px'}}
                            h='544px'
                            src='/assets/celeb5.png'
                            alt=''
                            objectFit={'cover'}
                            display={{base: 'none', lg: 'inline'}}
                        />
                    </Box>
                    <Box
                        height={{base: '80px', lg: '264px'}}
                        borderRadius={'40%'}
                        // zIndex='5'
                        backgroundColor={'white'}
                        position='absolute'
                        bottom={{base: '-170px', lg: '-601px'}}
                        w='100%'
                    ></Box>
                </Box>
            </Box>
            <Box
                px={{base: '1rem', sm: '2rem', lg: '5rem'}}
                pt={{base: '2rem', sm: '3rem', lg: '4rem'}}
                pb={'2rem'}
                bg='#F6EFFC'
            >
                <Box
                    display={{lg: 'flex'}}
                    justifyContent={{lg: 'space-between'}}
                >
                    <Box>
                        <Box
                            display={'flex'}
                            alignItems='center'
                            fontWeight={'700'}
                            fontSize={{base: '16.0124px', lg: '22.6935px'}}
                            letterSpacing={{
                                base: '0.500386px',
                                lg: '0.709173px',
                            }}
                            color='#000000'
                        >
                            <Image
                                src='/assets/clique-logo.png'
                                alt='clique-logo'
                                w={{base: '32.02px', lg: '45.39px'}}
                                h={{base: '36.16px', lg: '51.24px'}}
                            />
                            <Link href='/'>CLIQUE</Link>
                        </Box>
                        <Text
                            fontSize={{base: '14px', lg: '20px'}}
                            lineHeight={{base: '20px', lg: '150%'}}
                            color='#141516'
                            mt={{base: '.85rem'}}
                            w={{base: '180px'}}
                        >
                            Streaming and Video platform
                        </Text>
                        <Box display={'flex'} mt={{base: '.85rem'}}>
                            <Image
                                marginRight={'2rem'}
                                src='/assets/instagram.png'
                                alt=''
                            />
                            <Image src='/assets/fb.png' alt='' />
                        </Box>
                    </Box>
                    <Box mt={{base: '3.8rem', lg: '0'}}>
                        <Box>
                            <Text
                                fontWeight='600'
                                fontSize={{base: '18px', lg: '24px'}}
                                lineHeight={{base: '22px', lg: '29px'}}
                                textAlign='justify'
                                color='#141516'
                            >
                                Contact Info
                            </Text>
                            <Box>
                                {contactInfoData.map(({image, detail}) => (
                                    <Box
                                        display={'flex'}
                                        mt='1.2rem'
                                        key={image}
                                    >
                                        <Image
                                            src={`/assets/${image}.png`}
                                            //
                                            mr='1.2rem'
                                            alt=''
                                            h={{base: '100%'}}
                                        />
                                        <Text
                                            fontSize={{
                                                base: '14px',
                                                lg: '16px',
                                            }}
                                            fontWeight={{lg: '500'}}
                                            lineHeight={{
                                                base: '20px',
                                                lg: '150%',
                                            }}
                                            color='#141516'
                                            w={{base: '180px'}}
                                        >
                                            {detail}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box
                            mt={{lg: '3.5rem'}}
                            display={{base: 'none', lg: 'block'}}
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{base: '18px', lg: '24px'}}
                                lineHeight={{base: '22px', lg: '29px'}}
                                textAlign='justify'
                                color='#141516'
                            >
                                Others
                            </Text>
                            <Box>
                                {footerOthersData.map(({key, detail}) => (
                                    <Box display={'flex'} mt='1.2rem' key={key}>
                                        <Text
                                            fontSize={{
                                                base: '14px',
                                                lg: '16px',
                                            }}
                                            fontWeight={{lg: '500'}}
                                            lineHeight={{
                                                base: '20px',
                                                lg: '150%',
                                            }}
                                            color='#141516'
                                            w={{base: '180px'}}
                                        >
                                            {detail}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={{base: '3.4rem', lg: '0'}} w={{lg: '704px'}}>
                        <Text
                            fontWeight='600'
                            fontSize={{base: '18px', lg: '24px'}}
                            lineHeight={{base: '22px', lg: '29px'}}
                            textAlign='justify'
                            color='#141516'
                        >
                            Get in touch
                        </Text>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type='text'
                                placeholder='Your name'
                                required={true}
                                className='contact-input'
                            />
                            <input
                                type='text'
                                placeholder='Your email'
                                required={true}
                                className='contact-input'
                            />
                            <textarea
                                cols={30}
                                rows={10}
                                placeholder='Your message'
                                required={true}
                            ></textarea>
                            <Box
                                display={'flex'}
                                justifyContent={{
                                    base: 'center',
                                    sm: 'flex-start',
                                    lg: 'flex-end',
                                }}
                                className={'button-container'}
                                mt={{base: '.7rem'}}
                            >
                                <button type='submit'>send message</button>
                            </Box>
                        </form>
                    </Box>
                </Box>
                <Box
                    fontWeight='500'
                    fontSize={{base: '14px', lg: '16px'}}
                    lineHeight='150%'
                    color='#141516'
                    mt={{base: '4rem'}}
                >
                    <Box
                        height={{lg: '1px'}}
                        backgroundColor='#C9C9C9'
                        display={{base: 'none', lg: 'block'}}
                    ></Box>
                    <Text textAlign={'center'} mt={{lg: '1.5rem'}}>
                        ©2022 Clique Ltd, All rights reserved
                    </Text>
                </Box>
            </Box>
            <Sidebar
                setShowSideBar={setShowSideBar}
                showSideBar={showSideBar}
            />
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
