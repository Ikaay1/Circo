import React from 'react';

import {
  Box,
  Divider,
  Flex,
  Image,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react';
import Footer from '@components/privacyPolicy/Footer';
import IntroductionFormat from '@components/privacyPolicy/IntroductionFormat';
import OrderedListWithoutTitle from '@components/privacyPolicy/OrderedListWithoutTitle';
import OrderedListWithTitle from '@components/privacyPolicy/OrderedListWithTitle';

const PrivacyPolicy = () => {
  return (
    <Box
      bg='clique.white'
      p={{base: '.8rem', lg: '6.5rem'}}
      color='clique.black'
    >
      <Image
        src='/assets/Circo.png'
        alt='circo logo'
        width='115px'
        height='30px'
        cursor={'pointer'}
        ml='auto'
      />
      <Text
        textAlign={'center'}
        fontSize='20px'
        color='purple'
        fontWeight={'500'}
        mt='3rem'
      >
        Privacy Policy for Circo
      </Text>
      <Text mt='1rem' textAlign={'right'}>
        Effective Date: 14/04/2023
      </Text>
      <Box>
        <IntroductionFormat
          text={'Introduction'}
          description={
            'Circo ("we," "us," or "our") values your privacy and is committed to protecting your personal information. This Privacy Policy ("Policy") explains how we collect, use, and share information from users of our subscription-based platform ("Service"). By accessing or using our Service, you agree to the terms of this Policy and our Terms of Service.'
          }
        />
        <OrderedListWithTitle
          text='Information We Collect'
          description='We may collect various types of information from and about you,
            including:'
          array={[
            'Personal Information: We may collect personal information that identifies you, such as your name, email address, physical address, phone number, and payment information.',
            'Usage Data: We may collect data about how you access and use our Service, including IP address, device type, browser type, and operating system.',
            'User Content: We may collect content that you upload or post to our Service, including photos, videos, and comments.',
            'Cookies and Similar Technologies: We may use cookies and similar technologies to collect information about your browsing activities, preferences, and interests.',
          ]}
        />
        <OrderedListWithoutTitle
          text='How We Use Information'
          description='We may use the information we collect for the following purposes:'
          array={[
            'To provide and improve our Service;',
            'To personalize your experience and tailor content and advertising to your interests;',
            'To communicate with you about our Service, promotions, and other news;',
            'To respond to your requests and inquiries;',
            'To enforce our Terms of Service and other policies;',
            'To comply with legal obligations.',
          ]}
        />
        <OrderedListWithTitle
          text='How We Share Information'
          description='We may share your information with third parties in the following circumstances:'
          array={[
            'Service Providers: We may share your information with third-party service providers who help us provide and improve our Service, including payment processors, hosting providers, and analytics providers.',
            'Advertising Partners: We may share information with advertising partners to display targeted advertising.',
            'Legal Requirements: We may disclose your information to comply with legal obligations or respond to law enforcement requests.',
            'Business Transactions: We may transfer your information in connection with a merger, acquisition, or sale of assets.',
          ]}
        />
        <IntroductionFormat
          text={'Your Choices'}
          description={
            'You may update or delete your account information at any time. You may also opt-out of receiving marketing communications from us by following the instructions in the communication.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Security'}
          description={
            'We take reasonable measures to protect the security of your information. However, no data transmission over the internet or electronic storage can be guaranteed to be completely secure. You use our Service at your own risk.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'International Transfers'}
          description={
            'Your information may be transferred to and processed in countries other than your own. By using our Service, you consent to the transfer of your information to countries outside your own.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={"Children's Privacy"}
          description={
            'Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under the age of 18.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Changes to this Policy'}
          description={
            'We may update this Policy from time to time. We will notify you of any material changes by posting the updated Policy on our website or through other communication channels.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Contact Us'}
          description={
            'If you have any questions or concerns about this Policy or our data practices, please contact us at '
          }
          mt='2.5rem'
          email={'admin@circo.africa'}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;
