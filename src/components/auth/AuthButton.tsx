import React from 'react';

import { Button } from '@chakra-ui/react';

const AuthButton = ({
  status,
  name,
  fontSize,
  h,
  w,
  mx,
  onClick,
  disabled,
  ...props
}: any) => {
  return (
    <Button
      type='submit'
      background='clique.purple'
      borderRadius='50px'
      width={w ? w : '100%;'}
      height={h ? h : '60px;'}
      mx={mx ? mx : ''}
      display='flex;'
      alignItems='center'
      justifyContent='center'
      fontWeight='500'
      fontSize={fontSize ? fontSize : 'head'}
      letterSpacing='-0.02em;'
      color='clique.white'
      disabled={disabled}
      style={props}
      isLoading={status && status.isLoading}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default AuthButton;
