import {useRouter} from 'next/router';
import {HiOutlineLogout} from 'react-icons/hi';
import {useAppDispatch} from 'redux/app/hooks';
import {useGetSubscriptionsQuery} from 'redux/services/user.service';
import {logout} from 'redux/slices/authSlice';

import {
  Box,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import {menu, scrollBarStyle, subcribees} from '@constants/utils';

import EachMenu from './EachMenu';
import EachSubscribe from './EachSubscribe';

function Index() {
  const dispatch = useAppDispatch();
  const {data, isFetching} = useGetSubscriptionsQuery({page: 1, limit: 5});
  console.log('sub', data);



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
      {isFetching ? (
        <>
          {[1, 2, 3].map((num) => (
            <Flex pl='50px' key={num} mt='15px' alignItems={'center'}>
              <SkeletonCircle size='10' mr='10px' />
              <Skeleton w='60%' height='15px' />
            </Flex>
          ))}
        </>
      ) : (
        <>
          {data?.data?.user.length > 0 && (
            <>
              <Text
                pl='60px'
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
              >
                subscriptions
              </Text>
              {data?.data?.user.map(
                (item: {
                  channel_id: {
                    photo: string;
                    name: string;
                  };
                  _id: string;
                }) => (
                  <EachSubscribe
                    key={item._id}
                    id={item._id}
                    channel_id={item.channel_id}
                  />
                ),
              )}
            </>
          )}
        </>
      )}

  
    </Box>
  );
}

export default Index;
