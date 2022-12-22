import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";

function SmallMenu({ playbackId }: { playbackId?: string }) {
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
        bg="clique.black"
        border={"none"}
      >
        <MenuItem
          onClick={() => {
            window.open(
              `https://stream.mux.com/${playbackId}.m3mp4u8`,
              "_blank"
            );
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
