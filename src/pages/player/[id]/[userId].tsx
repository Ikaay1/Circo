import HomeLayout from "layouts/HomeLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "redux/app/hooks";
import {
  useCreateViewMutation,
  useGetContentQuery,
} from "redux/services/content.service";
import { useGetUserQuery } from "redux/services/user.service";

import { Box, useToast } from "@chakra-ui/react";
import CliqueLoader from "@components/home/CliqueLoader";
import CommentSection from "@components/player/CommentSection";
import VideoDetails from "@components/player/VideoDetails";
import VideoPlayer from "@components/player/VideoPlayer";
import { decrypt, scrollBarStyle3 } from "@constants/utils";

function Index() {
  const toast = useToast();
  const router = useRouter();
  const { id, userId } = router.query;
  const { data, isLoading, refetch, error } = useGetContentQuery<any>(id);
  const { data: userData } = useGetUserQuery<any>(userId);
  const [view] = useCreateViewMutation();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const [url, setUrl] = React.useState("");

  const createView = async () => {
    await view({ video_id: data?.data?.preference?.video?._id });
  };

  useEffect(() => {
    if (error && userData) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      router.push(`/channel/${userData?.data?.channel_id?.name}`);
    } else {
    }
  }, [data, error, userData]);

  useEffect(() => {
    if (data) {
      if (
        data?.data?.preference?.video?.uploader_id?._id !== userProfile?._id
      ) {
        createView();
      }
    }
  }, [data, view, userProfile?._id, refetch]);

  useEffect(() => {
    async function display(videoStream: string) {
      setUrl(videoStream);
      console.log(videoStream , "videoStream");
    }
    if (data?.data?.preference?.video?.video) {
      display(decrypt(data?.data?.preference?.video?.video));
    }
  }, [data?.data?.preference?.video?.video]);

  useEffect(() => {
    if (!isLoading && !data?.data?.preference) {
      router.push("/home");
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ||
        !data?.data ||
        (!url && (
          <Box h="90vh" w="100%">
            <CliqueLoader />
          </Box>
        ))}
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2071647719246163"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {!isLoading && data?.data && url && (
        <HomeLayout>
          <Box display={{ lg: "flex" }}>
            <Box
              maxH={"90vh"}
              pb={{ base: "30px", lg: "50px" }}
              px={{ base: "10px", lg: "30px" }}
              maxW={{ base: "100%", lg: "calc(100vw - 400px)" }}
              w={{ base: "100%", lg: "calc(100vw - 400px)" }}
              overflowY={"scroll"}
              overflowX={"hidden"}
              sx={scrollBarStyle3}
            >
              {/* {data?.data?.preference?.video?.isFree && (
                <AdVideoJsPlayer
                  url={url}
                  video={data?.data?.preference?.video}
                  videoIdsList={data?.data?.preference?.allVideos}
                />
              )} */}
              {data?.data?.preference?.video?.isFree && (
                <VideoPlayer
                  video={data?.data?.preference?.video}
                  videoIdsList={data?.data?.preference?.allVideos}
                  url={url}
                  // url={data?.data?.preference?.video._id}
                  setUrl={setUrl}
                />
              )}
              {!data?.data?.preference?.video?.isFree && (
                <VideoPlayer
                  video={data?.data?.preference?.video}
                  videoIdsList={data?.data?.preference?.allVideos}
                  url={url}
                  setUrl={setUrl}
                />
              )}
              <VideoDetails
                video={data?.data?.preference?.video}
                subscribers={
                  data?.data?.preference?.video?.uploader_id?.subscribers
                }
              />
            </Box>
            {/* @ts-ignore */}
            <CommentSection id={id} />
          </Box>
        </HomeLayout>
      )}
    </>
  );
}

export default Index;

export { getServerSideProps } from "../../../components/widgets/Chakara";
