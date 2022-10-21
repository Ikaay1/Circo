import { Box, Text } from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";
import React from "react";
import Account from "./Account";
import CommunityGuidlines from "./CommunityGuidlines";
import CopyrightPolicy from "./CopyrightPolicy";
import Faq from "./Faq";
import Notification from "./Notification";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsService from "./TermsService";

export type SettingsProps = {
  current: string;
};

function Index({ current }: SettingsProps) {
  let active;
  switch (current) {
    case "account":
      active = <Account />;
      break;
    case "notification":
      active = <Notification />;
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
    <Box height={"100%"} overflowY="scroll" sx={scrollBarStyle}>
      <Box
        borderBottom={"1px solid #232323"}
        height="12vh"
        paddingLeft={"5"}
        py="6"
        mb="3"
      >
        <Text>Settings</Text>
      </Box>
      <Box pl="223px">{active}</Box>
    </Box>
  );
}

export default Index;
