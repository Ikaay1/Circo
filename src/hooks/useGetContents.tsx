import React, {useEffect, useState} from 'react';

import {contentData} from '@constants/utils';

const useGetContents = ({
  data,
  isFetching,
  page,
  isLoading,
  fetchNumber,
  categoryId,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [contents, setContents] = useState<contentData[]>([]);

  console.log('pages', data);
  console.log('page', page);

  useEffect(() => {
    setHasMore(false);
    setContents([]);
  }, [categoryId]);

  useEffect(() => {
    if (data && !isFetching) {
      setContents((prevContents) => [
        ...prevContents,
        ...data?.data?.preference?.videos,
      ]);
      if (data?.data?.preference?.videos?.length === fetchNumber) {
        setHasMore(page < data?.data?.preference?.totalContent);
      } else {
        setHasMore(false);
      }
    }
  }, [data, page, fetchNumber]);

  useEffect(() => {
    if (!hasMore) return;
    if (data && !isLoading && isFetching && page !== 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data, isFetching, isLoading, page, hasMore]);

  return {loading, hasMore, contents};
};

export default useGetContents;
