import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { useCategoryQuery } from "redux/services/category.service";
import { useGetContentsBySearchQuery } from "redux/services/content.service";

import { Box, Divider, Flex } from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import CliqueLoader from "@components/home/CliqueLoader";
import LiveEvents from "@components/home/LiveEvents";
import LiveTopCard from "@components/home/LiveTopCard";
import RecentSearches from "@components/home/RecentSearches";
import TagSection from "@components/home/TagSection";
import UserSearchResult from "@components/home/UserSearchResult";
import VideoGrid from "@components/home/VideoGrid";
import VideoSkeletonLoader from "@components/home/VideoSkeletonLoader";
import SideMenu from "@components/widgets/sideMenu";
import { scrollBarStyle3 } from "@constants/utils";

import useGetContents from "../../hooks/useGetContents";

function Search() {
  const [categoryId, setCategoryId] = useState("all");
  const categories = useCategoryQuery("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const search = router.query?.search ? router.query?.search : "";
  const { data, isFetching, isLoading } = useGetContentsBySearchQuery({
    page,
    limit: 7,
    search,
    categoryId,
  });

  const { loading, hasMore, contents } = useGetContents({
    data,
    isFetching,
    page,
    isLoading,
    categoryId,
  });

  const observerRef: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <HomeLayout>
        <Flex>
          <SideMenu />
          <Box
            maxH={"90vh"}
            pb={{ base: "20px", lg: "50px" }}
            px={{ base: "20px", lg: "30px" }}
            w={{ base: "100%", lg: "calc(100vw - 500px)" }}
            overflowY={"scroll"}
            overflowX={"hidden"}
            sx={scrollBarStyle3}
          >
            {!categories.data ? (
              <Box h="90vh">
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

                <RecentSearches />
                <UserSearchResult />

                {
                  <>
                    {isFetching && page === 1 ? (
                      <VideoSkeletonLoader />
                    ) : !isFetching && !contents.length ? (
                      <Box
                        mt={{ base: "8px", lg: "20px" }}
                        height={{ base: "40vh", lg: "65%" }}
                      >
                        <EmptyState msg="Oops!. No video here" />
                      </Box>
                    ) : (
                      <>
                        <VideoGrid
                          thumbWidth={{ lg: "220px", mlg: "280px", xl: "full" }}
                          width={"calc(100vw - 560px)"}
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
    </>
  );
}

export default Search;
export { getServerSideProps } from "../../components/widgets/Chakara";
