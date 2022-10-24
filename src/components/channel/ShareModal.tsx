import React from 'react';

import {
	Box,
	Icon,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import { scrollBarStyle } from '@constants/utils';
import ShareIcon from '@icons/ShareIcon';

import CopyBox from './CopyBox';

const ShareModal = ({showSubscribe}: {showSubscribe: boolean}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
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
                        I am Ayra Star, a music artist with the best selling
                        album on Apple Music, and Spotify, titled “19 and
                        Undagelous”. I have toured 47 countries doing music
                        tours in cities likes LA, NYC, Texas, Toronto and many
                        more.
                    </Text>
                </Box>
                {showSubscribe && (
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
                        <AuthButton
                            width='180px'
                            height='50px'
                            borderRadius='30px'
                            fontSize='sm2'
                            name='Subscribe'
                        />
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

export default ShareModal;
