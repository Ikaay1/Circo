import axios from 'axios';
import {useRouter} from 'next/router';
import {FormEvent, useEffect, useState} from 'react';
import {useCategoryQuery} from 'redux/services/category.service';
import {useCreateContentMutation} from 'redux/services/content.service';

import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Link,
  Select,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import {CategoriesInterface} from '@constants/interface';
import {age, API, selectArr, videoDetails} from '@constants/utils';
import AddIcon from '@icons/AddIcon';
import CopyIcon from '@icons/CopyIcon';

import DetailCard from './DetailCard';
import UploadPreview from './UploadPreview';

// const cloudinary = require('cloudinary').v2;

type Props = {
  url: string;
  name: string;
};

function UploadPage({url, name}: Props) {
  // const cloud = cloudinary.config({
  //   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  //   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  // });
  const [state, setState] = useState({
    title: '',
    description: '',
    category: 'Choose Category',
    ageRange: 'Age Range',
    video: '',
  });
  const toast = useToast();

  const router = useRouter();
  const {data, isLoading} = useCategoryQuery('');
  const [thumbNail, setThumbNail] = useState<string | Blob>('');
  const [imageError, setImageError] = useState<string>('');
  const [createContent, createContentStatus] = useCreateContentMutation();
  const [isFree, setIsFree] = useState<boolean>(false);

  const uploadVideo = async (id: string) => {
    let file = await fetch(url)
      .then((r) => r.blob())
      .then((blobFile) => new File([blobFile], name, {type: 'video/mp4'}));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'videouploads');
    formData.append('public_id', id);
    // formData.append('resource_type', 'video');
    // formData.append('folder', 'videos');

    const formData2 = new FormData();
    formData2.append('file', thumbNail);
    formData2.append('upload_preset', 'circo_image');
    formData2.append('public_id', id);
    // formData2.append('folder', 'thumbnails');
    // formData2.append('resource_type', 'image');

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        formData,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData2,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.category === 'Choose Category') {
      toast({
        title: 'Error',
        description: 'Please choose a category',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    if (state.ageRange === 'Age Range') {
      toast({
        title: 'Error',
        description: 'Please choose an age range',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    if (!thumbNail) {
      toast({
        title: 'Error',
        description: 'Please upload a thumbnail',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    // const formData = new FormData();
    // formData.append('title', state.title);
    // formData.append('description', state.description);
    // formData.append('category', state.category);
    // formData.append('ageRange', state.ageRange);
    // formData.append('file', file);
    // formData.append('thumbNail', thumbNail);
    // formData.append('isFree', isFree.toString());
    const values = {
      title: state.title,
      description: state.description,
      category: state.category,
      ageRange: state.ageRange,
      isFree: isFree.toString(),
    };
    // const res: any = createContent(formData);
    const res: any = await createContent(values);
    if ('data' in res) {
      uploadVideo(res?.data?.data?._id);
      setTimeout(() => {
        toast({
          title: 'Your video is being uploaded',
          description: "You'll get a notification when it completes uploading",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/home');
      }, 2000);
    } else {
      toast({
        title: 'Upload failed',
        description: res.error?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (imageError) {
      setTimeout(() => {
        setImageError('');
      }, 3000);
    }
  }, [imageError]);

  const valueC = useColorModeValue('clique.white', 'clique.secondaryGrey1');
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex
        gap={3}
        pl='5'
        pr='12'
        mt={{base: '.7rem', lg: 'none'}}
        height={{base: '100vh', lg: '100%'}}
      >
        <Box
          display={{base: 'none', lg: 'block'}}
          w='20%'
          maxW='20%'
          minW='20%'
          pt='4'
          pr='2'
        >
          <Text fontSize={'smHead'} mb='5'>
            Your video preview
          </Text>
          <UploadPreview
            title={state.title}
            thumbNail={
              thumbNail &&
              typeof thumbNail !== 'string' &&
              URL.createObjectURL(thumbNail as Blob)
            }
            isFree={isFree}
          />
        </Box>

        <Flex width={{base: '100%', lg: '50%'}}>
          <Divider orientation='vertical' bg='clique.secondaryGrey' mr='4' />
          <Box pt='2' pb='5'>
            <Text fontSize='head'>Video details</Text>

            <VStack align='stretch' mt={4}>
              {videoDetails.map((each) => {
                return (
                  <DetailCard
                    key={each.title}
                    title={each.title}
                    input={each.input}
                    value={state.title}
                    valueArea={state.description}
                    handleInputChange={(event) =>
                      setState({...state, title: event?.target?.value})
                    }
                    handleInputChangeArea={(event) =>
                      setState({...state, description: event?.target?.value})
                    }
                    limit={each.title === 'Title' ? 70 : 300}
                  />
                );
              })}
            </VStack>
            <Box mt='7' mb='4'>
              <Text fontSize='smSubHead'>Thumbnail</Text>
              <Text fontSize='xsl' color='clique.secondaryGrey2' mb='2'>
                Select or upload a picture that shows what is your video
              </Text>
              <Input
                type={'file'}
                onChange={(e: any) => {
                  e.target.files[0]?.type.includes('image')
                    ? setThumbNail(e.target.files[0])
                    : setImageError('Please choose an image');
                }}
                display={'none'}
                id={'thumbnail'}
              />{' '}
              <label htmlFor={'thumbnail'}>
                {thumbNail && typeof thumbNail !== 'string' ? (
                  <Box mt='7'>
                    {' '}
                    <Box
                      bgImage={'url(' + URL.createObjectURL(thumbNail) + ')'}
                      rounded='10px'
                      h='120px'
                      w='250px'
                      bgRepeat={'no-repeat'}
                      bgSize={'cover'}
                    ></Box>
                  </Box>
                ) : (
                  <Flex gap='2' mb='4' cursor={'pointer'}>
                    <Flex
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent='center'
                      gap='2'
                      py={4}
                      border='1px'
                      width='40%'
                      borderRadius={'10px'}
                      borderColor='clique.secondaryGrey2'
                      borderStyle='dashed'
                    >
                      <Icon as={AddIcon} />
                      <Text fontSize='smSubHead'>Upload Thumbnail</Text>
                    </Flex>
                  </Flex>
                )}
              </label>
              <Text color='red' fontSize='18px'>
                {imageError}
              </Text>
            </Box>
            <Text fontSize={'subHead'} mb='4'>
              Other Parameters
            </Text>

            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {selectArr.map((each, i) => {
                return (
                  <GridItem w='100%' key={i}>
                    <Select
                      placeholder={each.placeholder}
                      bg={valueC}
                      // borderColor='clique.secondaryGrey1'
                      size='md'
                      height={'40px'}
                      onChange={(e) =>
                        i === 0
                          ? setState((prevState) => ({
                              ...prevState,
                              category: e.target.value,
                            }))
                          : setState((prevState) => ({
                              ...prevState,
                              ageRange: e.target.value,
                            }))
                      }
                    >
                      {i === 0 && (
                        <>
                          {data?.data.map((category: CategoriesInterface) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </>
                      )}
                      {i === 1 && (
                        <>
                          {age.map((eachAge) => (
                            <option key={eachAge} value={eachAge}>
                              {eachAge}
                            </option>
                          ))}
                        </>
                      )}
                    </Select>
                  </GridItem>
                );
              })}

              <Checkbox
                checked={isFree}
                onChange={(e: any) => {
                  setIsFree(e.target.checked);
                }}
              >
                <Text>Free video</Text>
              </Checkbox>
            </Grid>
            <Btn
              text='upload'
              submit={true}
              isLoading={createContentStatus.isLoading}
              display={{lg: 'none'}}
              w='100%'
              mt='3rem'
            />
          </Box>
        </Flex>
        <Flex
          w='30%'
          maxW='30%'
          minW='30%'
          flexDirection={'column'}
          pb='40px'
          gap='100px'
          pt='65px'
          display={{base: 'none', lg: 'block'}}
        >
          <Box borderRadius={'10px'} overflow='hidden'>
            <Box>
              <video width='100%' height={'60px'} src={url} controls />
            </Box>
            <Box
              bg={valueC}
              pl='5'
              pt='2'
              pr='6'
              pb='8'
              borderBottomRadius='md'
            >
              {/* <Box>
                <Text fontSize={"0.75rem"}>Video link</Text>
                <Flex justifyContent="space-between" mt="2">
                  <Link fontSize={"0.75rem"} color="clique.primaryBlue">
                    https://clique.com/8u6yt26f
                  </Link>
                  <Icon as={CopyIcon} fontSize="70px" />
                </Flex>
              </Box> */}
              <Box mt='8'>
                <Text fontSize={'0.75rem'}>File name</Text>
                <Text mt='2' fontSize={'0.75rem'}>
                  {name}
                </Text>
              </Box>
            </Box>
          </Box>
          <Flex justifyContent={'center'} mt='2rem'>
            <Btn
              text='Upload'
              submit={true}
              isLoading={createContentStatus.isLoading}
              w='300px'
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}

export default UploadPage;
