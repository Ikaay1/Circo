import { Icon } from "@chakra-ui/react";
import React from "react";

type Props = {};

function DownwardIcon(props: Props) {
  return (
    <Icon viewBox="0 0 35 35" {...props}>
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="17.1736"
          cy="17.1484"
          r="15.1172"
          fill="#C32E2E"
          fillOpacity="0.26"
        />
        <path
          d="M11.116 14.5562L11.116 23.2075L19.7673 23.2075"
          stroke="white"
          strokeWidth="1.51172"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.2306 11.0943L11.2371 23.0879"
          stroke="white"
          strokeWidth="1.51172"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
}

export default DownwardIcon;
