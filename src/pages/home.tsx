/* eslint-disable react-hooks/exhaustive-deps */
import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useCategoryQuery} from 'redux/services/category.service';
import {useGetContentsQuery} from 'redux/services/content.service';
import {useExpiredSubscriptionMutation} from 'redux/services/user.service';

// import {useDepositToWalletMutation} from 'redux/services/wallet.service';
// import io from 'socket.io-client';
// import { useDepositToWalletMutation } from 'redux/services/wallet.service';
import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import TagSection from '@components/home/TagSection';
import Tour from '@components/home/Tour';
import TourMain from '@components/home/TourMain';
import VideoGrid from '@components/home/VideoGrid';
import VideoSkeletonLoader from '@components/home/VideoSkeletonLoader';
import SideMenu from '@components/widgets/sideMenu';
import Color from '@constants/color';
import {scrollBarStyle3} from '@constants/utils';

import useGetContents from '../hooks/useGetContents';

function Index() {
  const router = useRouter();
  const {signup} = router.query;
  const [page, setPage] = useState(1);
  // const [depositToWallet, depositToWalletStatus] = useDepositToWalletMutation();
  // const {tx_ref} = router.query;

  const [hasChannel, setHasChannel] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  const [categoryId, setCategoryId] = useState('all');
  const categories = useCategoryQuery('');
  // const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {data, isFetching, isLoading, refetch} = useGetContentsQuery({
    page,
    limit: 9,
    categoryId,
  });
  const [expiredSub] = useExpiredSubscriptionMutation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1} = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
  const {isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3} = useDisclosure();
  const {isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4} = useDisclosure();
  const {isOpen: isOpen5, onOpen: onOpen5, onClose: onClose5} = useDisclosure();
  const {isOpen: isOpen6, onOpen: onOpen6, onClose: onClose6} = useDisclosure();
  const {isOpen: isOpen7, onOpen: onOpen7, onClose: onClose7} = useDisclosure();
  const {isOpen: isOpen8, onOpen: onOpen8, onClose: onClose8} = useDisclosure();
  const {isOpen: isOpen9, onOpen: onOpen9, onClose: onClose9} = useDisclosure();

  useEffect(() => {
    const expired = async () => {
      const res: any = await expiredSub({});

      if (res?.data?.data) {
        window.location.replace('/home');
      }
    };
    expired();
  }, []);
  // console.log('tx_ref', tx_ref);
  // console.log('okay', localStorage.getItem('okay'));

  // useEffect(() => {
  //   const deposit = async () => {
  //     try {
  //       await depositToWallet({
  //         amount: Number(JSON.parse(localStorage.getItem('okay')!)),
  //         description: 'Funded from Paystack',
  //         reference: `${tx_ref}`,
  //       });
  //       localStorage.removeItem('okay');
  //     } catch (error) {
  //       localStorage.removeItem('okay');
  //     }
  //     window.location.replace('/home');
  //   };
  //   if (tx_ref && localStorage.getItem('okay')) {
  //     deposit();
  //   } else if (
  //     !localStorage.getItem('okay') &&
  //     router.asPath.includes('status')
  //   ) {
  //     window.location.replace('/home');
  //   }
  // }, [tx_ref]);

  const {loading, hasMore, contents} = useGetContents({
    data,
    isFetching,
    page,
    isLoading,
    categoryId,
    fetchNumber: 9,
  });

  const observerRef: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  console.log(data);

  useEffect(() => {
    if (signup) {
      router.push('/home');
      onOpen();
    }
  }, [signup]);

  return (
    <>
      <HomeLayout>
        <Flex>
          <SideMenu />
          <Box
            maxH={'90vh'}
            pb={{base: '20px', lg: '50px'}}
            px={{base: '20px', lg: '30px'}}
            w={{base: '100%', lg: 'calc(100vw - 500px)'}}
            overflowY={'scroll'}
            overflowX={'hidden'}
            sx={scrollBarStyle3}
          >
            {!categories.data ? (
              <Box h='90vh'>
                <CliqueLoader />
              </Box>
            ) : (
              <>
                <LiveTopCard />
                <Divider />
                <TagSection
                  categories={categories.data.data}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
                  setPage={setPage}
                />
                <Divider />

                {
                  <>
                    {isFetching && page === 1 ? (
                      <VideoSkeletonLoader />
                    ) : !isFetching && !contents.length ? (
                      <Box mt='20px' height={{base: '70vh', lg: '65%'}}>
                        <EmptyState msg='Oops!. No video here' />
                      </Box>
                    ) : (
                      <>
                        <VideoGrid
                          thumbWidth={{lg: '220px', mlg: '280px', xl: 'full'}}
                          width={'calc(100vw - 560px)'}
                          videos={contents}
                          lastElementRef={lastElementRef}
                        />
                        {loading && <VideoSkeletonLoader />}
                      </>
                    )}
                  </>
                }
              </>
            )}
          </Box>
          <LiveEvents />
        </Flex>
      </HomeLayout>
      <Modal isOpen={isOpen} onClose={() => {}} isCentered>
        {/* <ModalOverlay /> */}
        <ModalContent
          bg={Color().whiteAndBlack}
          borderColor={Color().whiteAndBlack}
          borderRadius='xl'
          pt='3'
          pb='4'
          w={{base: '100%'}}
        >
          <ModalHeader alignSelf='center' fontSize={'smHead'} fontWeight='500'>
            Circo Tour
          </ModalHeader>
          <ModalBody>
            <Tour
              onClose={onClose}
              next={() => {
                onClose();
                onOpen1();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <TourMain
        number='1'
        back={onClose1}
        next={() => {
          onClose1();
          onOpen2();
        }}
        text='Welcome to your personalized hub! The home screen is where you’ll find a
        curated selection of videos tailored to your interest.'
        header='Home'
        isOpen={isOpen1}
      />
      <TourMain
        number='2'
        back={() => {
          onClose2();
          onOpen1();
        }}
        next={() => {
          onClose2();
          onOpen3();
        }}
        text='Explore new genres, discover emerging creators, and find hidden gems
        that align with your interest.'
        header='Discover'
        isOpen={isOpen2}
      />
      <TourMain
        number='3'
        back={() => {
          onClose3();
          onOpen2();
        }}
        next={() => {
          onClose3();
          onOpen4();
        }}
        text='Seamlessly manage your finances within the platform. Support your favorite
        creators by contributing, or earn from your own content.'
        header='Wallet'
        isOpen={isOpen3}
      />
      <TourMain
        number='4'
        back={() => {
          onClose4();
          onOpen3();
        }}
        next={() => {
          onClose4();
          onOpen5();
        }}
        text='Customize your experience and tailor the platform to your preferences with
        our comprehensive settings menu.'
        header='Settings'
        isOpen={isOpen4}
      />
      <TourMain
        number='5'
        back={() => {
          onClose5();
          onOpen4();
        }}
        next={() => {
          onClose5();
          onOpen6();
        }}
        text='Looking for specific videos or creators? Our powerful search feature allows
        you to find exactly what you’re looking for.'
        header='Search'
        isOpen={isOpen5}
      />
      <TourMain
        number='6'
        back={() => {
          onClose6();
          onOpen5();
        }}
        next={() => {
          onClose6();
          onOpen7();
        }}
        text='Stay up-to-date with important updates and never miss a beat. Receive instant notifications about new video uploads, live events, comments, and likes.'
        header='Notification'
        isOpen={isOpen6}
      />
      <TourMain
        number='7'
        back={() => {
          onClose7();
          onOpen6();
        }}
        next={() => {
          onClose7();
          onOpen8();
        }}
        text='Showcase your unique style and personality with your profile or channel. Share your best videos, connect with your audience, and build a loyal community.'
        header='Profile'
        isOpen={isOpen7}
      />
      <TourMain
        number='8'
        back={() => {
          onClose8();
          onOpen7();
        }}
        next={() => {
          onClose8();
          onOpen9();
        }}
        text='Experience the thrill of live content creation! Join or host live events to
        engage with your audience in real-time'
        header='Live'
        isOpen={isOpen8}
      />
      <TourMain
        number='9'
        back={() => {
          onClose9();
          onOpen8();
        }}
        next={onClose9}
        text='Ignite your creativity and start creating amazing videos with our
        easy-to-use creation tools.'
        header='Upload'
        isOpen={isOpen9}
      />
    </>
  );
}

export default Index;

export {getServerSideProps} from '../components/widgets/Chakara';
