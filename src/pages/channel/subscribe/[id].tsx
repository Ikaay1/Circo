import useGet from "hooks/useGet";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import { useGetIndividualChannelQuery } from "redux/services/channel.service";
import {
  useGetSingleUserContentQuery,
  useSubscribeToUserChannelMutation,
} from "redux/services/content.service";
import { useGetUserQuery } from "redux/services/user.service";

import {
  Box,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Index from "@components/channel";
import SubscribeModal from "@components/channel/subscribe/SubscribeModal";
import UnsubscribeModal from "@components/channel/subscribe/UnsubscribeModal";
import Header from "@components/widgets/Header";
import SideMenu from "@components/widgets/sideMenu";
import Color from "@constants/color";

type Subcribers = {
  _id: string;
  firstName: string;
  lastName: string;
};
const SubscribeChannel = () => {
  const router = useRouter();
  const [subcribeToUserChannnel, subcribeToUserChannnelStatus] =
    useSubscribeToUserChannelMutation();
  const id = router?.query?.id;
  const toast = useToast();
  const {
    isLoading: channelLoading,
    isFetching,
    data: channelData,
  } = useGetIndividualChannelQuery(id);
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const {
    isLoading: userLoading,
    data: userData,
    refetch,
    isFetching: isUserFetching,
  } = useGetUserQuery(id);
  const [state, setState] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    if (userProfile?._id === id) {
      window.location.replace("/channel/1/content");
    }
  }, [userProfile?._id, id]);

  useEffect(() => {
    if (!userLoading && userData) {
      const buttonText = userData?.data?.subscribers?.find(
        (each: Subcribers) => {
          return each._id === userProfile?._id;
        }
      );
      if (buttonText) {
        setState("Subscribed");
        const dateText = userData?.data?.subscribeTime?.find(
          (one: any) => one.id === userProfile?._id
        );
        // setDate(moment(dateText?.expiresIn).fromNow());
        const difference =
          new Date(dateText?.expiresIn).getTime() - new Date().getTime();
        let TotalDays = Math.floor(difference / (1000 * 3600 * 24));
        setDate(`${TotalDays}`);
      } else {
        setState("Subscribe");
      }
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
  const handleSubscription = () => {
    if (state === "Subscribe") {
      isSubOnOpen();
    }
  };

  const subscribeHandler = async () => {
    const res: any = await subcribeToUserChannnel({
      amount: channelData?.data?.channel?.subscriptionFee
        ? channelData?.data?.channel?.subscriptionFee
        : 0,
      description: "Payment for subscription",
      receiversId: channelData?.data?.channel?.userId,
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
      setState("Subscribed");
      window.location.reload();
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
    <Box bg={Color().lightAndPrimary}>
      <>
        <Header upload={onOpen} />
        <Box h="90vh" display={{ lg: "flex" }}>
          <Box flex="1.3" h="100%" display={{ base: "none", lg: "block" }}>
            <SideMenu />
          </Box>
          <Box flex={{ lg: "5.5" }} h="100%">
            <Index
              channelData={channelData}
              data={contents}
              channelLoading={channelLoading}
              isLoading={isLoading}
              onClick={handleSubscription}
              buttonText={state}
              lastElementRef={lastElementRef}
              isFetching={isUserFetching}
              date={date}
            />
          </Box>
        </Box>
        {/* <UnsubscribeModal
          isOpen={isOpen}
          onClose={onClose}
          name={channelData?.data?.channel?.name}
          isLoading={isLoading}
          onClick={subscribeHandler}
        /> */}
        <SubscribeModal
          isOpen={isSubOpen}
          onClose={isSubOnClose}
          onClick={subscribeHandler}
          bio={channelData?.data?.channel?.bio}
          fee={channelData?.data?.channel?.subscriptionFee}
          info={channelData?.data?.channel?.subscriptionInfo}
          isLoading={isLoading}
          status={subcribeToUserChannnelStatus}
        />
      </>
    </Box>
  );
};

export default SubscribeChannel;
export { getServerSideProps } from "../../../components/widgets/Chakara";
