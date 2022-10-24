import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBroadcast } from 'react-icons/bs';
import { MdAddCircleOutline, MdOutlineNotificationsNone } from 'react-icons/md';

import {
	Avatar,
	AvatarBadge,
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import UploadModal from '@components/upload/UploadModal';

type Props = {
    upload?: () => void;
};

function Header({upload}: Props) {
    const [searchWidth, setSearchWidth] = React.useState('300px');
    const router = useRouter();

    return (
        <Flex
            alignItems={'center'}
            justifyContent='space-between'
            bg={'clique.black'}
            px='50px'
            py='20px'
            h='10vh'
            minH={'10vh'}
            maxH={'10vh'}
            w='100%'
        >
            {/* First div  */}
            <Box
                w='200px'
                cursor={'pointer'}
                onClick={() => router.push('/home')}
                maxW='200px'
                minW='200px'
            >
                <Image alt='clique logo' h='100%' src='/clique-logo.png' />
            </Box>

            {/* Second div */}
            <Flex
                w='full'
                px='30px'
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <InputGroup w={searchWidth} transition='all 1s ease'>
                    <InputLeftElement px='20px' pointerEvents='none'>
                        <Icon
                            fontSize={'smHead'}
                            color='clique.white'
                            as={AiOutlineSearch}
                        />
                    </InputLeftElement>
                    <Input
                        bg='clique.inputBg'
                        onFocus={() => setSearchWidth('500px')}
                        onBlur={() => setSearchWidth('300px')}
                        _focus={{
                            boxShadow: 'none',
                            border: ' 3px solid ',
                            borderColor: 'clique.inputBorder',
                        }}
                        border={' 3px solid '}
                        borderColor={'clique.inputBorder'}
                        rounded='full'
                        type='tel'
                        fontFamily={'Poppins'}
                        _placeholder={{
                            color: 'clique.white',
                        }}
                        placeholder='search'
                    />
                </InputGroup>
                <HStack alignItems={'center'}>
                    <Flex
                        alignItems={'center'}
                        justifyContent='center'
                        p='3px'
                        bg='clique.grey'
                        rounded='full'
                    >
                        <Avatar
                            p='0'
                            bg='clique.grey'
                            icon={
                                <Icon
                                    fontSize={'smHead2'}
                                    as={MdOutlineNotificationsNone}
                                />
                            }
                            size='sm'
                        >
                            <AvatarBadge
                                bg='clique.base'
                                top={'0'}
                                right={'5px'}
                                boxSize='12px'
                                border='none'
                                fontSize={'xs'}
                            >
                                3
                            </AvatarBadge>
                        </Avatar>
                    </Flex>
                    <Flex
                        alignItems={'center'}
                        justifyContent='center'
                        p='2px'
                        background='linear-gradient(90deg, rgba(137, 44, 220, 1), rgba(110, 147, 241, 1))'
                        rounded='full'
                    >
                        <Avatar
                            p='0'
                            size='sm'
                            name='Prosper Otemuyiwa'
                            src='https://bit.ly/prosper-baba'
                        />
                    </Flex>
                </HStack>
            </Flex>

            {/* third div */}
            <HStack w='300px' spacing={'20px'}>
                <Button
                    rightIcon={<Icon fontSize={'lg'} as={BsBroadcast} />}
                    variant='ghost'
                    rounded={'full'}
                    bg='clique.base'
                    fontFamily={'Poppins'}
                    size={'sm'}
                >
                    Go live
                </Button>
                <UploadModal />
            </HStack>
        </Flex>
    );
}

export default Header;
