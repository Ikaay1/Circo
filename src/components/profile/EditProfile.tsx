import React from 'react';

import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import ChannelInput from '@components/channel/ChannelInput';
import { editInputData } from '@constants/utils';

const EditProfile = () => {
    return (
        <Box>
            <FormControl>
                {editInputData.map(({name, sideContent}) => (
                    <Box
                        position={'relative'}
                        width='520px'
                        height='50px'
                        mt='.8rem'
                        key={name}
                    >
                        <ChannelInput name={name} />
                        <Text
                            position='absolute'
                            top='50%'
                            right={'3.5%'}
                            transform={'translateY(-50%)'}
                            fontSize='sm'
                            color='clique.secondaryGrey2'
                        >
                            {sideContent}
                        </Text>
                    </Box>
                ))}
            </FormControl>
        </Box>
    );
};

export default EditProfile;
