import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";
import { MdAddCircleOutline, MdOutlineNotificationsNone } from "react-icons/md";
import { useAppSelector } from "redux/app/hooks";

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
} from "@chakra-ui/react";
import UploadModal from "@components/upload/UploadModal";
import NotificationModal from "@components/notification/NotificationModal";

type Props = {
  upload?: () => void;
};

function Header({ upload }: Props) {
  const profile = useAppSelector((store) => store.app.userReducer.userProfile);
  const [searchWidth, setSearchWidth] = useState("300px");
  const router = useRouter();
  const [search, setSearch] = useState("");

  const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search) {
        router.push(`/search/${search}`);
      }
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent="space-between"
      bg={"clique.black"}
      px="50px"
      py="20px"
      h="10vh"
      minH={"10vh"}
      maxH={"10vh"}
      w="100%"
    >
      {/* First div  */}
      <Box
        w="200px"
        cursor={"pointer"}
        onClick={() => router.push("/home")}
        maxW="200px"
        minW="200px"
      >
        <Image alt="clique logo" h="100%" src="/assets/Clique-Logo.svg" />
      </Box>

      {/* Second div */}
      <Flex
        w="full"
        px="30px"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <InputGroup w={searchWidth} transition="all 1s ease">
          <InputLeftElement px="20px">
            <Icon
              fontSize={"smHead"}
              color="clique.white"
              as={AiOutlineSearch}
              cursor={"pointer"}
              onClick={() => {
                if (search) {
                  router.push(`/search/${search}`);
                }
              }}
            />
          </InputLeftElement>
          <Input
            onKeyPress={(e) => _handleKeyDown(e)}
            bg="clique.inputBg"
            onFocus={() => setSearchWidth("500px")}
            onBlur={() => setSearchWidth("300px")}
            _focus={{
              boxShadow: "none",
              border: " 3px solid ",
              borderColor: "clique.inputBorder",
            }}
            border={" 3px solid "}
            borderColor={"clique.inputBorder"}
            rounded="full"
            type="tel"
            fontFamily={"Poppins"}
            _placeholder={{
              color: "clique.white",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </InputGroup>

        <HStack alignItems={"center"}>
          <NotificationModal />
          <Flex
            alignItems={"center"}
            justifyContent="center"
            p="2px"
            background="linear-gradient(90deg, rgba(137, 44, 220, 1), rgba(110, 147, 241, 1))"
            rounded="full"
          >
            <Avatar
              p="0"
              size="sm"
              name={profile?.firstName + " " + profile?.lastName}
              src={profile?.photo}
            />
          </Flex>
        </HStack>
      </Flex>

      {/* third div */}
      <HStack w="300px" spacing={"20px"}>
        <Button
          rightIcon={<Icon fontSize={"lg"} as={BsBroadcast} />}
          variant="ghost"
          rounded={"full"}
          bg="clique.base"
          fontFamily={"Poppins"}
          size={"sm"}
          onClick={() => router.push("/golive")}
        >
          Go live
        </Button>
        <UploadModal />
      </HStack>
    </Flex>
  );
}

export default Header;
