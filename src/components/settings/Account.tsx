import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';

import {
	Avatar,
	Box,
	Divider,
	Flex,
	Link,
	Text,
	WrapItem,
} from '@chakra-ui/react';

type Props = {};

function Account({}: Props) {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();

  return (
    <Box>
      <Text fontSize={'smSubHead'} mb='3'>
        Profile
      </Text>
      <Text fontSize={'subHead'} mb='2.5'>
        Choose how you appear and what you see on Circo
      </Text>
      <Text fontSize={'xsl'} mb='1.5'>
        You are signed in to circo as
        <span style={{color: '#3088D9'}}> {userProfile?.email}</span>
      </Text>

      <Link href='/deleteAccount'>
        <Box
          color='clique.red'
          fontSize={'smSubHead'}
          _hover={{textDecoration: 'none'}}
        >
          Delete account
        </Box>
      </Link>

      <Divider mt='1.5' mb='3'></Divider>
      <Text fontSize={'smSubHead'} mb='3'>
        Your Circo Channel
      </Text>
      <Text fontSize={'subHead'} mb='3.5'>
        This is your public presence on Circo. You need your own channel to
        upload videos and go live.
      </Text>
      <Flex>
        <WrapItem>
          <Avatar
            p='0'
            size='md'
            src={userProfile?.photo}
            name={userProfile?.firstName + ' ' + userProfile?.lastName}
          />
        </WrapItem>

        <Flex flexDirection={'column'} ml='5' pt='3.5' fontSize={'smSubHead'}>
          <Text mb='2'>
            {userProfile?.firstName + ' ' + userProfile?.lastName}
          </Text>
          {/*
          <NextLink href="" passHref>
            <Link
              mb="2"
              color="clique.tertiary"
              _hover={{ textDecoration: "none" }}
            >
              Create your channel
            </Link>
          </NextLink> */}

          <NextLink href='/myChannel/edit' passHref>
            <Link
              mb='2'
              color='clique.tertiary'
              _hover={{textDecoration: 'none'}}
            >
              Channel status and settings
            </Link>
          </NextLink>

          <Link href='/deleteAccount'>
            <Box color='clique.red' mb='2' _hover={{textDecoration: 'none'}}>
              Delete account
            </Box>
          </Link>
        </Flex>
      </Flex>

      <Divider mb='2'></Divider>
      <Text fontSize={'smSubHead'} mb='3'>
        Subscriptions
      </Text>
      <Text fontSize={'smSubHead'} mb='3'>
        Channels you are subscribed to show on your feed and you have access to
        their videos and live shows.
      </Text>

      <NextLink href='/profile/content' passHref>
        <Link color='clique.tertiary' _hover={{textDecoration: 'none'}}>
          View subscriptions
        </Link>
      </NextLink>
    </Box>
  );
}

export default Account;
