import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import {
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
} from "redux/services/playlist.service";

import {
  Box,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProfileDetails from "@components/channel/ProfileDetails";
import Sure from "@components/channel/Sure";
import TrashIconRed from "@icons/TrashIconRed";

import PlaylistList from "./PlaylistList";

export type Playlist = {
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  userId: string;
  videos: Videos[];
  _id: string;
};

export interface Videos {
  category_name: string;
  thumbNail: string;
  title: string;
  video: string;
  _id: string;
}

export interface PlaylistProps {
  playlist?: Playlist;
}
const PlaylistSide = ({
  playlist,
  isLoading,
  id,
}: {
  playlist?: Playlist;
  isLoading?: Boolean;
  id: string;
}) => {
  const router = useRouter();
  const [state, setState] = useState<Array<Playlist>>();
  const { data, isLoading: playLoading, isFetching } = useGetPlaylistQuery(id);
  const [deletePlaylist, deletePlaylistStatus] = useDeletePlaylistMutation();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);

  useEffect(() => {
    if (!isLoading && data && playlist) {
      const otherPlaylist = data?.data?.playlists?.filter((each: any) => {
        return each._id !== playlist._id;
      });
      setState(otherPlaylist);
    }
  }, [isLoading, data, playlist]);
  return (
    <Box>
      {!isLoading && playlist ? (
        <Box mt="3rem">
          {playlist?.cover ? (
            <Image
              src={playlist?.cover}
              w="100%"
              objectFit={"cover"}
              h="150px"
              borderRadius="10px"
              alt=""
            />
          ) : (
            <Flex
              w="100%"
              h="150px"
              borderRadius="10px"
              bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
            ></Flex>
          )}

          <Text
            fontFamily={"Unbounded"}
            fontSize="sm2"
            lineHeight="28px"
            color="clique.white"
            textAlign={"center"}
            mt="1.1rem"
          >
            {playlist?.name}
          </Text>
          <Text
            fontFamily={"Unbounded"}
            fontSize="smSubHead"
            lineHeight="24px"
            color="clique.secondaryGrey2"
            textAlign={"center"}
          >
            {playlist?.videos?.filter((each) => each?.video !== null)?.length}{" "}
            {playlist?.videos?.filter((each) => each?.video !== null)
              ?.length !== 1
              ? "Videos"
              : "Video"}
          </Text>
          <Flex
            alignItems="center"
            justifyContent={"center"}
            cursor="pointer"
            my={"2rem"}
            onClick={onOpen}
          >
            <Icon
              as={TrashIconRed}
              fontSize="15px"
              cursor="pointer"
              color="clique.secondaryRed"
            ></Icon>
            <Text ml="2" color="clique.secondaryRed">
              Delete Playlist
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box>
          <Skeleton h="150px" borderRadius="10px" />
          <VStack w="100%" mt="2">
            <Skeleton w="50%" height="15px" />
            <Skeleton w="30%" height="10px" />
          </VStack>
        </Box>
      )}
      <Box>
        {state?.length
          ? state?.map((each, i) => (
              <>
                <Text color="clique.text" fontSize={"sm"} mb="3">
                  Playlist
                </Text>
                <Text
                  key={i}
                  cursor="pointer"
                  onClick={() =>
                    router.push(`/channel/1/content/playlist/${each._id}`)
                  }
                  fontSize={"subHead"}
                  mb="3"
                  color="clique.white"
                >
                  {each.name}
                </Text>
              </>
            ))
          : null}
      </Box>
      <Sure
        isOpen={isOpen}
        onClose={onClose}
        header="Delete Playlist"
        description="Are you sure you want to delete this playlist?"
        buttonText="Delete"
        isLoading={deletePlaylistStatus.isLoading}
        onClick={async () => {
          await deletePlaylist(playlist?._id);
          toast({
            title: "Playlist deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          router.back();
        }}
      />
    </Box>
  );
};

export default PlaylistSide;
