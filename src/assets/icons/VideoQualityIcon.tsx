import React from "react";

import { Icon } from "@chakra-ui/react";

const VideoQualityIcon = (props: any) => (
  <Icon viewBox="0 0 30 30" {...props}>
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M11.375 15.0004V13.1504C11.375 10.7629 13.0625 9.80035 15.125 10.9879L16.725 11.9129L18.325 12.8379C20.3875 14.0254 20.3875 15.9754 18.325 17.1629L16.725 18.0879L15.125 19.0129C13.0625 20.2004 11.375 19.2254 11.375 16.8504V15.0004Z"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default VideoQualityIcon;
