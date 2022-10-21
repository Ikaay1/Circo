import React from 'react';

import { Button } from '@chakra-ui/react';

const AuthButton = ({status, name, ...props}: any) => {
    return (
        <Button
            type='submit'
            background='clique.purple'
            borderRadius='50px'
            width='100%;'
            height='60px;'
            display='flex;'
            alignItems='center'
            justifyContent='center'
            fontWeight='500'
            fontSize='head'
            letterSpacing='-0.02em;'
            color='clique.white'
            style={props}
            isLoading={status && status.isLoading}
        >
            {name}
        </Button>
    );
};

export default AuthButton;
