import {useRouter} from 'next/router';
import React from 'react';

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import Color from '@constants/color';

function EachMenu({name, icon, type, item, close}: any) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      {type === 'subMenu' ? (
        <AccordionItem border={'none'}>
          <AccordionButton
            p='0'
            position={'relative'}
            _before={{
              content: '""',
              display:
                path.split('/')[1] ===
                item.route.replace(/\s/g, '').toLowerCase()
                  ? 'block'
                  : 'none',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 0,
              width: '6px',
              height: '25px',
              background: 'clique.base',
              borderRightRadius: '4px',
              boxShadow: '10px 0px 18px #892CDC',
            }}
            h='40px'
          >
            <Flex
              as='span'
              flex='1'
              textAlign='left'
              alignItems={'center'}
              color={
                //matches any of the subMenu items
                path.split('/')[1] ===
                item.route.replace(/\s/g, '').toLowerCase()
                  ? 'clique.base'
                  : Color().blackAndWhite
              }
            >
              <Icon ml='50px' mr='15px' as={icon} />
              <Text
                fontFamily={'Poppins'}
                fontWeight={500}
                textTransform={'capitalize'}
              >
                {name}
              </Text>
            </Flex>
            <AccordionIcon
              color={
                path.split('/')[1] ===
                item.route.replace(/\s/g, '').toLowerCase()
                  ? 'clique.base'
                  : Color().blackAndWhite
              }
            />
          </AccordionButton>

          <AccordionPanel ml='50px'>
            {item.subMenu.map((subItem: any) => (
              <Flex
                key={subItem.name}
                mt='5px'
                cursor={'pointer'}
                onClick={() => {
                  router.push(`/${item.route}/${subItem.route}`);
                  close();
                }}
                h='40px'
                position={'relative'}
                _before={{
                  content: '""',
                  display:
                    path === '/' + name.replace(/\s/g, '').toLowerCase()
                      ? 'block'
                      : 'none',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: 0,
                  width: '6px',
                  height: '25px',
                  background: 'clique.base',
                  borderRightRadius: '4px',
                  boxShadow: '10px 0px 18px #892CDC',
                }}
              >
                <Flex
                  _hover={{
                    color: 'clique.base',
                  }}
                  transition={'all 0.2s ease-in-out'}
                  color={
                    path.split('/')[3] ===
                      subItem.route.replace(/\s/g, '').toLowerCase() &&
                    path.split('/')[1] ===
                      item.route.replace(/\s/g, '').toLowerCase()
                      ? 'clique.base'
                      : Color().blackAndWhite
                  }
                  alignItems={'center'}
                >
                  <Icon as={subItem.icon} />
                  <Text
                    ml={'15px'}
                    fontFamily={'Poppins'}
                    fontWeight={500}
                    textTransform={'capitalize'}
                  >
                    {subItem.name}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ) : (
        <Flex
          mt='5px'
          cursor={'pointer'}
          onClick={() => {
            if (type === 'menu') {
              router.push(`/${name.replace(/\s/g, '').toLowerCase()}`);
            }
          }}
          h='40px'
          position={'relative'}
          _before={{
            content: '""',
            display:
              path === '/' + name.replace(/\s/g, '').toLowerCase()
                ? 'block'
                : 'none',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            width: '6px',
            height: '25px',
            background: 'clique.base',
            borderRightRadius: '4px',
            boxShadow: '10px 0px 18px #892CDC',
          }}
        >
          <Flex
            pl='50px'
            _hover={{
              color: 'clique.base',
            }}
            transition={'all 0.2s ease-in-out'}
            color={
              path === '/' + name.replace(/\s/g, '').toLowerCase()
                ? 'clique.base'
                : Color().blackAndWhite
            }
            alignItems={'center'}
          >
            <Icon mr='15px' as={icon} />
            <Text
              fontFamily={'Poppins'}
              fontWeight={500}
              textTransform={'capitalize'}
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default EachMenu;
