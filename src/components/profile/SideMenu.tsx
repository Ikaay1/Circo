import { useRouter } from 'next/router';
import React from 'react';

import { Box, Icon } from '@chakra-ui/react';

import { MenuData } from '../../constants/interface';

const SideMenu = ({menu}: {menu: MenuData[]}) => {
    const router = useRouter();

    return (
        <Box
            pt={{lg: '5rem'}}
            height='100%'
            borderRight={'1px solid rgba(255, 255, 255, 0.1)'}
        >
            {menu.map(({name, icon, route}, i) => (
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
                    onClick={() =>
                        router.push(
                            router.asPath.split('/')[1] === 'channel'
                                ? '/channel/1/' + route
                                : '/profile/1/' + route,
                        )
                    }
                    ml={router.query.name === route ? '0rem' : '2.475rem'}
                    mb={i === menu.length - 1 ? '0rem' : '2.5rem'}
                    cursor={'pointer'}
                    fontWeight='500'
                    fontSize='sm'
                    lineHeight='16px'
                    alignItems='center'
                    letterSpacing='0.5px'
                >
                    <Box mr='15px'>
                        <Icon as={icon} />
                    </Box>
                    {name}
                </Box>
            ))}
        </Box>
    );
};

export default SideMenu;
