import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'redux/app/hooks';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import SmallMenu from './SmallMenu';

function RecordingCard({event}: {event: any}) {
  const router = useRouter();
  const profile = useAppSelector((store) => store.app.userReducer.userProfile);
  return (
    <Box>
      <Box
        cursor={'pointer'}
        w='full'
        onClick={() => {
          router.push(`/stream/${event?.eventId?._id}`);
        }}
      >
        <Box
          h={{base: '130px', mlg: '180px'}}
          bgImage={`url(${event?.eventId?.thumbNails[0]})`}
          bgSize='cover'
          bgPosition='center'
          rounded={'10px'}
        />
      </Box>

      <Flex mt='15px' justifyContent={'space-between'}>
        <Flex>
          <Avatar
            size='sm'
            name={profile?.firstName + ' ' + profile?.lastName}
            borderColor='clique.greenYellow'
            cursor='pointer'
            mr={'10px'}
            src={profile?.photo}
            p='0'
          />
          <Box w='calc(100% - 40px)'>
            <Text
              noOfLines={1}
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'16px'}
              lineHeight={'1.2'}
            >
              {event?.eventId?.title}
            </Text>

            <Text
              mt='5px'
              noOfLines={2}
              color={'clique.darkGrey'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'14px'}
              lineHeight={'1.2'}
            >
              @{profile?.userName}
            </Text>
            <Flex alignItems={'center'} mt='5px'>
              <Text
                noOfLines={2}
                color={'clique.darkGrey'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={'1.2'}
                mr='10px'
              >
                {event?.viewsCount} views
              </Text>
              <Text
                pos={'relative'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: 0,
                  width: '4px',
                  background: 'clique.darkGrey',
                  height: '4px',
                  rounded: 'full',
                }}
                pl='10px'
                noOfLines={2}
                color={'clique.darkGrey'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={'1.2'}
              >
                {moment(event?.createdAt).fromNow()}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <SmallMenu streamId={event?._id} />
      </Flex>
    </Box>
  );
}

export default RecordingCard;
