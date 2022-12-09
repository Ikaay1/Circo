import React, { useEffect, useState } from "react";

import { contentData } from "@constants/utils";

const useGetNotifications = ({ data, isFetching, page, isLoading }: any) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [contents, setContents] = useState<any>([]);

  useEffect(() => {
    setHasMore(false);
    setContents([]);
  }, []);

  useEffect(() => {
    if (data && !isFetching) {
      setContents((prevContents: any) => [
        ...prevContents,
        ...data?.data?.notifications,
      ]);
      if (data?.data?.notifications?.length === 20) {
        setHasMore(page < data?.data?.totalPages);
      } else {
        setHasMore(false);
      }
    }
  }, [data, page, isFetching]);

  useEffect(() => {
    if (!hasMore) return;
    if (data && !isLoading && isFetching && page !== 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data, isFetching, isLoading, page, hasMore]);

  return { loading, hasMore, contents };
};

export default useGetNotifications;
