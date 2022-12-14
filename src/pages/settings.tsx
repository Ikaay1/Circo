import HomeLayout from 'layouts/HomeLayout';
import { useState } from 'react';

import { Box, useClipboard, useDisclosure, useToast } from '@chakra-ui/react';
import Index from '@components/settings/Index';
import SideMenu from '@components/settings/SideMenu';
import Header from '@components/widgets/Header';
import { scrollBarStyle3, settingsMenu } from '@constants/utils';

const Settings = () => {
  const [state, setState] = useState<string>('account');
  const [code, setCode] = useState<string>('');
  const {hasCopied, onCopy} = useClipboard(code as string);
  const toast = useToast();
  const handleCopied = (code: string) => {
    setCode(code);
    setTimeout(() => {
      onCopy();
    }, 1000);
    toast({
      title: 'Copied',
      description: 'copied to your clipboard!',
      status: 'success',
      duration: 1000,
    });
  };

  return (
    <HomeLayout>
      <Box h={{lg: '90vh'}} display='flex' bg='clique.primaryBg'>
        <Box flex='1' h='100%'>
          <SideMenu
            click={(route) => setState(route)}
            menuList={settingsMenu}
          />
        </Box>
        <Box
          flex='4.4'
          h='100%'
          maxH={'90vh'}
          pb='12'
          overflowY={'scroll'}
          overflowX={'hidden'}
          sx={scrollBarStyle3}
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
