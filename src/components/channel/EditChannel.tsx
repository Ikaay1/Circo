import React from 'react';

import { Box, FormControl, Text } from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';

import ChannelInput from './ChannelInput';
import TextArea from './TextArea';

const EditChannel = () => {
    return (
        <Box>
            <FormControl>
                <Box display='flex' justifyContent={'space-between'}>
                    <Box>
                        <Text
                            fontWeight='600'
                            fontSize='subHead'
                            lineHeight='24px'
                            color='clique.secondaryGrey2'
                        >
                            Bio
                        </Text>

                        <TextArea
                            w='53%'
                            h='150px'
                            color='clique.secondaryGrey2'
                        />

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
                    </Box>

                    <Box>
                        <AuthButton
                            width='180px'
                            height='50px'
                            borderRadius='30px'
                            fontSize='sm2'
                            name='Save Changes'
                        />
                    </Box>
                </Box>

                {/* ))} */}
            </FormControl>
        </Box>
    );
};

export default EditChannel;
