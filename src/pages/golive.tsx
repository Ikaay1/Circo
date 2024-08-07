import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import {Box, Button, Flex, Text} from '@chakra-ui/react';
import EventTab from '@components/golive/EventTab';
import GoLiveTab from '@components/golive/GoLiveTab';
import LiveEventPage from '@components/golive/LiveEventPage';
import NewLiveTab from '@components/golive/NewLiveTab';
import SideMenu from '@components/golive/SideMenu';
import WebCamModal from '@components/golive/WebCamModal';
import Header from '@components/widgets/Header';
import Color from '@constants/color';
import {scrollBarStyle} from '@constants/utils';

type Props = {};

function Index({}: Props) {
  const router = useRouter();
  const [state, setState] = useState<string>('stream');
  const refreshed = router.query.refreshed;

  return (
    <HomeLayout>
      <Box minH={{lg: '90vh'}} display='flex' bg={Color().lightAndPrimary}>
        <Box flex='1' h='100%'>
          <SideMenu click={(route) => setState(route)} />
        </Box>
        <Box
          maxW={{base: '100%', lg: 'calc(100vw - 250px)'}}
          minW={{base: '100%', lg: 'calc(100vw - 250px)'}}
          px='30px'
          h='100%'
          maxH={{base: '', lg: '90vh'}}
          pb='12'
          overflowY={'scroll'}
          overflowX={'hidden'}
          sx={{
            ...scrollBarStyle,
          }}
        >
          <Flex
            display={{base: 'flex', lg: 'none'}}
            justifyContent={'space-between'}
            pb='20px'
          >
            <Button
              size={'sm'}
              onClick={() => setState('stream')}
              color={state === 'stream' ? 'clique.base' : Color().blackAndWhite}
            >
              Stream Now
            </Button>
            <Button
              size={'sm'}
              onClick={() => setState('liveevent')}
              color={
                state === 'liveevent' ? 'clique.base' : Color().blackAndWhite
              }
            >
              Schedule Stream
            </Button>
            <WebCamModal setState={setState} />
          </Flex>
          {refreshed === 'true' && state !== 'stream' && (
            <Box>
              <Text
                pt='20px'
                position={'relative'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Go Live
              </Text>
              <EventTab setState={setState} />
            </Box>
          )}
          {refreshed === 'truer' && state !== 'stream' && (
            <Box>
              <Text
                pt='20px'
                position={'relative'}
                color={Color().blackAndWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Stream
              </Text>{' '}
              <GoLiveTab state={state} />
            </Box>
          )}
          {state === 'stream' && (
            <Box>
              {' '}
              <Text
                pt='20px'
                position={'relative'}
                color={Color().blackAndWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Stream
              </Text>{' '}
              <GoLiveTab state={state} />
            </Box>
          )}
          {state === 'liveevent' && (
            <Box>
              <Text
                pt='20px'
                position={'relative'}
                color={Color().blackAndWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Live Event
              </Text>
              <LiveEventPage setState={setState} state={state} />
            </Box>
          )}
          {state === 'create' && (
            <Box>
              <Text
                pt='20px'
                position={'relative'}
                color={Color().blackAndWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Create Live Event
              </Text>
              <NewLiveTab setState={setState} state={state} />
            </Box>
          )}
          {state === 'viewevent' && (
            <Box>
              <Text
                pt='20px'
                position={'relative'}
                color={Color().blackAndWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
                fontSize='head'
                lineHeight={'1'}
              >
                Go Live
              </Text>
              <EventTab setState={setState} />
            </Box>
          )}
        </Box>
      </Box>
    </HomeLayout>
  );
}

export default Index;
export {getServerSideProps} from '../components/widgets/Chakara';
