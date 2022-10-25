import React from 'react';
//@ts-ignore
import { Line } from 'react-chartjs-2';

import { Box, Icon, Text } from '@chakra-ui/react';
import { analyticsData, chartData, data, options } from '@constants/utils';
import FallIcon from '@icons/FallIcon';
import UpIcon from '@icons/UpIcon';

const Analytics = () => {
    return (
        <Box>
            <Box
                display={'flex'}
                justifyContent='space-between'
                alignItems={'center'}
            >
                {chartData.map(({name, detail, increase, amount}) => (
                    <Box w='330px' key={name}>
                        <Text
                            fontWeight='500'
                            fontSize='subHead'
                            lineHeight='26px'
                            color='clique.secondaryGrey2'
                        >
                            {name}
                        </Text>
                        <Box display={'flex'} alignItems='center' mt='.15rem'>
                            <Text
                                fontSize='smHead2'
                                lineHeight='36px'
                                color='clique.white'
                                mr='1rem'
                            >
                                {amount}
                            </Text>
                            <Box
                                w='22px'
                                h='22px'
                                backgroundColor={
                                    increase
                                        ? 'clique.lightGreen'
                                        : 'clique.wine'
                                }
                                borderRadius='50%'
                                display={'flex'}
                                justifyContent='center'
                                alignItems={'center'}
                            >
                                <Icon as={increase ? UpIcon : FallIcon} />
                            </Box>
                        </Box>
                        <Text
                            fontSize='smSubHead'
                            lineHeight='26px'
                            color='clique.secondaryGrey2'
                            mt='.15rem'
                        >
                            {detail}
                        </Text>

                        <Box w='100%' marginRight='auto' mt='1.1rem'>
                            <Line options={options} data={data} />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box marginTop={'2rem'}>
                {analyticsData.map(({text1, text2}) => (
                    <Box
                        w='375px'
                        display={'flex'}
                        justifyContent='space-between'
                        alignItems={'center'}
                        marginTop='1rem'
                        key={text1}
                    >
                        <Text
                            fontSize='smSubHead'
                            lineHeight='24px'
                            color='clique.secondaryGrey2'
                        >
                            {text1}
                        </Text>
                        <Text
                            fontSize='smSubHead'
                            lineHeight='24px'
                            color='clique.white'
                        >
                            {text2}
                        </Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Analytics;
