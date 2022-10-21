import React from 'react';

import { Box, FormControl, Text } from '@chakra-ui/react';

import ChannelInput from './ChannelInput';
import TextArea from './TextArea';

const EditChannel = () => {
    return (
        <Box>
            <FormControl>
                <Text
                    fontWeight='600'
                    fontSize='subHead'
                    lineHeight='24px'
                    color='clique.secondaryGrey2'
                >
                    Bio
                </Text>

                <TextArea w='42%' h='150px' color='clique.secondaryGrey2' />

                <Box
                    position={'relative'}
                    width='700px'
                    height='55px'
                    mt='3rem'
                >
                    <ChannelInput name='Channel Name' />
                </Box>
                <Box mt={'.9rem'}>
                    <TextArea
                        w='700px'
                        h='150px'
                        color='clique.white'
                        placeholder={'Subscription Information'}
                    />
                </Box>

                <Box
                    position={'relative'}
                    width='700px'
                    height='55px'
                    mt='.9rem'
                >
                    <ChannelInput name='Subscription Fee' />
                </Box>

                {/* ))} */}
            </FormControl>
        </Box>
    );
};

export default EditChannel;
