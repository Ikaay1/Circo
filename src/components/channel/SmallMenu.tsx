import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useToast,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Color from "@constants/color";
import { useDownloadLivestreamMutation } from "redux/services/livestream/live.service";

function SmallMenu({ streamId }: { streamId: string }) {
  const [downloadLivestream, info] = useDownloadLivestreamMutation();

  const toast = useToast();
  return (
    <Menu closeOnSelect>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        border="none"
        variant="outline"
        p="0"
      >
        <Icon as={HiOutlineDotsVertical} />
      </MenuButton>
      <MenuList
        fontFamily={"Poppins"}
        p="10px"
        pr="20px"
        bg={Color().blackAndWhite}
        border={"none"}
      >
        <MenuItem
          as={Button}
          isLoading={info.isLoading}
          onClick={async () => {
            try {
              const videoUrl: any = await downloadLivestream(streamId);
              if (videoUrl) {
                toast({
                  title: "Success",
                  position: "top-right",
                  description: "Video is downloading",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                window.open(videoUrl?.data?.data?.video, "_blank");
              }
            } catch (error: any) {
              toast({
                title: "Error",
                description: error.message || "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
          icon={<Icon as={TbDownload} />}
        >
          save to device
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default SmallMenu;
