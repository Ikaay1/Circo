import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Index from '@components/channel';
import UnsubscribeModal from '@components/channel/subscribe/UnsubscribeModal';
import Header from '@components/widgets/Header';
import SideMenu from '@components/widgets/sideMenu';
const SubscribeChannel = () => {
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


  return (
    <Box bg={useColorModeValue('clique.primaryBg', 'clique.primaryBg')}>
      <Header upload={onOpen} />
      <Box h={{lg: '90vh'}} display='flex'>
        <Box flex='1.3' h='100%'>
          <SideMenu />
        </Box>
        <Box flex='5.5' h='100%'>
          <Index />
        </Box>
      </Box>
      <UnsubscribeModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  );
};

export default SubscribeChannel;
