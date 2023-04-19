import {useRouter} from 'next/router';
import {HiOutlineLogout} from 'react-icons/hi';
import {useAppDispatch} from 'redux/app/hooks';
import {useGetSubscriptionsQuery} from 'redux/services/user.service';
import {logout} from 'redux/slices/authSlice';

import {Box, Divider} from '@chakra-ui/react';
import Color from '@constants/color';
import {menu} from '@constants/utils';

import EachMenu from './EachMenu';
import Subscriptions from './Subscriptions';

function Index() {
  const dispatch = useAppDispatch();

  return (
    <Box
      display={{base: 'none', md: 'block'}}
      w='250px'
      maxW='250px'
      minW='250px'
      bg={Color().whiteAndBlack}
      h='90vh'
      minH='90vh'
      maxH='90vh'
      py={'20px'}
      overflowY='scroll'
      // sx={{
      //   ...scrollBarStyle,
      //   "&::-webkit-scrollbar-thumb": {
      //     bg: Color().lightAndPrimary,
      //   },
      // }}
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

      <Subscriptions />
    </Box>
  );
}

export default Index;
