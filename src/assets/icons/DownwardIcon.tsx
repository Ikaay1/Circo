import React from 'react';

import { Icon } from '@chakra-ui/react';

type Props = {};

function DownwardIcon(props: Props) {
  return (
    <Icon viewBox='0 0 35 35' {...props}>
      <svg
        width='35'
        height='35'
        viewBox='0 0 35 35'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='17.1736'
          cy='17.1484'
          r='15.1172'
          fill='#C32E2E'
          fillOpacity='0.26'
        />

        <path
          d='M23.2602 20.2192L23.2602 11.5679L14.6089 11.5679'
          stroke='white'
          strokeWidth='1.51172'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.1456 23.6811L23.1392 11.6875'
          stroke='white'
          strokeWidth='1.51172'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
}

export default DownwardIcon;
