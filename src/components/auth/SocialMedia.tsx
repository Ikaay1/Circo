import Link from 'next/link';
import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import Color from '@constants/color';
import { socialMediaIconsData } from '@constants/utils';

export const SocialMedia = ({
  haveAccount,
  text,
}: {
  haveAccount: string;
  text: string;
}) => {
  return (
    <Box marginTop={'2.5rem'}>
      <Text textAlign={'center'}>Or</Text>
      <Box marginTop={'2.5rem'} display={'flex'} justifyContent={'center'}>
        {socialMediaIconsData.map((iconData) => (
          <Box
            width='77px'
            height='77px'
            background='clique.secondaryGrey4'
            boxShadow='0px 2.8px 14px rgba(0, 0, 0, 0.25)'
            borderRadius='42px'
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
            marginRight={iconData !== 'facebook' ? '2.5rem' : ''}
            cursor='pointer'
            key={iconData}
          >
            <Image
              src={`/assets/${iconData}.png`}
              alt={`${iconData} icon`}
              width={'47px'}
              height={'47px'}
            />
          </Box>
        ))}
      </Box>
      <Box
        fontSize='sm2'
        color='clique.white'
        textAlign={'center'}
        marginTop={'1.7rem'}
      >
        <Text
          display={'inline'}
          marginRight='.25rem'
          color={Color().blackAndWhite}
        >
          {haveAccount}
        </Text>
        <span style={{color: '#892cdc'}}>
          <Link href={text === 'Login here' ? '/login' : '/signup'}>
            {text}
          </Link>
        </span>
      </Box>
    </Box>
  );
};

export default SocialMedia;
