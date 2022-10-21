import React from 'react';

import { Input, Text } from '@chakra-ui/react';

const ChannelInput = ({name, ...props}: any) => {
    return (
        <>
            <Input
                width='100%'
                height='100%'
                background='#clique.secondaryGrey3'
                borderRadius='10px'
                type={'text'}
                required={true}
                outline='none'
                fontSize='sm2'
                color='clique.white'
                focusBorderColor='rgb(225, 225 ,225, 0.2)'
                style={props}
                className='edit-profile-input'
            />
            <Text
                position='absolute'
                top='6%'
                left={'2%'}
                fontSize='smSubHead'
                color='clique.secondaryGrey2'
                transition='all 0.15s ease'
                className='edit-profile-placeholder'
            >
                {name}
            </Text>
        </>
    );
};

export default ChannelInput;
