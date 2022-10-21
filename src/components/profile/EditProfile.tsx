import React from 'react';

import { Box, FormControl, Input, Text } from '@chakra-ui/react';
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
                        <Input
                            width='100%'
                            height='100%'
                            background='#232323'
                            borderRadius='10px'
                            type={name === 'Password' ? 'password' : 'text'}
                            required={true}
                            outline='none'
                            fontSize='18px'
                            color='clique.white'
                            focusBorderColor='rgb(225, 225 ,225, 0.2)'
                            className='edit-profile-input'
                        />
                        <Text
                            position='absolute'
                            top='6%'
                            left={'2%'}
                            fontSize='14px'
                            color='clique.secondaryGrey2'
                            transition='all 0.15s ease'
                            className='edit-profile-placeholder'
                        >
                            {name}
                        </Text>
                        <Text
                            position='absolute'
                            top='50%'
                            right={'3.5%'}
                            transform={'translateY(-50%)'}
                            fontSize='12px'
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
