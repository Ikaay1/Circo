import React, { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

import { Box, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import {
  menu,
  menuWithOutLive,
  scrollBarStyle,
  subcribees,
} from "@constants/utils";

import EachMenu from "./EachMenu";
import EachSubscribe from "./EachSubscribe";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "redux/slices/authSlice";

type Props = {
  hasChannel: boolean;
};

type Menu = {
  name: string;
  icon: any;
};

function Index({ hasChannel }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(menu);
  const [menuStateN, setMenuStateN] = useState(menuWithOutLive);
  const [computedMenu, setComputedMenu] = useState<Array<Menu>>([]);

  const handleLogout = () => {
    dispatch(logout);
    router.push("/");
  };
  useEffect(() => {
    hasChannel ? setComputedMenu(menuState) : setComputedMenu(menuStateN);
  }, [hasChannel, menuState, menuStateN]);

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
      sx={scrollBarStyle}
    >
      {computedMenu.map(
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
        onClick={handleLogout}
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
          fontSize={"smSubHead"}
        >
          logout
        </Text>
        <Icon fontSize={"head"} as={HiOutlineLogout} />
      </Flex>
    </Box>
  );
}

export default Index;
