import moment from 'moment';
import {useRouter} from 'next/router';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {useReadNotificationMutation} from 'redux/services/notification.service';

import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import DownwardIcon from '@icons/DownwardIcon';
import UpwardIcon from '@icons/UpwardIcon';

function EachNotification({
  lastElementRef,
  data,
}: {
  data: any;
  lastElementRef?: any;
}) {
  const [readNotification, info] = useReadNotificationMutation();
  const route = useRouter();
  const value = useColorModeValue('clique.white', 'clique.blackGrey');

  console.log('noti', data);
  return (
    <AccordionItem
      ref={lastElementRef}
      mb={'10px'}
      border={'none'}
      bg={value}
      rounded={'10px'}
    >
      <Box>
        <AccordionButton
          onClick={async () => {
            if (data?.status === 'unread') {
              await readNotification(data._id);
            }
          }}
          _focus={{outline: 'none', boxShadow: 'none', border: 'none'}}
        >
          <Flex flex='1' textAlign='left' alignItems={'center'}>
            <Box minW='50px' mr='10px'>
              {data?.type === 'Debit' ? (
                <Icon as={DownwardIcon} fontSize='3xl' mr='2' />
              ) : data?.type === 'Credit' ? (
                <Icon as={UpwardIcon} fontSize='3xl' mr='2' />
              ) : (
                <AvataWithSpace
                  name={data?.triggerId?.channel_id?.name}
                  url={data?.triggerId?.channel_id?.photo}
                  mr='0px'
                  size='45px'
                  avatarSize='35px'
                  borderThickness='2px'
                  borderColor='clique.base'
                />
              )}
            </Box>

            <Text
              fontWeight={data?.status === 'unread' ? 'bold' : 'normal'}
              fontFamily={'Poppins'}
              fontSize='smSubHead'
            >
              {ReactHtmlParser(data?.title)}
            </Text>
          </Flex>

          <Text fontFamily={'Poppins'} fontSize='smSubHead'>
            {moment(data?.createdAt).fromNow()}
          </Text>
        </AccordionButton>
      </Box>
      <AccordionPanel
        onClick={() => {
          if (data?.type === 'Action') {
            route.push(data?.link);
          }
        }}
        cursor={data?.type === 'Action' ? 'pointer' : 'default'}
        fontFamily={'Poppins'}
        fontSize='smSubHead'
        pb={4}
        pl='80px'
      >
        {ReactHtmlParser(data?.content)}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default EachNotification;
