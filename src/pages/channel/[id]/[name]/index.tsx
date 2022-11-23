import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Index from "@components/channel";
import SideMenu from "@components/profile/SideMenu";
import Header from "@components/widgets/Header";
import { channelMenu } from "@constants/utils";
import useGet from "hooks/useGet";
import { useState } from "react";
import { useGetChannelQuery } from "redux/services/channel.service";
import { useGetUserContentsQuery } from "redux/services/content.service";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetUserContentsQuery({
    page,
    limit: 3,
  });
  const { contents, lastElementRef, loading } = useGet({
    data,
    isFetching,
    isLoading,
    fetchNumber: 3,
    page,
    setPage,
  });
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery("");
  return (
    <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
      <Header upload={onOpen} />
      <Box h={{ lg: "90vh" }} display="flex">
        <Box flex="1.3" h="100%">
          <SideMenu menu={channelMenu} />
        </Box>
        <Box flex="5.5" h="100%">
          <Index
            channelData={channelData}
            isLoading={isLoading}
            data={contents}
            channelLoading={channelLoading}
            lastElementRef={lastElementRef}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
