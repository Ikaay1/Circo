import { useState } from "react";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { settingsMenu } from "@constants/utils";

type Props = {
  click: (route: string) => void;
};

const SideMenu = ({ click }: Props) => {
  const handleClick = (route: string) => {
    click(route);
    setState(route);
  };
  const [state, setState] = useState("account");

  return (
    <Box
      pt={{ lg: "5rem" }}
      borderRight={"1px solid rgba(255, 255, 255, 0.1)"}
      minW="250px"
      height="100%"
    >
      {settingsMenu.map(({ name, icon, route }, i) => (
        <Flex
          key={name}
          mt="5px"
          cursor={"pointer"}
          onClick={() => handleClick(route)}
          h="40px"
          position={"relative"}
          _before={{
            content: '""',
            display: state === route ? "block" : "none",
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
            pl="10"
            _hover={{
              color: "clique.base",
            }}
            transition={"all 0.2s ease-in-out"}
            color={state === route ? "clique.base" : "clique.whiteGrey"}
            alignItems={"center"}
          >
            <Icon as={icon} fontSize="l"/>
            <Text fontSize="xsl" fontFamily={"Poppins"} fontWeight={500} pl="5">
              {name}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default SideMenu;
