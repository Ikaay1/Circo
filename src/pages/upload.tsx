import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useAppSelector} from 'redux/app/hooks';

import UploadPage from '@components/upload/UploadPage';

type Props = {};

function Upload({}: Props) {
  const router = useRouter();

  return (
    <HomeLayout toggleView>
      <UploadPage />
    </HomeLayout>
  );
}

export default Upload;
export {getServerSideProps} from '../components/widgets/Chakara';
