import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

import { contentData } from '../../constants/utils';

function DiscoverCard({video}: {video: contentData}) {
  const router = useRouter();
  console.log(video.uploader_id.firstName);
  return (
    <Box
      onClick={() =>
        router.push(`/player/${video._id}/${video.uploader_id._id}`)
      }
      cursor={'pointer'}
      h={{base: '190px', lg: '280px'}}
      bgImage={video.thumbNail}
      bgSize='cover'
      bgPosition={'center'}
      bgRepeat='no-repeat'
      rounded={'20px'}
    >
      <Box
        backgroundColor={'rgba(0, 0, 0, 0.6)'}
        px='30px'
        py='20px'
        h={{base: '190px', lg: '280px'}}
        w='100%'
        display={'flex'}
        flexDirection='column'
        justifyContent={'space-between'}
        rounded={'20px'}
      >
        <Text
          position={'relative'}
          w='60%'
          color={'clique.white'}
          fontFamily={'Poppins'}
          fontWeight={700}
          textTransform={'capitalize'}
          fontSize='bigHead'
          lineHeight={'1.2'}
          noOfLines={{base: 2, lg: 3}}
        >
          {video.title}
        </Text>{' '}
        <Flex>
          {video?.uploader_id?.photo ? (
            <AvataWithSpace
              mr='10px'
              name='Prosper Otemuyiwa'
              url={video.uploader_id.photo}
              size='60px'
              borderColor='clique.greenYellow'
              borderThickness='4px'
              avatarSize='45px'
            />
          ) : (
            <Avatar
              size='lg'
              name={
                video.uploader_id.firstName + ' ' + video.uploader_id.lastName
              }
              mr='10px'
              borderColor='clique.greenYellow'
            />
          )}

          <Box>
            <Text
              fontFamily={'Poppins'}
              fontSize='subHead'
              color={'clique.white'}
            >
              {video?.uploader_userName}
            </Text>
            <Flex mt='5px' alignItems={'center'}>
              <Text
                noOfLines={2}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'subHead'}
                lineHeight={'1.2'}
                mr='10px'
              >
                {video.view} {video.view > 1 ? 'views' : 'view'}
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
                  background: 'clique.lightGrey',
                  height: '4px',
                  rounded: 'full',
                }}
                pl='10px'
                noOfLines={2}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'subHead'}
                lineHeight={'1.2'}
              >
                {moment(video?.createdAt).fromNow()}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default DiscoverCard;
