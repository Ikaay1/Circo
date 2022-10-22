import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { analyticsData, chartData } from '@constants/utils';

const Analytics = () => {
    return (
        <Box>
            <Box
                display={'flex'}
                justifyContent='space-between'
                alignItems={'center'}
            >
                {chartData.map((data) => (
                    <Box h='240px' w='330px' key={data}>
                        <Image
                            w='100%'
                            h='100%'
                            src={`/assets/${data}.png`}
                            alt=''
                        />
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
