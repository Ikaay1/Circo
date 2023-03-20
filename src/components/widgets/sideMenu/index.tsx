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

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

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
                  userName: string;
                  firstName: string;
                  lastName: string;
                  photo: any;
                  _id: string;
                }) => (
                  <EachSubscribe
                    key={item._id}
                    name={item.userName}
                    imgUrl={item.photo}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    id={item._id}
                  />
                ),
              )}
            </>
          )}
        </>
      )}

      <Box px='50px' py='20px'>
        <Divider />
      </Box>

      <Flex
        onClick={handleLogout}
        transition={'all 0.2s ease-in-out'}
        _hover={{
          color: 'clique.base',
        }}
        cursor={'pointer'}
        justifyContent={'center'}
        alignItems='center'
        color={useColorModeValue('clique.black', 'clique.fadeOut')}
      >
        <Text
          mr='5px'
          fontFamily={'Poppins'}
          fontWeight={500}
          textTransform={'capitalize'}
          fontSize={'sm'}
        >
          logout
        </Text>
        <Icon
          fontSize={'smHead'}
          width={'24px'}
          height={'24px'}
          as={HiOutlineLogout}
        />
      </Flex>
    </Box>
  );
}

export default Index;
