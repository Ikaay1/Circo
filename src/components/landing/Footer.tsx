import Link from 'next/link';
import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { contactInfoData, footerOthersData } from '@constants/utils';

const Footer = () => {
  return (
    <>
      <Box display={{lg: 'flex'}} justifyContent={{lg: 'space-between'}}>
        <Box>
          <Box
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
              src='/assets/clique-logo.png'
              alt='clique-logo'
              w={{base: '32.02px', lg: '45.39px'}}
              h={{base: '36.16px', lg: '51.24px'}}
            />
            <Link href='/'>CLIQUE</Link>
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
            <Image src='/assets/fb.png' alt='' />
          </Box>
        </Box>
        <Box mt={{base: '3.8rem', lg: '0'}}>
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
              {contactInfoData.map(({image, detail}) => (
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
                    w={{base: '180px'}}
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
        <Box mt={{base: '3.4rem', lg: '0'}} w={{lg: '704px'}}>
          <Text
            fontWeight='600'
            fontSize={{base: 'sm2', lg: 'head'}}
            lineHeight={{base: '22px', lg: '29px'}}
            textAlign='justify'
            color='clique.black2'
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
                lg: 'flex-start',
              }}
              className={'button-container'}
              mt={{base: '.7rem'}}
            >
              <button type='submit'>Send message</button>
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
          ©2022 Clique Ltd, All rights reserved
        </Text>
      </Box>
    </>
  );
};

export default Footer;
