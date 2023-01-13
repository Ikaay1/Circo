import React from 'react';

import { Icon } from '@chakra-ui/react';

type Props = {};

function SortIcon(props: Props) {
  return (
    <Icon viewBox='0 0 24 24' {...props}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='#a248e8'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3 7H21'
          stroke='#a248e8'
          strokeOpacity='1'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
        <path
          opacity='1'
          d='M6 12H18'
          stroke='#a248e8'
          strokeOpacity='1'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
        <path
          d='M10 17H14'
          stroke='#a248e8'
          strokeOpacity='1'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
      </svg>
    </Icon>
  );
}

export default SortIcon;
