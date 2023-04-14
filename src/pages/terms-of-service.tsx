import React from 'react';

import {Box, Image, Text} from '@chakra-ui/react';
import Footer from '@components/privacyPolicy/Footer';
import IntroductionFormat from '@components/privacyPolicy/IntroductionFormat';
import OrderedListWithoutTitle from '@components/privacyPolicy/OrderedListWithoutTitle';

const TermsOfService = () => {
  return (
    <Box bg='clique.white' p='6.5rem'>
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
        Terms of Service for Circo
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
        <IntroductionFormat
          text={'Our Service'}
          description={
            'The Service allows you to discover, watch and subscribe to content you enjoy. We act as a distribution platform for creators’ original content and advertisers.'
          }
          mt='2.5rem'
        />
        <OrderedListWithoutTitle
          text='Use of Our Service'
          description='You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to:'
          array={[
            'Use our Service in any way that violates applicable laws or regulations;',
            'Engage in any fraudulent or deceptive activities;',
            'Use the service if of the age of 13 and above but if younger, you may use the service by the authorisation and supervision of a Parent or Legal Guardian.',
            'Impersonate any person or entity;',
            'Transmit any viruses or other harmful code;',
            'Interfere with the operation of our Service;',
            'Engage in any activity that imposes an unreasonable burden on our Service;',
            'Use any robot, spider, or other automatic device or process to access our Service for any purpose.',
          ]}
        />
        <IntroductionFormat
          text={'Account Registration'}
          description={
            'To use our Service, you will need to create an account. You agree to provide accurate and complete information when registering for an account. You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized use of your account.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Intellectual Property'}
          description={
            'Our Service and all content included in or made available through our Service, including text, graphics, images, and software, are the property of Circo or our licensors and are protected by copyright and other intellectual property laws.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Feedback'}
          description={
            'If you provide feedback, suggestions, or ideas about our Service, you agree that we may use such feedback, suggestions, or ideas without compensation or attribution to you.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Termination'}
          description={
            'We may terminate your access to our Service at any time for any reason without notice. Upon termination, you must immediately cease all use of our Service and delete any content that you have downloaded or otherwise obtained through our Service.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Disclaimer of Warranties'}
          description={
            'Our Service is provided "as is" and without warranties of any kind, whether express or implied. We do not warrant that our Service will be uninterrupted or error-free, or that any defects will be corrected. You use our Service at your own risk.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Limitation of Liability'}
          description={
            'In no event shall Circo or our affiliates, directors, officers, employees, agents, or licensors be liable for any damages, including but not limited to, lost profits or revenues, business interruption, or any indirect, consequential, incidental, special, or punitive damages arising out of or related to your use of our Service, even if we have been advised of the possibility of such damages.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Indemnification'}
          description={
            "You agree to indemnify, defend, and hold harmless Circo and our affiliates, directors, officers, employees, agents, and licensors from any claims, liabilities, damages, and expenses (including reasonable attorneys' fees) arising out of or related to your use of our Service or any violation of these Terms."
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Governing Law'}
          description={
            'These Terms shall be governed by and construed in accordance with the laws of Mauritius. Any disputes arising out of or related to these Terms shall be resolved in the courts of Mauritius.'
          }
          mt='2.5rem'
        />
        <IntroductionFormat
          text={'Changes to these Terms'}
          description={
            'We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on our website or through other communication channels.'
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

export default TermsOfService;
