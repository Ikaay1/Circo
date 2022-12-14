import React from 'react';
import { useGetPreferenceQuery } from 'redux/services/settings.service';

import { Box, Text } from '@chakra-ui/react';
import { scrollBarStyle } from '@constants/utils';

import Account from './Account';
import CommunityGuidlines from './CommunityGuidlines';
import CopyrightPolicy from './CopyrightPolicy';
import Faq from './Faq';
import Notification from './Notification';
import PrivacyPolicy from './PrivacyPolicy';
import TermsService from './TermsService';

export type SettingsProps = {
  current: string;
  onClick: (code: string) => void;
};

function Index({current, onClick}: SettingsProps) {
  const {isLoading, data} = useGetPreferenceQuery('');
  let active;
  switch (current) {
    case 'account':
      active = <Account />;
      break;
    case 'notification':
      active = (
        <Notification
          onClick={onClick}
          data={data?.data?.preference}
          isLoading={isLoading}
        />
      );
      break;
    case 'copyright':
      active = <CopyrightPolicy />;
      break;
    case 'terms':
      active = <TermsService />;
      break;
    case 'guidlines':
      active = <CommunityGuidlines />;
      break;
    case 'privacy':
      active = <PrivacyPolicy />;
      break;
    case 'faqs':
      active = <Faq />;
      break;
    default:
      active = null;
  }
  return (
    <Box>
      <Box
        borderBottom={'1px solid #232323'}
        height='12vh'
        paddingLeft={'5'}
        py='6'
        mb='3'
      >
        <Text>Settings</Text>
      </Box>
      <Box
        pl='170px'
        pr='12'
        height={'100%'}
        overflowY='scroll'
        sx={scrollBarStyle}
      >
        {active}
      </Box>
    </Box>
  );
}

export default Index;
