import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';

import UploadPage from '@components/upload/UploadPage';

type Props = {};

function Upload({}: Props) {
  const router = useRouter();
  const {name, url, file} = useAppSelector((store) => store.app.upload);
  useEffect(() => {
    if (!name || !url) {
      router.back();
    }
  }, [name, url, router]);
  return (
    <HomeLayout toggleView>
      <UploadPage url={url} name={name} file={file} />
    </HomeLayout>
  );
}

export default Upload;
