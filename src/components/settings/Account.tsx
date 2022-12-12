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

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Box>
      <Text fontSize={'smSubHead'} mb='3'>
        Profile
      </Text>
      <Text fontSize={'subHead'} mb='2.5'>
        Choose how you appear and what you see on Clique
      </Text>
      <Text fontSize={'xsl'} mb='1.5'>
        You are signed in to clique as
        <span style={{color: '#3088D9'}}> {userProfile?.email}</span>
      </Text>

      <a
        href={'https://b24-i9fnco.bitrix24.site/crm_form_dzs40/'}
        target='_blank'
        rel='noreferrer'
      >
        <Box
          color='clique.red'
          fontSize={'smSubHead'}
          _hover={{textDecoration: 'none'}}
        >
          Delete account
        </Box>
      </a>

      <Divider mt='1.5' mb='3'></Divider>
      <Text fontSize={'smSubHead'} mb='3'>
        Your Clique Channel
      </Text>
      <Text fontSize={'subHead'} mb='3.5'>
        This is your public presence on Clique. You need your own channel to
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

          <NextLink href='/channel/1/edit' passHref>
            <Link
              mb='2'
              color='clique.tertiary'
              _hover={{textDecoration: 'none'}}
            >
              Channel status and settings
            </Link>
          </NextLink>

          <a
            target={'_blank'}
            href={'https://b24-i9fnco.bitrix24.site/crm_form_dzs40/'}
            rel='noreferrer'
          >
            <Box color='clique.red' mb='2' _hover={{textDecoration: 'none'}}>
              Delete account
            </Box>
          </a>
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

      <NextLink href='/profile/1/content' passHref>
        <Link color='clique.tertiary' _hover={{textDecoration: 'none'}}>
          View subscriptions
        </Link>
      </NextLink>
    </Box>
  );
}

export default Account;
