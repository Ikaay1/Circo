import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import HomeIcon from "@icons/HomeIcon";
import { useRouter } from "next/router";
import React from "react";

function EachMenu({ name, icon }: { name: string; icon: any }) {
  const router = useRouter();
  const path = router.pathname;

  const hrefName = name.replace(/\s/g, "").toLowerCase();
  return (
    <Flex
      mt="5px"
      cursor={"pointer"}
      onClick={() => router.push(`/${hrefName}`)}
      h="40px"
      position={"relative"}
      _before={{
        content: '""',
        display: path === "/" + name ? "block" : "none",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: 0,
        width: "6px",
        height: "25px",
        background: "clique.base",
        borderRightRadius: "4px",
        boxShadow: "10px 0px 18px #892CDC",
      }}
    >
      <Flex
        pl="50px"
        _hover={{
          color: "clique.base",
        }}
        transition={"all 0.2s ease-in-out"}
        color={path === "/" + hrefName ? "clique.base" : "clique.whiteGrey"}
        alignItems={"center"}
      >
        <Icon as={icon} mr="15px" />
        <Text
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
        >
          {name}
        </Text>
      </Flex>
    </Flex>
  );
}

export default EachMenu;
