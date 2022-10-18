import SideMenu from "@components/widgets/sideMenu";
import { Box, Divider, Flex, useDisclosure } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React, { ChangeEvent, useRef } from "react";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import LiveEvents from "@components/home/LiveEvents";
import UploadModal from "@components/upload/UploadModal";
import UploadPage from "@components/upload/UploadPage";

function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [source, setSource] = React.useState<File | undefined>();
  const [download, setDownload] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | any>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setSource(file);
    onClose();
    setDownload(true);
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  let base;

  if (!download) {
    base = (
      <Flex>
        <SideMenu />
        <Box
          maxH={"90vh"}
          pb="50px"
          px="30px"
          maxW={"calc(100vw - 500px)"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              rounded: "full",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "clique.primaryBg",
              outline: "none",
            },
          }}
        >
          <LiveTopCard />
          <Divider />
          <TagSection />
          <Divider />
          <VideoGrid />
        </Box>
        <LiveEvents />
      </Flex>
    );
  } else {
    base = <UploadPage src={source} />;
  }

  return (
    <HomeLayout upload={onOpen} toggleView={download}>
      <Box > 
      {base}

      </Box>
      <UploadModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        inputRef={inputRef}
        handleChoose={handleChoose}
        handleFileChange={handleFileChange}
      />
    </HomeLayout>
  );
}

export default Index;
