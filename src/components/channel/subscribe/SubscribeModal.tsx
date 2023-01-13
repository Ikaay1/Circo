import {
	Box,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	SkeletonText,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import GoodIcon from '@icons/WalletIcon copy';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  isLoading: boolean;
  bio: string;
  fee: number;
  info: string;
  status?: {
    isLoading: boolean;
  };
};

function SubscribeModal({
  isOpen,
  onClose,
  onClick,
  isLoading,
  bio,
  fee,
  info,
  status,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue('clique.white', 'clique.ashGrey')}
        // borderColor='clique.black'
        borderRadius='xl'
        pt='3'
        pb='10'
        w={{base: '100%'}}
      >
        <ModalHeader alignSelf='center' mb='2' fontSize={'smHead'}>
          Subscription
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={'column'}>
            <Text
              fontSize={'subHead'}
              fontWeight='400'
              mb='5'
              textAlign={'center'}
              noOfLines={3}
            >
              {isLoading ? (
                <SkeletonText
                  mb='5'
                  noOfLines={3}
                  spacing='3'
                  height={'30px'}
                />
              ) : (
                bio
              )}
            </Text>

            {info?.split('\n').map((each) => {
              if (each.trim().length) {
                return <HighLight text={each} key={each} />;
              }
            })}
            {!isLoading && (
              <Box sx={{paddingRight: '100px', paddingLeft: '100px'}} mt='10'>
                <Btn
                  text={fee ? `Pay ₦${fee}` : 'Pay ₦0'}
                  style={{width: '100%'}}
                  py='6'
                  bg='clique.base'
                  onClick={onClick}
                  isLoading={status?.isLoading}
                ></Btn>
              </Box>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SubscribeModal;

const HighLight = ({text}: {text: string}) => {
  return (
    <Flex width='100%' justifyItems='center' mb='2'>
      <Icon as={GoodIcon} fontSize='10' my='auto' />
      <Text ml='2'>{text}</Text>
    </Flex>
  );
};

const HighLightArray = [
  'Exclusive Training Videos',
  'Exclusive Live shows',
  'Access to my inner circle *wink*',
  'Weekly vlog video updates',
  'Exclusive fashion update from top brands',
];
