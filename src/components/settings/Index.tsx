import React, { Dispatch, SetStateAction } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { useGetPreferenceQuery } from 'redux/services/settings.service';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { scrollBarStyle } from '@constants/utils';

import Account from './Account';
import CommunityGuidlines from './CommunityGuidlines';
import CopyrightPolicy from './CopyrightPolicy';
import Faq from './Faq';
import Notification from './Notification';
import PrivacyPolicy from './PrivacyPolicy';
import TermsService from './TermsService';

function Index({
  current,
  onClick,
  showSideMenu,
  setShowSideMenu,
  setValue
}: {
  current: string;
  onClick: (code: string) => void;
  showSideMenu: boolean;
  setShowSideMenu: any;
  setValue: Dispatch<SetStateAction<string>>
}) {
  const { isLoading, data, isFetching } = useGetPreferenceQuery("");
  let active;
  switch (current) {
    case "account":
      active = <Account />;
      break;
    case "notification":
      active = (
        <Notification
          onClick={onClick}
          data={data?.data?.preference}
          isLoading={isLoading}
          isFetching={isFetching}
          setValue={setValue}
        />
      );
      break;
    case "copyright":
      active = <CopyrightPolicy />;
      break;
    case "terms":
      active = <TermsService />;
      break;
    case "guidlines":
      active = <CommunityGuidlines />;
      break;
    case "privacy":
      active = <PrivacyPolicy />;
      break;
    case "faqs":
      active = <Faq />;
      break;
    default:
      active = null;
  }
  return (
    <Box>
      <Flex
        borderBottom={"1px solid #232323"}
        height={{ base: "", lg: "12vh" }}
        paddingLeft={"5"}
        py={{ base: "20px", lg: "6" }}
        mb="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Settings</Text>
        <Flex
          pr="20px"
          display={{ base: "flex", lg: "none" }}
          onClick={() => setShowSideMenu(!showSideMenu)}
          alignItems="center"
        >
          <Icon as={AiFillSetting} mr="10px" fontSize="2xl" />
          <Text>Menu</Text>
        </Flex>
      </Flex>
      <Box
        pl={{ base: "20px", lg: "170px" }}
        pr="12"
        height={"100%"}
        overflowY="scroll"
        sx={scrollBarStyle}
      >
        {active}
      </Box>
    </Box>
  );
}

export default Index;
