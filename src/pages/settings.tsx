import { useState } from "react";
import { Box, useDisclosure, useClipboard, useToast } from "@chakra-ui/react";
import Index from "@components/settings/Index";
import SideMenu from "@components/settings/SideMenu";
import Header from "@components/widgets/Header";
import { scrollBarStyle } from "@constants/utils";
import { settingsMenu } from "@constants/utils";
import HomeLayout from "layouts/HomeLayout";

const Settings = () => {
  const [state, setState] = useState<string>("account");
  const [code, setCode] = useState<string>("D657Y85");
  const { hasCopied, onCopy } = useClipboard(code as string);
  const toast = useToast();
  const handleCopied = (code: string) => {
    setCode(code);
    onCopy();
    toast({
      title: "Copied",
      description: "copied to your clipboard!",
      status: "success",
      duration: 1000,
    });
  };

  return (
    <HomeLayout>
      <Box h={{ lg: "90vh" }} display="flex" bg="clique.primaryBg">
        <Box flex="1" h="100%">
          <SideMenu
            click={(route) => setState(route)}
            menuList={settingsMenu}
          />
        </Box>
        <Box
          flex="4.4"
          h="100%"
          maxH={"90vh"}
          pb="12"
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <Index
            current={state as string}
            onClick={(code) => handleCopied(code)}
          />
        </Box>
      </Box>
    </HomeLayout>
  );
};

export default Settings;
