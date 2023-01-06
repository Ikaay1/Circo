import { useState } from "react";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Color from "@constants/color";

export type SideMenu = {
  name: string;
  icon: (props: any) => JSX.Element;
  route: string;
};

type Props = {
  click?: (route: string) => void;
  menuList: SideMenu[];
  create?: boolean;
  setShowSideMenu?: (value: boolean) => void;
};

const SideMenu = ({ click, menuList, create, setShowSideMenu }: Props) => {
  const handleClick = (route: string) => {
    if (click) {
      click(route);
    }
    setState(route);

    if (setShowSideMenu) {
      setShowSideMenu(false);
    }
  };
  let currentState = "";
  create ? (currentState = "channel") : (currentState = "account");
  const [state, setState] = useState(currentState);
  return (
    <Box
      pt={{ lg: "5rem" }}
      borderRight={"1px solid rgba(255, 255, 255, 0.1)"}
      minW="250px"
      height="100%"
      h="90vh"
      minH="90vh"
      maxH="90vh"
    >
      {menuList.map(({ name, icon, route }, i) => (
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
            color={state === route ? "clique.base" : Color().blackAndWhite}
            alignItems={"center"}
          >
            <Icon as={icon} fontSize={create ? "sm2" : "l"} />
            <Text
              fontSize={create ? "sm2" : "xsl"}
              fontFamily={"Poppins"}
              fontWeight={500}
              pl="5"
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default SideMenu;
