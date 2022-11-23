import { useRouter } from "next/router";
import { useGetIndividualChannelQuery } from "redux/services/channel.service";
import { useGetSingleUserContentQuery } from "redux/services/content.service";

import {
  Box,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import Index from "@components/channel";
import SubscribeModal from "@components/channel/subscribe/SubscribeModal";
import UnsubscribeModal from "@components/channel/subscribe/UnsubscribeModal";
import Header from "@components/widgets/Header";
import SideMenu from "@components/widgets/sideMenu";
import useGet from "hooks/useGet";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import {
  useGetUserQuery,
  useSubscribeToUserChannelMutation
} from "redux/services/user.service";

type Subcribers = {
  _id: string;
  firstName: string;
  lastName: string;
};
const SubscribeChannel = () => {
  const router = useRouter();
  const [subcribeToUserChannnel] = useSubscribeToUserChannelMutation();
  const id = router?.query?.id;
  const toast = useToast();
  const {
    isLoading: channelLoading,
    isFetching,
    data: channelData,
  } = useGetIndividualChannelQuery(id);
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { isLoading: userLoading, data: userData } = useGetUserQuery(id);
  const [state, setState] = useState<string>();

  useEffect(() => {
    if (!userLoading && userData) {
      const buttonText = userData?.data?.subscribers?.find(
        (each: Subcribers) => {
          return each._id === userProfile._id;
        }
      );
      buttonText ? setState("Unsubscribe") : setState("Subscribe");
    }
  }, [userLoading, userData, userProfile]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isSubOpen,
    onOpen: isSubOnOpen,
    onClose: isSubOnClose,
  } = useDisclosure();

  // const {
  //   isOpen: isSortIsOpen,
  //   onOpen: isSortOnOpen,
  //   onClose: isSortOnClose,
  // } = useDisclosure();
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isFetching: videoFetch,
  } = useGetSingleUserContentQuery({
    id,
    page,
    limit: 3,
  });
  const { contents, lastElementRef, loading } = useGet({
    data,
    isFetching: videoFetch,
    isLoading,
    fetchNumber: 3,
    page,
    setPage,
  });
  console.log({ data });
  const handleSubscription = () => {
    state === "Subscribe" ? isSubOnOpen() : onOpen();
  };

  const subscribeHandler = async () => {
    const res: any = await subcribeToUserChannnel({
      subscribingToId: id,
    });
    if ("data" in res) {
      toast({
        title: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      isSubOnClose();
      res.data.message.includes("subscribed")
        ? setState("Unsubscribe")
        : setState("Subscribe");
    } else if (res.error) {
      toast({
        title: res.error.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
      <>
        <Header upload={onOpen} />
        <Box h={{ lg: "90vh" }} display="flex">
          <Box flex="1.3" h="100%">
            <SideMenu />
          </Box>
          <Box flex="5.5" h="100%">
            <Index
              channelData={channelData}
              data={contents}
              channelLoading={channelLoading}
              isLoading={isLoading}
              onClick={handleSubscription}
              buttonText={state}
              lastElementRef={lastElementRef}
            />
          </Box>
        </Box>
        <UnsubscribeModal
          isOpen={isOpen}
          onClose={onClose}
          name={channelData?.data?.channel?.name}
          isLoading={isLoading}
          onClick={subscribeHandler}
        />
        <SubscribeModal
          isOpen={isSubOpen}
          onClose={isSubOnClose}
          onClick={subscribeHandler}
          bio={channelData?.data?.channel?.bio}
          isLoading={isLoading}
        />
      </>
    </Box>
  );
};

export default SubscribeChannel;
