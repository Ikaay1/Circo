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
import OpenLayout from "layouts/OpenLayout";

function Index() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, refetch, error } = useGetContentQuery<any>(id);
  const [url, setUrl] = React.useState("");
  const { token } = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    async function display(videoStream: string) {
      setUrl(videoStream);
    }
    if (data?.data?.preference?.video?.video) {
      display(decrypt(data?.data?.preference?.video?.video));
    }
  }, [data?.data?.preference?.video?.video]);

  useEffect(() => {
    if (!isLoading && !data?.data?.preference) {
      toast({
        title: "Error",
        description: "Video not found",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
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

      {!isLoading && data?.data && url && (
        <OpenLayout>
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
              {data?.data?.preference?.video?.isFree && (
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

            <CommentSection id={id} />
          </Box>
        </OpenLayout>
      )}
    </>
  );
}

export default Index;

export { getServerSideProps } from "../../../components/widgets/Chakara";
