import React, { useState } from "react";

import { Box, useDisclosure } from "@chakra-ui/react";
import SideMenu from "@components/settings/SideMenu";
import Index, { SettingsProps } from "@components/settings/Index";
import Header from "@components/widgets/Header";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState<string>("account");

  return (
    <Box>
      <Header upload={onOpen} />
      <Box h={{ lg: "90vh" }} display="flex" bg="clique.primaryBg">
        <Box flex="1" h="100%">
          <SideMenu click={(route) => setState(route)} />
        </Box>
        <Box flex="4.4" h="100%">
          <Index current={state as string} />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
