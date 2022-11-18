import { useRouter } from 'next/router';
import { useGetIndividualChannelQuery } from 'redux/services/channel.service';
import { useGetSingleUserContentQuery } from 'redux/services/content.service';

import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Index from '@components/channel';
import Header from '@components/widgets/Header';
import SideMenu from '@components/widgets/sideMenu';

const SubscribeChannel = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const {
    isLoading: channelLoading,
    isFetching,
    data: channelData,
  } = useGetIndividualChannelQuery(id);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const {
    isOpen: isBeneIsOpen,
    onOpen: isBeneOnOpen,
    onClose: isBeneOnClose,
  } = useDisclosure();

  const {
    isOpen: isSortIsOpen,
    onOpen: isSortOnOpen,
    onClose: isSortOnClose,
  } = useDisclosure();

  const {
    isOpen: isReceiptIsOpen,
    onOpen: isReceiptOnOpen,
    onClose: isReceiptOnClose,
  } = useDisclosure();

  const {data, isLoading} = useGetSingleUserContentQuery(id);

  return (
    <Box bg={useColorModeValue('clique.primaryBg', 'clique.primaryBg')}>
      <>
        <Header upload={onOpen} />
        <Box h={{lg: '90vh'}} display='flex'>
          <Box flex='1.3' h='100%'>
            <SideMenu />
          </Box>
          <Box flex='5.5' h='100%'>
            <Index
              channelData={channelData}
              data={data}
              channelLoading={channelLoading}
              isLoading={isLoading}
            />
          </Box>
        </Box>
        {/* <UnsubscribeModal isOpen={false} onClose={onClose} /> */}
      </>
    </Box>
  );
};

export default SubscribeChannel;
