import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {BiDislike, BiLike} from 'react-icons/bi';
import {BsFillPlayFill, BsFullscreen, BsPauseFill} from 'react-icons/bs';
import {GoMute, GoUnmute} from 'react-icons/go';
import {MdFullscreenExit} from 'react-icons/md';
import {useAppSelector} from 'redux/app/hooks';
import {
  useDislikeContentMutation,
  useLikeContentMutation,
} from 'redux/services/content.service';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import CliqueGiftIcon from '@icons/CliqueGiftIcon';
import NextIcon from '@icons/NextIcon';
import OptionsIcon from '@icons/OptionsIcon';
import PrevIcon from '@icons/PrevIcon';

import GiftModal from './GiftModal';
import VideoOptionMenu from './VideoOptionMenu';

function ControlMobileAd() {
  return (
    <Grid
      templateColumns='repeat(7, 1fr)'
      mt='30px'
      justifyContent={'space-between'}
      alignItems='center'
    >
      <GridItem mr='.7rem' flex='1' justifySelf='start'>
        <Flex alignItems='center' mr='3px' ml={'3px'}>
          {/* <Text
              w='12px'
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1'}
            ></Text> */}
          <Text
            color={'clique.white'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'smSubHead'}
            lineHeight={'1'}
          >
            00:00/
            <br />
            00:00
          </Text>
          <Icon
            fontSize='smHead'
            cursor={'pointer'}
            color={'clique.white'}
            as={GoUnmute}
            mx='7px'
          />
          {/* <Icon
              fontSize='smHead'
              cursor={'pointer'}
              color={'clique.white'}
              as={GoMute}
              mx='7px'
            /> */}{' '}
          <Flex alignItems='center'>
            <Flex alignItems={'center'} flexDirection={'column'} mx={'3px'}>
              <Box>
                <Icon color={'clique.white'} fontSize='head' as={BiLike} />
              </Box>

              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                6
              </Text>
            </Flex>

            <Flex alignItems={'center'} flexDirection={'column'}>
              <Box>
                <Icon color={'clique.white'} fontSize=' head' as={BiDislike} />
              </Box>
              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                8
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem justifySelf='center' mr='.7rem' flex='1'>
        <Flex alignItems='center'>
          <Icon
            fontSize='bigHead'
            cursor='pointer'
            as={PrevIcon}
            color={'clique.white'}
            h='100%'
          />

          {/* <Icon
              fontSize='35px'
              cursor='pointer'
              color={'clique.white'}
              as={BsPauseFill}
            /> */}

          <Icon
            fontSize='bigHead'
            cursor='pointer'
            color={'clique.white'}
            as={BsFillPlayFill}
            h='100%'
          />

          <Icon
            fontSize='30px'
            cursor='pointer'
            as={NextIcon}
            color={'clique.white'}
            h='100%'
          />
        </Flex>
      </GridItem>
      <GridItem flex='1' justifySelf='end'>
        <Flex alignItems='center'>
          {/* <GiftModal isFullScreen={isFullScreen} video={video} /> */}
          <Tooltip
            label='Gift'
            bg='none'
            hasArrow
            color='clique.white'
            fontSize='sm'
            p='0'
            mt='0'
            placement='top'
          >
            <span>
              <Icon
                fontSize='bigHead'
                cursor={'pointer'}
                color={'clique.white'}
                as={CliqueGiftIcon}
              />
            </span>
          </Tooltip>

          {/* <VideoOptionMenu player={playerRef} video={video} /> */}
          <Icon
            fontSize='28px'
            mx={{base: '10px', lg: '30px'}}
            cursor={'pointer'}
            as={OptionsIcon}
            color={'clique.white'}
          />

          <Icon
            fontSize='smHead'
            cursor={'pointer'}
            color={'clique.white'}
            as={BsFullscreen}
          />

          {/* <Icon
              fontSize='smHead'
              cursor={'pointer'}
              color={'clique.white'}
              as={MdFullscreenExit}
            /> */}
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default ControlMobileAd;
