import React, { forwardRef } from 'react';

import { Button } from '@chakra-ui/react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  py?: string;
  borderRadius?: string;
  maxW?: string;
  text?: string;
  bg?: string;
  width?: string;
  size?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  variant?: string;
  colorScheme?: string;
  fontSize?: string;
  mr?: string;
  px?: string;
  isLoading?: boolean;
  submit: boolean
}

const Btn = forwardRef(
  (
    {
      type,
      isLoading,
      px,
      mr,
      fontSize,
      leftIcon,
      rightIcon,
      size,
      width,
      bg,
      text,
      py,
      borderRadius,
      maxW,
      variant,
      colorScheme,
      submit,
      loading,
      ...props
    }: any,
    ref,
  ) => {
    return (
      <>
        <Button
          {...props}
          borderRadius={`${borderRadius ? borderRadius : "50px"}`}
          bg={`${bg ? bg : "clique.base"}`}
          py={`${py ? py : "3"}`}
          maxW="100%"
          colorScheme={colorScheme}
          leftIcon={leftIcon}
          fontSize={fontSize}
          mr={mr}
          px={px}
          isLoading={isLoading}       
          variant={variant}
          type={submit ? 'submit' : 'button'}
          isLoading={loading}
        >
          {text}
        </Button>
      </>
    );
  },
);

Btn.displayName = 'Btn';
export default Btn;
