import React from 'react';

import { Textarea } from '@chakra-ui/react';

const TextArea = ({w, h, color, placeholder, ...props}: any) => {
    console.log(props);

    return (
        <Textarea
            w={w}
            h={h}
            background='#clique.secondaryGrey3'
            borderRadius='10px'
            required={true}
            outline='none'
            fontSize='smSubHead'
            color={color}
            focusBorderColor='rgb(225, 225 ,225, 0.2)'
            lineHeight='21px'
            mt='.25rem'
            placeholder={placeholder ? placeholder : ''}
            style={props}
        />
    );
};

export default TextArea;
