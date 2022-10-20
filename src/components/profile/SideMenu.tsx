import { useRouter } from 'next/router';
import React from 'react';

import { Box, Icon } from '@chakra-ui/react';
import { profileMenu } from '@constants/utils';

const SideMenu = () => {
    const router = useRouter();

    return (
        <Box
            pt={{lg: '5rem'}}
            height='100%'
            borderRight={'1px solid rgba(255, 255, 255, 0.1)'}
        >
            {profileMenu.map(({name, icon, route}, i) => (
                <Box
                    key={name}
                    _before={{
                        content: '""',
                        display: router.query.name === route ? 'block' : 'none',
                        width: '6px',
                        height: '25px',
                        background: 'clique.base',
                        borderRightRadius: '4px',
                        boxShadow: '10px 0px 18px #892CDC',
                        mr: '2.1rem',
                    }}
                    display={{lg: 'flex'}}
                    color={
                        router.query.name === route
                            ? 'clique.base'
                            : 'clique.whiteGrey'
                    }
                    _hover={{
                        color: 'clique.base',
                    }}
                    transition={'all 0.2s ease-in-out'}
                    onClick={() => router.push('/profile/1/' + route)}
                    ml={router.query.name === route ? '0rem' : '2.475rem'}
                    mb={i !== 0 ? '0rem' : '2.5rem'}
                    cursor={'pointer'}
                    fontWeight='500'
                    fontSize='12px'
                    lineHeight='16px'
                    alignItems='center'
                    letterSpacing='0.5px'
                >
                    <Icon as={icon} mr='15px' />
                    {name}
                </Box>
            ))}
        </Box>
    );
};

export default SideMenu;
