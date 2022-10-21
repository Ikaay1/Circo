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
}

const Btn = forwardRef(
  (
    {
      leftIcon,
      rightIcon,
      size,
      width,
      bg,
      text,
      py,
      borderRadius,
      maxW,
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
        >
          {text}
        </Button>
      </>
    );
  }
);

Btn.displayName = "Btn";
export default Btn;
