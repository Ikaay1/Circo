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
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";
import { MdAddCircleOutline, MdOutlineNotificationsNone } from "react-icons/md";

function Header() {
  const [searchWidth, setSearchWidth] = React.useState("300px");

  return (
    <Flex
      alignItems={"center"}
      justifyContent="space-between"
      bg={"clique.black"}
      px="50px"
      py="20px"
    >
      {/* First div  */}
      <Box w="300px" maxH="32px">
        <Image alt="clique logo" h="100%" src="/clique-logo.png" />
      </Box>

      {/* Second div */}
      <Flex
        px="20px"
        w="full"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <InputGroup w={searchWidth} transition="all 1s ease">
          <InputLeftElement px="20px" pointerEvents="none">
            <Icon fontSize={"20px"} color="white" as={AiOutlineSearch} />
          </InputLeftElement>
          <Input
            bg="#1D1D1C"
            onFocus={() => setSearchWidth("500px")}
            onBlur={() => setSearchWidth("300px")}
            _focus={{
              boxShadow: "none",
              border: " 3px solid #424242",
            }}
            border={" 3px solid #424242"}
            rounded="full"
            type="tel"
            fontFamily={"Poppins"}
            _placeholder={{
              color: "#fff",
            }}
            placeholder="search"
          />
        </InputGroup>
        <HStack alignItems={"center"}>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            p="3px"
            bg="#323232"
            rounded="full"
          >
            <Avatar
              p="0"
              bg="#323232"
              icon={<Icon fontSize={"xl"} as={MdOutlineNotificationsNone} />}
              size="sm"
            >
              <AvatarBadge
                bg="clique.base"
                top={"0"}
                right={"5px"}
                boxSize="10px"
                border="none"
                fontSize={"8px"}
              >
                3
              </AvatarBadge>
            </Avatar>
          </Flex>
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
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
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
        >
          Go live
        </Button>
        <Button
          rightIcon={<Icon fontSize={"lg"} as={MdAddCircleOutline} />}
          variant="ghost"
          rounded={"full"}
          bg="clique.base"
          fontFamily={"Poppins"}
          size={"sm"}
        >
          Upload
        </Button>
      </HStack>
    </Flex>
  );
}

export default Header;
