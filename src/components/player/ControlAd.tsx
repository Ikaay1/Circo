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

function ControlAd() {
  return (
    <>
      <Grid
        alignItems='center'
        templateColumns='repeat(7, 1fr)'
        px='30px'
        py='25px'
        gap={4}
      >
        <GridItem colSpan={2}>
          <Flex alignItems='center' pos='relative'>
            {/* <Text
              mt='5px'
              minW={'100px'}
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1'}
              mr='30px'
            ></Text> */}

            <Text
              mt='5px'
              minW={'100px'}
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1'}
              mr='30px'
            >
              00:00/00:00
            </Text>

            <Tooltip
              label='Mute'
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
                  fontSize='smHead'
                  cursor={'pointer'}
                  as={GoUnmute}
                  color={'clique.white'}
                />
              </span>
            </Tooltip>

            {/* <Tooltip
                label="Unute"
                bg="none"
                hasArrow
                color="clique.white"
                fontSize="sm"
                p="0"
                mt="0"
                placement="top"
              >
                <span>
                  <Icon
                    fontSize="smHead"
                    cursor={"pointer"}
                    as={GoMute}
                    color={"clique.white"}
                  />
                </span>
              </Tooltip> */}

            <Flex ml='30px' alignItems={'center'}>
              <Flex
                minW='40px'
                flexDir='column'
                justify={'center'}
                cursor={'pointer'}
                alignItems={'center'}
              >
                <Box>
                  <Tooltip
                    label='Like'
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
                        color={'clique.white'}
                        fontSize='head'
                        as={BiLike}
                      />
                    </span>
                  </Tooltip>
                </Box>
                <Text
                  color={'clique.white'}
                  fontFamily={'Poppins'}
                  fontWeight={400}
                  fontSize={'smSubHead'}
                  lineHeight={'1.2'}
                >
                  5
                </Text>
              </Flex>

              <Flex
                minW='40px'
                flexDir='column'
                justify={'center'}
                cursor={'pointer'}
                mx='10px'
                alignItems={'center'}
              >
                <Box>
                  <Tooltip
                    label='Unlike'
                    bg='none'
                    hasArrow
                    color='clique.white'
                    fontSize='sm'
                    p='0'
                    mt='0'
                    placement='top'
                  >
                    <span>
                      <Icon mr='5px' fontSize=' head' as={BiDislike} />
                    </span>
                  </Tooltip>
                </Box>
                <Text
                  color={'clique.white'}
                  fontFamily={'Poppins'}
                  fontWeight={400}
                  fontSize={'smSubHead'}
                  lineHeight={'1.2'}
                >
                  7
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} justifySelf='center' h='35px'>
          <Flex alignItems='center'>
            <Tooltip
              label='Back'
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
                  cursor='pointer'
                  as={PrevIcon}
                  color={'clique.white'}
                />
              </span>
            </Tooltip>

            {/* <Tooltip
              label='Pause'
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
                  fontSize='35px'
                  cursor='pointer'
                  as={BsPauseFill}
                  color={'clique.white'}
                  mx='20px'
                />
              </span>
            </Tooltip> */}

            <Tooltip
              label='Play'
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
                  cursor='pointer'
                  as={BsFillPlayFill}
                  color={'clique.white'}
                  mx='20px'
                />
              </span>
            </Tooltip>

            <Tooltip
              label='Next'
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
                  fontSize='30px'
                  cursor='pointer'
                  as={NextIcon}
                  color={'clique.white'}
                />
              </span>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem colSpan={2} justifySelf='end'>
          <Flex alignItems='center' h='100%'>
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
              h='100%'
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

            {/* <VideoOptionMenu
              isLoop={isLoop}
              setIsLoop={setIsLoop}
              player={playerRef}
              video={video}
            /> */}
            <Icon
              fontSize='28px'
              mx={{base: '10px', lg: '30px'}}
              cursor={'pointer'}
              as={OptionsIcon}
              color={'clique.white'}
            />

            <Tooltip
              label='Fullscreen'
              bg='none'
              hasArrow
              color='clique.white'
              fontSize='sm'
              p='0'
              mt='0'
              placement='top'
              h='100%'
            >
              <span>
                <Icon
                  fontSize='smHead'
                  cursor={'pointer'}
                  as={BsFullscreen}
                  color={'clique.white'}
                />
              </span>
            </Tooltip>

            {/* <Tooltip
                label="Normal"
                bg="none"
                hasArrow
                color="clique.white"
                fontSize="sm"
                p="0"
                mt="0"
                placement="top"
              >
                <span>
                  <Icon
                    fontSize="smHead"
                    cursor={"pointer"}
                    color={"clique.white"}
                    as={MdFullscreenExit}
                  />
                </span>
              </Tooltip> */}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default ControlAd;
