import { useRouter } from 'next/router';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAppDispatch } from 'redux/app/hooks';
import { useGetSubscriptionsQuery } from 'redux/services/user.service';
import { logout } from 'redux/slices/authSlice';

import {
	Box,
	Divider,
	Flex,
	Icon,
	Skeleton,
	SkeletonCircle,
	Text,
} from '@chakra-ui/react';
import { menu, scrollBarStyle, subcribees } from '@constants/utils';

import EachMenu from './EachMenu';
import EachSubscribe from './EachSubscribe';

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data, isFetching} = useGetSubscriptionsQuery({page: 1, limit: 5});

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

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
      sx={scrollBarStyle}
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
          {data?.data?.user.length && (
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
                (
                  item: {
                    userName: string;
                    firstName: string;
                    lastName: string;
                    photo: any;
                  },
                  index: number,
                ) => (
                  <EachSubscribe
                    key={index}
                    name={item.userName}
                    imgUrl={item.photo}
                    firstName={item.firstName}
                    lastName={item.lastName}
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
      >
        <Text
          mr='10px'
          fontFamily={'Poppins'}
          fontWeight={400}
          textTransform={'capitalize'}
          fontSize={'smSubHead'}
        >
          logout
        </Text>
        <Icon fontSize={'head'} as={HiOutlineLogout} />
      </Flex>
    </Box>
  );
}

export default Index;
