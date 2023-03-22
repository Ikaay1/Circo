import React, {forwardRef} from 'react';

import {Button} from '@chakra-ui/react';

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
  submit: boolean;
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
      variant,
      colorScheme,
      submit,
      loading,
      onClick,
      maxW,
      disabled,
      ...props
    }: any,
    ref,
  ) => {
    return (
      <>
        <Button
          borderRadius={`${borderRadius ? borderRadius : '50px'}`}
          bg={`${
            bg
              ? bg
              : 'linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)'
          }`}
          py={`${py ? py : '3'}`}
          maxW={maxW ? maxW : '100%'}
          colorScheme={colorScheme}
          leftIcon={leftIcon}
          fontSize={fontSize}
          mr={mr}
          px={px}
          onClick={onClick}
          isLoading={isLoading}
          disabled={disabled ? disabled : isLoading ? isLoading : false}
          variant={variant}
          type={submit ? 'submit' : 'button'}
          {...props}
        >
          {text}
        </Button>
      </>
    );
  },
);

Btn.displayName = 'Btn';
export default Btn;
