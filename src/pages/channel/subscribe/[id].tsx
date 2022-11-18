import { useRouter } from "next/router";
import { useGetIndividualChannelQuery } from "redux/services/channel.service";
import { useGetSingleUserContentQuery } from "redux/services/content.service";

import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Index from "@components/channel";
import Header from "@components/widgets/Header";
import SideMenu from "@components/widgets/sideMenu";
import UnsubscribeModal from "@components/channel/subscribe/UnsubscribeModal";
import SubscribeModal from "@components/channel/subscribe/SubscribeModal";

const SubscribeChannel = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const {
    isLoading: channelLoading,
    isFetching,
    data: channelData,
  } = useGetIndividualChannelQuery(id);
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

  const { data, isLoading } = useGetSingleUserContentQuery(id);
  const handleSubscription = () => {
    // onOpen();
    isSubOnOpen()
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
              data={data}
              channelLoading={channelLoading}
              isLoading={isLoading}
              onClick={handleSubscription}
            />
          </Box>
        </Box>
        <UnsubscribeModal
          isOpen={isOpen}
          onClose={onClose}
          name={channelData?.data?.channel?.name}
          isLoading={isLoading}
          onClick={() => console.log("i was clicked")}
        />
        <SubscribeModal
          isOpen={isSubOpen}
          onClose={isSubOnClose}
          onClick={() => console.log("yeyeyeye")}
          bio={channelData?.data?.channel?.bio}
          isLoading={isLoading}
        />
      </>
    </Box>
  );
};

export default SubscribeChannel;
