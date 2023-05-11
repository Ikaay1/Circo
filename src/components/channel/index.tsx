import {useRouter} from 'next/router';

import {Box} from '@chakra-ui/react';
import ChannelContents from '@components/channel/ChannelContents';
import CliqueLoader from '@components/home/CliqueLoader';
import {contentData, scrollBarStyle, scrollBarStyle3} from '@constants/utils';

import Analytics from './Analytics';
import Bio from './Bio';
import EditChannel from './EditChannel';
import UserDetail from './UserDetail';

const Index = ({
  channelData,
  data,
  channelLoading,
  isLoading,
  onClick,
  buttonText,
  lastElementRef,
  setContents,
  isFetching,
  date,
}: {
  channelData?: any;
  data?: contentData[];
  channelLoading?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  buttonText?: string;
  lastElementRef?: any;
  setContents?: any;
  isFetching?: boolean;
  date?: string;
}) => {
  const router = useRouter();
  const des =
    router.query.name === 'content' || router.pathname.includes('subscribe');

  return (
    <>
      {(isLoading && channelLoading) || (!data && !channelData) ? (
        <Box h='90vh' marginX='auto'>
          <CliqueLoader />
        </Box>
      ) : (
        <Box
          height={'100%'}
          overflowY='scroll'
          position={'relative'}
          pb='3rem'
          sx={scrollBarStyle3}
        >
          {router.query.name !== 'edit' && (
            <>
              <UserDetail
                data={channelData?.data?.channel}
                id={channelData?.data?.channel?.userId}
              />
              <Bio
                showSubscribe={router.query.name === 'analytics' ? false : true}
                bio={channelData?.data?.channel?.bio}
                id={channelData?.data?.channel?.userId}
                onClick={onClick as () => void}
                buttonText={buttonText}
                isFetching={isFetching}
                date={date}
              />
            </>
          )}

          {des && (
            <Box mt={{base: '1rem', lg: '6rem'}} px='1.35rem'>
              <ChannelContents
                videos={data}
                id={channelData?.data?.channel?.userId}
                isLoading={channelLoading as boolean}
                lastElementRef={lastElementRef}
                setContents={setContents}
              />
            </Box>
          )}

          {router.query.name === 'edit' && (
            <Box>
              <EditChannel data={channelData?.data?.channel} />
            </Box>
          )}

          {router.query.name === 'analytics' && (
            <Box mt={{base: '2.4rem', lg: '10rem'}} px='1.35rem'>
              <Analytics subscribe={channelData?.data?.channel?.subscribe} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Index;
