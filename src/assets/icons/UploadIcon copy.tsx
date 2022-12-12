import { Icon } from "@chakra-ui/react";
import React from "react";

type Props = {};

function tickSquare(props: Props) {
  return (
    <Icon viewBox="0 0 31 32" {...props}>
      <svg
        width="31"
        height="32"
        viewBox="0 0 31 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8542 4.45508H9.87216C6.04511 4.45508 3.64575 7.1648 3.64575 10.9995V21.3468C3.64575 25.1815 6.0337 27.8912 9.87216 27.8912H20.8529C24.6927 27.8912 27.0819 25.1815 27.0819 21.3468V10.9995C27.0819 7.1648 24.6927 4.45508 20.8542 4.45508Z"
          fill="url(#paint0_linear_4064_36794)"
        />
        <path
          d="M10.8533 16.1741L13.8607 19.1803L19.873 13.168"
          stroke="white"
          strokeWidth="1.21615"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4064_36794"
            x1="8.8017"
            y1="5.62689"
            x2="23.5665"
            y2="26.0163"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#892CDC" />
            <stop offset="1" stopColor="#6E93F1" />
          </linearGradient>
        </defs>
      </svg>
    </Icon>
  );
}

export default tickSquare;
