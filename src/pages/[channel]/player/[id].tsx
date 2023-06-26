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

import { Box, Text, useToast } from "@chakra-ui/react";
import CliqueLoader from "@components/home/CliqueLoader";
import CommentSection from "@components/player/CommentSection";
import VideoDetails from "@components/player/VideoDetails";
import VideoPlayer from "@components/player/VideoPlayer";
import { decrypt, scrollBarStyle3 } from "@constants/utils";
import OpenLayout from "layouts/OpenLayout";
import axios from "axios";

function Index({ data }: { data: any }) {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  // const { data, isLoading, refetch, error } = useGetContentQuery<any>(id);
  const [url, setUrl] = React.useState("");

  useEffect(() => {
    async function display(videoStream: string) {
      setUrl(videoStream);
    }
    if (data?.data?.preference?.video?.video) {
      display(decrypt(data?.data?.preference?.video?.video));
    }
  }, [data?.data?.preference?.video?.video]);

  const [javascriptEnabled, setJavascriptEnabled] = React.useState(false);

  //check if javascript is enabled

  useEffect(() => {
    setJavascriptEnabled(true);
  }, []);

  return (
    <>
      <OpenLayout>
        <noscript>
          <VideoDetails
            video={data?.data?.preference?.video}
            subscribers={
              data?.data?.preference?.video?.uploader_id?.subscribers
            }
          />
        </noscript>
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
            {javascriptEnabled && data?.data?.preference?.video?.isFree && (
              <VideoPlayer
                video={data?.data?.preference?.video}
                videoIdsList={data?.data?.preference?.allVideos}
                url={url}
                setUrl={setUrl}
              />
            )}
          </Box>

          <CommentSection id={id} />
        </Box>
      </OpenLayout>
    </>
  );
}

export default Index;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { data } = await axios.get(
    `https://api.circo.africa/content/upload-video/${id}`
  );

  return {
    props: {
      data,
    },
  };
}
