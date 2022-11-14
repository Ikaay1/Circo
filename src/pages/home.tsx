import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useCategoryQuery } from "redux/services/category.service";
import { useGetChannelQuery } from "redux/services/channel.service";
import {
  useGetContentsByCategoryQuery,
  useGetContentsQuery,
} from "redux/services/content.service";

import { Box, Divider, Flex } from "@chakra-ui/react";
import LiveEvents from "@components/home/LiveEvents";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import SideMenu from "@components/widgets/sideMenu";
import { scrollBarStyle } from "@constants/utils";

import { contentData } from "../constants/utils";

function Index() {
  const [hasChannel, setHasChannel] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  const { data, isLoading } = useGetContentsQuery("");
  const [categoryId, setCategoryId] = useState("");
  const videosByCategory = useGetContentsByCategoryQuery(categoryId);
  const categories = useCategoryQuery("");
  const [category, setCategory] = useState("All");
  const [contents, setContents] = useState<contentData[]>([]);
  const router = useRouter();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    if (category === "All") {
      setContents(data?.data?.preference?.videos);
    } else {
      setContents(videosByCategory.data?.data?.preference?.videos);
    }
  }, [
    category,
    data?.data?.preference?.videos,
    videosByCategory.data?.data?.preference?.videos,
  ]);
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery("channel");

  useEffect(() => {
    if (!channelLoading && channelData?.channelData?.channel === null) {
      setHasChannel(false);
    }
  }, [channelLoading, channelData, hasChannel]);


  return (
    <>
      <HomeLayout>
        <Flex>
          <SideMenu />
          <Box
            maxH={"90vh"}
            pb="50px"
            px="30px"
            w={"calc(100vw - 500px)"}
            overflowY={"scroll"}
            overflowX={"hidden"}
            sx={scrollBarStyle}
          >
            <LiveTopCard />

            {categories.data && (
              <>
                <Divider />
                <TagSection
                  categories={categories.data.data}
                  category={category}
                  setCategory={setCategory}
                  setCategoryId={setCategoryId}
                />
                <Divider />
              </>
            )}

            {!contents?.length ? (
              <Box></Box>
            ) : (
              <>
                <VideoGrid
                  thumbWidth={{ lg: "220px", mlg: "280px", xl: "full" }}
                  width={"calc(100vw - 560px)"}
                  videos={contents}
                />
              </>
            )}
          </Box>
          <LiveEvents />
        </Flex>
      </HomeLayout>
    </>
  );
}

export default Index;
