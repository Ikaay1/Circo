import React from 'react';
//@ts-ignore
import { Line } from 'react-chartjs-2';
import { useGetCountsQuery } from 'redux/services/content.service';

import { Box, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { analyticsData, options } from '@constants/utils';
import FallIcon from '@icons/FallIcon';
import UpIcon from '@icons/UpIcon';

const Analytics = ({
  subscribe,
}: {
  subscribe: {date: string; month: string; year: string; count: number}[];
}) => {
  const {data: countsData, isFetching} = useGetCountsQuery('');
  const labels = subscribe
    ?.slice(-5)
    ?.map((each) => `${each?.month} ${each?.year}`);

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: subscribe?.slice(-5)?.map((each) => each?.count),
        borderColor: 'rgb(137, 44, 220)',
        backgroundColor: '#E6E6E6',
      },
    ],
  };

  const diff =
    subscribe[subscribe?.length - 1].count -
    subscribe[subscribe?.length - 2].count;

  return (
    <Box>
      <Box bg='clique.blackGrey' maxH={'300px'} py='5'>
        <Box pl='4'>
          <Text
            fontWeight='500'
            fontSize='subHead'
            lineHeight='26px'
            color='clique.secondaryGrey2'
          >
            Subscribers monthly rate
          </Text>
          <Box display={'flex'} alignItems='center'>
            <Text fontSize='smHead2' lineHeight='36px' color='clique.white'>
              {diff}
            </Text>
            <Box
              backgroundColor={diff > 1 ? 'clique.lightGreen' : 'clique.wine'}
              borderRadius='50%'
              display={'flex'}
              justifyContent='center'
              alignItems={'center'}
              ml='2'
            >
              <Icon as={diff > 1 ? UpIcon : FallIcon} />
            </Box>
          </Box>
          <Text
            fontSize='smSubHead'
            lineHeight='26px'
            color='clique.secondaryGrey2'
          >
            Monthly subscribers rate insight
          </Text>
        </Box>
        <Box height={'100%'} width='90%' mx='auto'>
          <Line options={options} data={data} />
        </Box>
      </Box>
      <Flex marginTop={'2rem'} justifyContent='space-between'>
        {analyticsData.map(({text1, text2}, i) => (
          <SimpleGrid
            // alignItems={"center"}
            columns={2}
            marginTop='1rem'
            key={text1}
            bg='clique.blackGrey'
            px='6'
            py='2'
            textAlign={'center'}
          >
            <Text fontSize='sm' lineHeight='24px' color='clique.secondaryGrey2'>
              {text1}
            </Text>
            <Text fontSize='smHead' lineHeight='24px' color='clique.white'>
              {i === 0 ? countsData?.count?.likes : countsData?.count?.views}
            </Text>
          </SimpleGrid>
        ))}
      </Flex>
    </Box>
  );
};

export default Analytics;
