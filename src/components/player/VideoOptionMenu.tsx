import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import DownloadIcon from "@icons/DownloadIcon";
import LoopIcon from "@icons/LoopIcon";
import OptionsIcon from "@icons/OptionsIcon";
import React, { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";

function VideoOptionMenu({ player }: any) {
  const [isLoop, setIsLoop] = React.useState<any>(null);

  useEffect(() => {
    if (player.current) {
      player.current.subscribeToStateChange((state: any) => {
        if (state.loop) {
          setIsLoop(true);
        }
      });
    }
  }, [isLoop]);

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label="Options">
        <Icon fontSize="28px" mx="30px" cursor={"pointer"} as={OptionsIcon} />
      </MenuButton>
      <MenuList
        fontFamily={"Poppins"}
        p="30px"
        pr="60px"
        bg="clique.black"
        border={"none"}
      >
        <MenuItem
          icon={
            <Icon
              fontSize={"24px"}
              onClick={() => {
                //downloaf video
                player.current.download();
              }}
              as={DownloadIcon}
            />
          }
        >
          Save Video
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsLoop(isLoop ? false : true);
            player.current.loop = player.current.loop ? false : true;
          }}
          icon={<Icon fontSize={"24px"} as={LoopIcon} />}
        >
          Loop Video <Text as="span">({isLoop ? "On" : "Off"})</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default VideoOptionMenu;
