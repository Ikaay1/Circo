import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useAppSelector} from 'redux/app/hooks';

import {useToast} from '@chakra-ui/toast';
import UploadPage from '@components/upload/UploadPage';

type Props = {};

function Upload({}: Props) {
  const router = useRouter();
  const {name, url} = useAppSelector((store) => store.upload);
  const toast = useToast();
  useEffect(() => {
    if (!name || !url) {
      router.back();
      toast({
        title: 'Error',
        description: 'No valid video has been chosen',
        status: 'error',
        duration: 7000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [name, url, router]);
  return (
    <HomeLayout toggleView>
      <UploadPage url={url} name={name} />
    </HomeLayout>
  );
}

export default Upload;
export {getServerSideProps} from '../components/widgets/Chakara';
