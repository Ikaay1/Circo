import { Icon } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SideIcon = (props:Props) => (
  <Icon viewBox="0 0 29 5" width={"1.5em"} height={"1.5em"} {...props}>
    <svg
      width="29"
      height="5"
      viewBox="0 0 29 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="rotate(-90 2.5 2.5)"
        fill="white"
      />
      <circle
        cx="14.1665"
        cy="2.5"
        r="2.5"
        transform="rotate(-90 14.1665 2.5)"
        fill="white"
      />
      <circle
        cx="25.8335"
        cy="2.5"
        r="2.5"
        transform="rotate(-90 25.8335 2.5)"
        fill="white"
      />
    </svg>
  </Icon>
);

export default SideIcon;
