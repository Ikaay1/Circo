import ProtectedRoute from "layouts/ProtectedRoute";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";
import {
  MdAddCircleOutline,
  MdMenuOpen,
  MdOutlineClose,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { useGetUserQuery } from "redux/services/user.service";
import { logout } from "redux/slices/authSlice";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NotificationModal from "@components/notification/NotificationModal";
import SimpleSwitch from "@components/settings/SimpleSwitch";
import UploadModal from "@components/upload/UploadModal";
import Color from "@constants/color";
import CloseIcon from "@icons/CloseIcon";
import { googleLogout } from "@react-oauth/google";

import MobileMenu from "./mobileMenu/MobileMenu";
import SearchSuggestion from "./SearchSuggestion";

function OpenHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      alignItems={"center"}
      justifyContent="space-between"
      bg={Color().whiteAndBlack}
      px={{ base: "20px", lg: "50px" }}
      py="20px"
      h="10vh"
      minH={"10vh"}
      maxH={"10vh"}
      w="100%"
      maxW={"100%"}
    >
      <Box
        w={{ base: "70px", lg: "200px" }}
        cursor={"pointer"}
        // onClick={() => router.push("/home")}
        maxW={{ base: "70px", lg: "200px" }}
        minW={{ base: "70px", lg: "200px" }}
      >
        <Image
          alt="circo logo"
          w={{ base: "full", lg: "100px" }}
          src={
            colorMode === "dark"
              ? "/assets/Circo-Logo.png"
              : "/assets/Circo.png"
          }
        />
      </Box>

      {/* third div */}
      <HStack w="300px" spacing={"20px"} display={{ base: "none", lg: "flex" }}>
        <Button
          // rightIcon={<Icon fontSize={"lg"} as={BsBroadcast} />}
          variant="ghost"
          rounded={"full"}
          bg="clique.base"
          color="clique.white"
          fontFamily={"Poppins"}
          size={"sm"}
          px="30px"
          // onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          // rightIcon={<Icon fontSize={"lg"} as={BsBroadcast} />}
          variant="ghost"
          rounded={"full"}
          bg="clique.base"
          color="clique.white"
          fontFamily={"Poppins"}
          px="20px"
          size={"sm"}
          // onClick={() => router.push("/signup")}
        >
          Signup
        </Button>

        <SimpleSwitch
          text=" "
          isChecked={colorMode === "light" ? true : false}
          name="lightOrDark"
          onChange={toggleColorMode}
        />
      </HStack>
      <MobileMenu isOpen={showMenu} close={() => setShowMenu(!showMenu)} />
    </Flex>
  );
}

export default OpenHeader;
