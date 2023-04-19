import {useRouter} from 'next/router';
import React from 'react';

import {Box, Divider, Icon} from '@chakra-ui/react';
import Subscriptions from '@components/widgets/sideMenu/Subscriptions';
import Color from '@constants/color';

import {MenuData} from '../../constants/interface';
import {scrollBarStyle3} from '../../constants/utils';

const SideMenu = ({menu}: {menu: MenuData[]}) => {
  const router = useRouter();

  return (
    <Box
      pt={{lg: '5rem'}}
      height='90vh'
      borderRight={'1px solid rgba(255, 255, 255, 0.1)'}
      bg={Color().whiteAndBlack}
      overflowY={'auto'}
      sx={scrollBarStyle3}
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
          whiteSpace='nowrap'
          display={{lg: 'flex'}}
          color={
            router.query.name === route ? 'clique.base' : Color().blackAndWhite
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

      {router.asPath.split('/')[1] === 'profile' && (
        <>
          <Box px='50px' py='40px'>
            <Divider />
          </Box>
          <Subscriptions />
        </>
      )}
    </Box>
  );
};

export default SideMenu;
