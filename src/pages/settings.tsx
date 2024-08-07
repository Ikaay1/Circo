import HomeLayout from 'layouts/HomeLayout';
import {useState} from 'react';

import {Box, useClipboard, useDisclosure, useToast} from '@chakra-ui/react';
import Index from '@components/settings/Index';
import SideMenu from '@components/settings/SideMenu';
import Color from '@constants/color';
import {scrollBarStyle3, settingsMenu} from '@constants/utils';

const Settings = () => {
  const [state, setState] = useState<string>('account');
  // const [code, setCode] = useState<string>("");
  const {hasCopied, onCopy, value, setValue} = useClipboard(
    // code as string
    '',
  );
  const toast = useToast();
  const handleCopied = () =>
    // code: string
    {
      // setCode(code);
      // setTimeout(() => {
      onCopy();
      // }, 1000);
      toast({
        title: 'Copied',
        description: 'copied to your clipboard!',
        status: 'success',
        duration: 1000,
      });
    };

  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <HomeLayout>
      <Box h={{lg: '90vh'}} display='flex' bg={Color().lightAndPrimary}>
        <Box
          flex='1'
          h='100%'
          display={{base: 'block', lg: 'none'}}
          transition='all 0.3s ease-in-out'
          transform={showSideMenu ? 'translateX(0)' : 'translateX(-100%)'}
          position={{base: 'fixed', lg: 'relative'}}
          zIndex={100}
          bg={Color().lightAndPrimary}
        >
          <Box display={{base: 'block', lg: 'none'}}>
            <SideMenu
              click={(route) => setState(route)}
              menuList={settingsMenu}
              setShowSideMenu={setShowSideMenu}
            />
          </Box>
        </Box>

        <Box
          display={{base: 'none', lg: 'block'}}
          flex='1'
          h='100%'
          transition='all 0.3s ease-in-out'
          position={{base: 'fixed', lg: 'relative'}}
          zIndex={100}
          bg={Color().lightAndPrimary}
        >
          <SideMenu
            click={(route) => setState(route)}
            menuList={settingsMenu}
          />
        </Box>

        <Box
          flex={{lg: '4.4'}}
          h='100%'
          maxH={'90vh'}
          pb={{base: '5', lg: '12'}}
          overflowY={'scroll'}
          overflowX={'hidden'}
          sx={scrollBarStyle3}
        >
          <Index
            setShowSideMenu={setShowSideMenu}
            showSideMenu={showSideMenu}
            current={state as string}
            onClick={handleCopied}
            setValue={setValue}
          />
        </Box>
      </Box>
    </HomeLayout>
  );
};

export default Settings;
export {getServerSideProps} from '../components/widgets/Chakara';
