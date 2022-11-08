import { Button } from "@chakra-ui/react";
import React, { forwardRef } from "react";

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
  type?: "button" | "submit" | "reset" | undefined;
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
      ...props
    }: React.PropsWithChildren<Props>,
    ref
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
          type={type}
        >
          {text}
        </Button>
      </>
    );
  }
);

Btn.displayName = "Btn";
export default Btn;
