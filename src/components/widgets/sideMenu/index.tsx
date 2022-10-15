import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';

import { Box, Divider, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { menu, subcribees } from '@constants/utilities';

import EachMenu from './EachMenu';
import EachSubscribe from './EachSubscribe';

function Index() {
    return (
        <Box
            w='250px'
            maxW='250px'
            minW='250px'
            bg='clique.black'
            h='90vh'
            minH='90vh'
            maxH='90vh'
            py={'20px'}
            overflowY='scroll'
            sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                    rounded: 'full',
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                },
                '&::-webkit-scrollbar-thumb': {
                    bg: 'clique.grey',
                    outline: 'none',
                },
            }}
        >
            {menu.map(
                (
                    item: {
                        name: string;
                        icon: any;
                    },
                    index: number,
                ) => (
                    <EachMenu key={index} name={item.name} icon={item.icon} />
                ),
            )}
            <Box px='50px' py='20px'>
                <Divider />
            </Box>
            <Text
                pl='60px'
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
            >
                subscriptions
            </Text>
            {subcribees.map(
                (
                    item: {
                        name: string;
                        imgUrl: any;
                    },
                    index: number,
                ) => (
                    <EachSubscribe
                        key={index}
                        name={item.name}
                        imgUrl={item.imgUrl}
                    />
                ),
            )}
            <Box px='50px' py='20px'>
                <Divider />
            </Box>

            <Flex
                transition={'all 0.2s ease-in-out'}
                _hover={{
                    color: 'clique.base',
                }}
                cursor={'pointer'}
                justifyContent={'center'}
                alignItems='center'
            >
                <Text
                    mr='10px'
                    fontFamily={'Poppins'}
                    fontWeight={400}
                    textTransform={'capitalize'}
                    fontSize={'14px'}
                >
                    logout
                </Text>
                <Icon fontSize={'xl'} as={HiOutlineLogout} />
            </Flex>
        </Box>
    );
}

export default Index;
