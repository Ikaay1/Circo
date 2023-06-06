import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect, useRef, useState} from 'react';
import {VscReport} from 'react-icons/vsc';
import {useAppSelector} from 'redux/app/hooks';
import {useDeleteContentMutation} from 'redux/services/bank.service';
import {useGetIndividualChannelQuery} from 'redux/services/channel.service';
import {
  useSaveVideoMutation,
  useUnSaveVideoMutation,
} from 'redux/services/report.service';

import {
  Avatar,
  Box,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  ScaleFade,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import CopyBox from '@components/channel/CopyBox';
import Sure from '@components/channel/Sure';
import ReportVideo from '@components/player/ReportVideo';
import AddToPlaylistModal from '@components/profile/AddToPlaylistModal';
import Color from '@constants/color';
import DownloadIcon2 from '@icons/DownloadIcon2';
import PlaylistAddIcon from '@icons/PlaylistAddIcon';
import ShareE from '@icons/ShareE';
import TrashIcon from '@icons/TrashIcon';
import VideoSideIcon from '@icons/VideoSideIcon';

import {
  API,
  baseUrl,
  contentData,
  createObjectURL,
  decrypt,
} from '../../constants/utils';
import {useRoutingChannel} from '../../hooks/useRoutingChannel';
import HoverCard from './HoverCard';
import SubScribeModal from './SubScribeModal';

function VideoThumb({
  video,
  thumbWidth,
  isSubscribed,
  lastElementRef,
  setContents,
  refetch,
}: {
  video: contentData;
  thumbWidth: {base: string; lg: string; mlg: string; xl: string};
  isSubscribed: boolean;
  lastElementRef?: any;
  setContents?: any;
  refetch: () => void;
}) {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isOpenCopy,
    onOpen: onOpenCopy,
    onClose: onCloseCopy,
  } = useDisclosure();
  const {
    isOpen: isOpenPlay,
    onOpen: onOpenPlay,
    onClose: onClosePlay,
  } = useDisclosure();
  const {
    isOpen: isOpenSure,
    onOpen: onOpenSure,
    onClose: onCloseSure,
  } = useDisclosure();
  const {
    isOpen: isOpenReport,
    onOpen: onOpenReport,
    onClose: onCloseReport,
  } = useDisclosure();
  const [isHover, setIsHover] = React.useState(false);
  const {handleRouting} = useRoutingChannel();
  const [deleteContent, deleteContentStatus] = useDeleteContentMutation();
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [videoTime, setVideoTime] = useState('0:00');
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [saveVideo, saveVideoStatus] = useSaveVideoMutation();
  const [unSaveVideo, unSaveVideoStatus] = useUnSaveVideoMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const VideoSideMenu2 =
    userProfile?._id !== video?.uploader_id?._id
      ? [
          {icon: ShareE, text: 'Share'},
          {icon: PlaylistAddIcon, text: 'Add to playlist'},
          {icon: VscReport, text: 'Report Video'},
          {
            icon: DownloadIcon2,
            text: !userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id,
            )
              ? 'Save Video'
              : 'Unsave Video',
          },
        ]
      : [
          {icon: ShareE, text: 'Share'},
          {icon: PlaylistAddIcon, text: 'Add to playlist'},
          {
            icon: DownloadIcon2,
            text: !userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id,
            )
              ? 'Save Video'
              : 'Unsave Video',
          },
        ];

  const VideoSideMenu =
    userProfile?._id !== video?.uploader_id?._id
      ? [
          {icon: ShareE, text: 'Share'},
          {icon: PlaylistAddIcon, text: 'Add to playlist'},
          {icon: TrashIcon, text: 'Delete Video'},
          {icon: VscReport, text: 'Report Video'},
          {
            icon: DownloadIcon2,
            text: !userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id,
            )
              ? 'Save Video'
              : 'Unsave Video',
          },
        ]
      : [
          {icon: ShareE, text: 'Share'},
          {icon: PlaylistAddIcon, text: 'Add to playlist'},
          {icon: TrashIcon, text: 'Delete Video'},
          {
            icon: DownloadIcon2,
            text: !userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id,
            )
              ? 'Save Video'
              : 'Unsave Video',
          },
        ];

  const handleSaveVideo = async (save: string) => {
    if (save === 'save') {
      await saveVideo({videoId: video._id});
      toast({
        title: 'You have successfully saved this video',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    } else {
      await unSaveVideo(video._id);
      toast({
        title: 'You have successfully unsaved this video',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    }
  };

  const handleClick = async (i: number) => {
    if (i === 0) {
      onOpenCopy();
    } else if (i === 1) {
      onOpenPlay();
    } else if (i === 2) {
      onOpenSure();
    } else if (i === 3) {
      onOpenReport();
    } else {
      setShow(false);
      !userProfile?.savedVideos.find(
        (each: contentData) => each._id === video._id,
      )
        ? handleSaveVideo('save')
        : handleSaveVideo('unsave');
    }
  };
  const handleClick2 = async (i: number) => {
    if (i === 0) {
      onOpenCopy();
    } else if (i === 1) {
      onOpenPlay();
    } else if (i === 2) {
      onOpenReport();
    } else {
      setShow(false);
      !userProfile?.savedVideos.find(
        (each: contentData) => each._id === video._id,
      )
        ? handleSaveVideo('save')
        : handleSaveVideo('unsave');
    }
  };

  const handleDeleteContent = async () => {
    const res = await deleteContent(video._id);

    onCloseSure();
    toast({
      title: 'Video successfully deleted',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    // router.reload();
    setContents((prevContents: contentData[]) =>
      prevContents.filter((content) => content._id !== video._id),
    );
  };

  useEffect(() => {
    async function display(videoStream: string) {
      // let blob = await fetch(videoStream).then((r) => r.blob());
      // var videoUrl = createObjectURL(blob);
      setUrl(videoStream);
    }

    display(decrypt(video?.video));
  }, []);

  const handleLoadedMetadata = () => {
    let vid: any = videoRef.current;
    console.log('vid', vid);
    if (!vid) return;
    let minutes = parseInt(`${vid.duration / 60}`, 10);
    let seconds = Math.round(vid.duration % 60);
    seconds.toString().length === 1
      ? setVideoTime(`${minutes}:0${seconds}`)
      : setVideoTime(`${minutes}:${seconds}`);
    setLoading(false);
  };

  return (
    <>
      <Box position={'relative'} ref={lastElementRef}>
        <HoverCard
          show={isHover && !isOpen && url ? true : false}
          setIsHover={setIsHover}
          isSubscribed={isSubscribed}
          id={video._id}
          userId={video.uploader_id._id}
          video={video}
          name={video?.channel_id?.name ?? 'Not Available'}
          photo={video?.channel_id?.photo}
          url={url}
        />

        <Box display={isHover && !isOpen && url ? 'none' : 'block'}>
          <video
            style={{display: 'none'}}
            ref={videoRef}
            onLoadedMetadata={handleLoadedMetadata}
            src={url}
          />

          <Box
            onMouseOver={() => {
              setTimeout(() => {
                setIsHover(true);
              }, 2500);
            }}
            onMouseOut={() => {
              setTimeout(() => {
                setIsHover(false);
              }, 2500);
            }}
            cursor={'pointer'}
            w='full'
            onClick={() => {
              if (isSubscribed) {
                router.push(`/player/${video._id}/${video.uploader_id._id}`);
              } else {
                onOpen();
              }
            }}
            position={'relative'}
          >
            <SubScribeModal
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              id={video?.channel_id?.name}
              userName={video?.channel_id?.name}
            />
            <Box
              h={{base: '200px', lg: '130px', mlg: '180px'}}
              bgImage={`url(${video?.thumbNail})`}
              bgSize='cover'
              bgPosition='center'
              rounded={'10px'}
            />
            {video?.isFree && (
              <Text
                bg='clique.freeColor'
                borderTopRightRadius={'8px'}
                borderBottomLeftRadius={'8px'}
                w='60px'
                h='21px'
                display={'flex'}
                justifyContent='center'
                alignItems={'center'}
                color='clique.black'
                fontWeight={'600'}
                position='absolute'
                top={'0'}
                right='0'
              >
                Free
              </Text>
            )}
            <Text
              position='absolute'
              bottom={'0'}
              right='0'
              bg='clique.black'
              borderTopLeftRadius='5px'
              borderBottomLeftRadius='5px'
              px='3px'
              fontSize='sm4'
              color='clique.white'
            >
              {loading ? '--:--' : videoTime}
            </Text>
          </Box>

          <Flex mt='15px'>
            <Avatar
              mr={'10px'}
              p='0'
              size='sm'
              name={video?.channel_id?.name ?? 'Not Available'}
              src={video?.channel_id?.photo}
              onClick={() => handleRouting(video?.channel_id?.name)}
              cursor='pointer'
            />

            <Box maxWidth={'70%'}>
              <Text
                noOfLines={1}
                color={Color().blackAndPureWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                fontSize={'sm2'}
                lineHeight={'1.2'}
              >
                {video?.title}
              </Text>

              <Text
                mt='5px'
                noOfLines={1}
                color={'clique.darkGrey'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                @{video?.channel_id?.name ?? 'Not Available'}
              </Text>
              <Flex alignItems={'center'} mt='5px'>
                <Text
                  noOfLines={2}
                  color={'clique.darkGrey'}
                  fontFamily={'Poppins'}
                  fontWeight={400}
                  fontSize={'sm'}
                  lineHeight={'1.2'}
                  mr='10px'
                >
                  {video?.view} {video?.view !== 1 ? 'views' : 'view'}
                </Text>
                <Text
                  pos={'relative'}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: 0,
                    width: '4px',
                    background: 'clique.darkGrey',
                    height: '4px',
                    rounded: 'full',
                  }}
                  pl='10px'
                  noOfLines={2}
                  color={'clique.darkGrey'}
                  fontFamily={'Poppins'}
                  fontWeight={400}
                  fontSize={'sm'}
                  lineHeight={'1.2'}
                >
                  {moment(video?.createdAt).fromNow()}
                </Text>
              </Flex>
            </Box>
            <Flex borderRadius={'5px'} h='100%'>
              <Icon
                as={VideoSideIcon}
                fontSize='25px'
                cursor='pointer'
                onClick={() => {
                  if (isSubscribed) {
                    setShow(!show);
                  } else {
                    // this is the error line
                    onOpen();
                  }
                }}
              />
            </Flex>
          </Flex>
          {show ? (
            <Box
              position={'absolute'}
              bottom='0'
              right='0.2'
              bg='clique.darkGrey1'
              p='3'
              borderTopLeftRadius={15}
              borderBottomRightRadius={'10px'}
              pl='1'
              sx={{
                transition: 'all 3s ease-in-out',
              }}
              onMouseLeave={() => setShow(false)}
            >
              {router.asPath === '/myChannel/content'
                ? VideoSideMenu.map((each, i) => (
                    <Flex
                      align='center'
                      justifyItems={'center'}
                      mb='2'
                      key={i}
                      cursor='pointer'
                      onClick={() => handleClick(i)}
                      color='clique.white'
                    >
                      <Icon
                        as={each.icon}
                        fontSize='15px'
                        cursor='pointer'
                      ></Icon>
                      <Text ml='2' fontSize={'sm3'}>
                        {each.text}
                      </Text>
                    </Flex>
                  ))
                : VideoSideMenu2.map((each, i) => (
                    <Flex
                      align='center'
                      justifyItems={'center'}
                      mb='2'
                      key={i}
                      cursor='pointer'
                      onClick={() => handleClick2(i)}
                      color='clique.white'
                    >
                      <Icon
                        as={each.icon}
                        fontSize='15px'
                        cursor='pointer'
                      ></Icon>
                      <Text ml='2' fontSize={'sm3'}>
                        {each.text}
                      </Text>
                    </Flex>
                  ))}
            </Box>
          ) : null}
        </Box>
      </Box>
      <AddToPlaylistModal
        isOpen={isOpenPlay}
        onClose={onClosePlay}
        videoId={video._id}
      />
      <Sure
        isOpen={isOpenSure}
        onClose={onCloseSure}
        buttonText='Delete'
        header='Delete Content'
        description='Are you sure you want to delete this content?'
        onClick={handleDeleteContent}
        isLoading={deleteContentStatus.isLoading}
      />
      <Modal onClose={onCloseCopy} isOpen={isOpenCopy}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position='absolute'
            left={'50%'}
            transform={'translate(-50%, 60%)'}
            w={{base: '100%', lg: 'auto'}}
          >
            <CopyBox link={`player/${video._id}/${video.uploader_id._id}`} />
          </Box>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        onClose={onCloseReport}
        isOpen={isOpenReport}
        motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          maxW='400px'
          w='400px'
          bottom='0'
          minH='100vh'
          m='0'
          p='0'
          position={'absolute'}
          right={0}
          bg={Color().whiteAndBlack}
        >
          <ReportVideo onClose={onCloseReport} video={video} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default VideoThumb;
