import Link from 'next/link';
import React, {useState} from 'react';
import {usePostTicketFromLandingMutation} from 'redux/services/tickets.service';

import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {contactInfoData, footerOthersData} from '@constants/utils';

import {scrollBarStyle} from '../../constants/utils';

const Footer = () => {
  const [postTicket, postTicketStatus] = usePostTicketFromLandingMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const toast = useToast();

  const handlePostTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await postTicket({name, email, reason});
    if ('data' in res) {
      toast({
        title: 'Success',
        description: 'Message successfully sent',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      console.log(res?.error);
      toast({
        title: 'Error',
        description: res?.error?.data?.message || 'Something went wrong',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box display={{lg: 'flex'}} justifyContent={{lg: 'space-between'}}>
        <Box>
          {/* <Box
            display={'flex'}
            alignItems='center'
            fontWeight={'700'}
            fontSize={{base: 'subHead', lg: 'smHead2'}}
            letterSpacing={{
              base: '0.500386px',
              lg: '0.709173px',
            }}
            color='clique.black3'
          >
            <Image
              src='/assets/Circo-05.svg'
              // src='/assets/clique-logo.png'
              border={'1px solid red'}
              alt='clique-logo'
              w={{base: '32.02px', lg: '45.39px'}}
              h={{base: '36.16px', lg: '51.24px'}}
            />
            <Link href='/'>CIRCO</Link>
          </Box> */}
          <Box w='200px' cursor={'pointer'} maxW='200px' minW='200px'>
            <Image alt='circo logo' w='100px' src='/assets/Circo.png' />
          </Box>
          <Text
            fontSize={{base: 'smSubHead', lg: 'smHead'}}
            lineHeight={{base: '20px', lg: '150%'}}
            color='clique.black2'
            mt={{base: '.85rem'}}
            w={{base: '180px'}}
          >
            Streaming and Video platform
          </Text>
          <Box display={'flex'} mt={{base: '.85rem'}}>
            <Image marginRight={'2rem'} src='/assets/instagram.png' alt='' />
            <a
              href='https://web.facebook.com/profile.php?id=100089370518977'
              target={'_blank'}
              rel='noreferrer'
            >
              <Image src='/assets/fb.png' alt='' />
            </a>
          </Box>
        </Box>
        <Box w={{lg: '180px'}} mt={{base: '3.8rem', lg: '0'}}>
          <Box>
            <Text
              fontWeight='600'
              fontSize={{base: 'sm2', lg: 'head'}}
              lineHeight={{base: 'smHead2', lg: 'bigHead'}}
              textAlign='justify'
              color='clique.black2'
            >
              Contact Info
            </Text>
            <Box>
              {contactInfoData.map(({image, detail}, i) => (
                <Box display={'flex'} mt='1.2rem' key={image}>
                  <Image
                    src={`/assets/${image}.png`}
                    //
                    mr='1.2rem'
                    alt=''
                    h={{base: '100%'}}
                  />
                  <Text
                    fontSize={{
                      base: 'smSubHead',
                      lg: 'subHead',
                    }}
                    fontWeight={{lg: '500'}}
                    lineHeight={{
                      base: '20px',
                      lg: '150%',
                    }}
                    color='clique.black2'
                    w={{
                      base: '180px',
                      // lg: i === 2 ? '110px' : '180px',
                      // xl: '180px',
                    }}
                  >
                    {detail}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box mt={{lg: '3.5rem'}} display={{base: 'none', lg: 'block'}}>
            <Text
              fontWeight='600'
              fontSize={{base: 'sm2', lg: 'head'}}
              lineHeight={{base: '22px', lg: '29px'}}
              textAlign='justify'
              color='clique.black2'
            >
              Others
            </Text>
            <Box>
              {footerOthersData.map(({key, detail}) => (
                <Box display={'flex'} mt='1.2rem' key={key}>
                  <Text
                    fontSize={{
                      base: 'smSubHead',
                      lg: 'subHead',
                    }}
                    fontWeight={{lg: '500'}}
                    lineHeight={{
                      base: '20px',
                      lg: '150%',
                    }}
                    color='clique.black2'
                    w={{base: '180px'}}
                  >
                    {detail}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box mt={{base: '3.4rem', lg: '0'}} w={{lg: '650px', xl: '720px'}}>
          <Text
            fontWeight='600'
            fontSize={{base: 'sm2', lg: 'head'}}
            lineHeight={{base: '22px', lg: '29px'}}
            textAlign='justify'
            color='clique.black2'
          >
            Get in touch
          </Text>
          <form onSubmit={(e) => handlePostTicket(e)}>
            <input
              type='text'
              placeholder='Your name'
              required={true}
              className='contact-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='email'
              placeholder='Your email'
              required={true}
              className='contact-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              cols={30}
              rows={10}
              placeholder='Your message'
              required={true}
              sx={scrollBarStyle}
              border='none'
              outline='none'
              _focus={{boxShadow: 'none', border: 'none', outline: 'none'}}
              _active={{boxShadow: 'none', border: 'none', outline: 'none'}}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></Textarea>
            <Box
              display={'flex'}
              justifyContent={{
                base: 'center',
                sm: 'flex-start',
                lg: 'flex-start',
              }}
              className={'button-container'}
              mt={{base: '.7rem'}}
            >
              <Button
                isLoading={postTicketStatus.isLoading}
                type='submit'
                fontSize='14px'
                lineHeight='20px'
                color='#ffffff'
                background='clique.base'
                borderRadius='30px'
                width={{base: '162px', lg: '221px'}}
                mt={{base: '.8rem', lg: '1.4rem'}}
                height='50px'
              >
                Send message
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Box
        fontWeight='500'
        fontSize={{base: 'smSubHead', lg: 'subHead'}}
        lineHeight='150%'
        color='clique.black2'
        mt={{base: '4rem'}}
      >
        <Box
          height={{lg: '1px'}}
          backgroundColor='clique.secondaryGrey5'
          display={{base: 'none', lg: 'block'}}
        ></Box>
        <Text textAlign={'center'} mt={{lg: '1.5rem'}}>
          ©2022 Circo Ltd, All rights reserved
        </Text>
      </Box>
    </>
  );
};

export default Footer;
