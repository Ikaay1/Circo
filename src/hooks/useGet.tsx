import React, { useCallback, useEffect, useRef, useState } from "react";

import { contentData } from "@constants/utils";

const useGet = ({
  data,
  isFetching,
  isLoading,
  fetchNumber,
  page,
  setPage,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [contents, setContents] = useState<contentData[]>([]);
  useEffect(() => {
    setHasMore(false);
    setContents([]);
  }, []);

  useEffect(() => {
    if (data && !isFetching) {
      setContents((prevContents) => [...prevContents, ...data?.data?.videos]);
      if (data?.data?.videos.length === fetchNumber) {
        setHasMore(page < data?.data?.totalContent);
      } else {
        setHasMore(false);
      }
    }
  }, [data, page, isFetching, fetchNumber]);

  useEffect(() => {
    if (!hasMore) return;
    if (data && !isLoading && isFetching && page !== 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data, isFetching, isLoading, page, hasMore]);

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
    [loading, hasMore]
  );

  return { loading, contents, lastElementRef };
};

export default useGet;
