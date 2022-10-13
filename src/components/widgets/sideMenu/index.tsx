import { Box, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import ChannelIcon from "@icons/ChannelIcon";
import DiscoverIcon from "@icons/DiscoverIcon";
import HomeIcon from "@icons/HomeIcon";
import LiveIcon from "@icons/LiveIcon";
import ProfileIcon from "@icons/ProfileIcon";
import SettingsIcon from "@icons/SettingsIcon";
import TrendingIcon from "@icons/TrendingIcon";
import WalletIcon from "@icons/WalletIcon";
import React from "react";
import EachMenu from "./EachMenu";
import EachSubscribe from "./EachSubscribe";
import { HiOutlineLogout } from "react-icons/hi";

function Index() {
  return (
    <Box
      w="250px"
      maxW="250px"
      minW="250px"
      bg="clique.black"
      h="90vh"
      minH="90vh"
      maxH="90vh"
      py={"20px"}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
          rounded: "full",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "#323232",
          outline: "none",
        },
      }}
    >
      {menu.map(
        (
          item: {
            name: string;
            icon: any;
          },
          index: number
        ) => (
          <EachMenu key={index} name={item.name} icon={item.icon} />
        )
      )}
      <Box px="50px" py="20px">
        <Divider />
      </Box>
      <Text
        pl="60px"
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
      >
        subscriptions
      </Text>
      {subcribees.map(
        (
          item: {
            name: string;
            imgUrl: any;
          },
          index: number
        ) => (
          <EachSubscribe key={index} name={item.name} imgUrl={item.imgUrl} />
        )
      )}
      <Box px="50px" py="20px">
        <Divider />
      </Box>

      <Flex
        transition={"all 0.2s ease-in-out"}
        _hover={{
          color: "clique.base",
        }}
        cursor={"pointer"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Text
          mr="10px"
          fontFamily={"Poppins"}
          fontWeight={400}
          textTransform={"capitalize"}
          fontSize={"14px"}
        >
          logout
        </Text>
        <Icon fontSize={"xl"} as={HiOutlineLogout} />
      </Flex>
    </Box>
  );
}

export default Index;

const menu = [
  {
    name: "home",
    icon: HomeIcon,
  },
  {
    name: "discover",
    icon: DiscoverIcon,
  },
  {
    name: "trending",
    icon: TrendingIcon,
  },
  {
    name: "profile",
    icon: ProfileIcon,
  },
  {
    name: "wallet",
    icon: WalletIcon,
  },
  {
    name: "Live Events",
    icon: LiveIcon,
  },
  {
    name: "Your channel",
    icon: ChannelIcon,
  },
  {
    name: "settings",
    icon: SettingsIcon,
  },
];

const subcribees = [
  {
    name: "burnaboy",
    imgUrl: "https://bit.ly/prosper-baba",
  },
  {
    name: "burnaboy",
    imgUrl: "https://bit.ly/prosper-baba",
  },
];
