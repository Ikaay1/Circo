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
  bg,
  cursor,
  ...props
}: any) => {
  return (
    <Button
      type="submit"
      background={
        bg ? bg : "linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)"
      }
      borderRadius="50px"
      width={w ? w : "100%;"}
      height={h ? h : "55px;"}
      mx={mx ? mx : ""}
      display="flex;"
      alignItems="center"
      justifyContent="center"
      fontWeight="500"
      fontSize={fontSize ? fontSize : "smHead"}
      letterSpacing="-0.02em;"
      color="clique.white"
      cursor={cursor && cursor}
      disabled={disabled ? disabled : status ? status.isLoading : false}
      style={props}
      isLoading={status && status.isLoading}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default AuthButton;
