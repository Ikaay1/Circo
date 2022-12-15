import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';

import {
	Box,
	Icon,
	Modal,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import ShareIcon from '@icons/ShareIcon';

import CopyBox from './CopyBox';

const Bio = ({
  showSubscribe,
  bio,
  id,
  onClick,
  buttonText,
  isFetching,
}: {
  showSubscribe: boolean;
  bio?: string;
  id: string;
  onClick: () => void;
  buttonText?: string;
  isFetching?: boolean;
}) => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [state, setState] = useState('');

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <>
      <Box
        mt={'1.4rem'}
        ml='1rem'
        mr={'2rem'}
        display='flex'
        justifyContent={'space-between'}
        alignItems='flex-start'
      >
        <Box w='40%'>
          <Text
            fontWeight='600'
            fontSize='subHead'
            lineHeight='24px'
            color='clique.secondaryGrey2'
          >
            Bio
          </Text>
          <Text
            fontWeight='400'
            fontSize='smSubHead'
            lineHeight='24px'
            color='clique.secondaryGrey2'
            pr='1rem'
          >
            {bio}
          </Text>
        </Box>
        {showSubscribe && (
          <Box>
            <Box display={'flex'} alignItems='center'>
              <Box
                mr='.5rem'
                cursor='pointer'
                onClick={() => {
                  onOpen();
                }}
              >
                <Icon as={ShareIcon} />
              </Box>
              {userProfile?._id === id ? null : (
                <AuthButton
                  width='180px'
                  height='50px'
                  borderRadius='30px'
                  fontSize='sm2'
                  name={isFetching ? <Spinner /> : buttonText}
                  onClick={onClick}
                  bg={
                    buttonText === 'Subscribed' || isFetching
                      ? 'clique.grey'
                      : 'clique.purple'
                  }
                  cursor={buttonText === 'Subscribed' && 'default'}
                />
              )}
            </Box>
            {router.asPath !== '/channel/1/content' && (
              <Text
                w='190px'
                textAlign={'right'}
                fontSize={'smSubHead'}
                color={'clique.secondaryRed'}
                mt='.4rem'
              >
                Your subscription expires 1 month after you subscribe
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position='absolute'
            left={'50%'}
            transform={'translate(-50%, 60%)'}
          >
            <CopyBox />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bio;
