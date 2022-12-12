import { Icon } from "@chakra-ui/react";
import React from "react";

type Props = {};

function SortIcon(props: Props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 7H21"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          opacity="0.34"
          d="M6 12H18"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 17H14"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Icon>
  );
}

export default SortIcon;
