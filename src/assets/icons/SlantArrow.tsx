import React from 'react';

import {Icon} from '@chakra-ui/react';

const SlantArrow = (props: any) => {
  return (
    <Icon {...props} viewBox='0 0 26 26'>
      <svg
        width='26'
        height='26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.2025 8.21937L8.76427 8.21937L8.76427 14.6576'
          stroke='CurrentColor'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.7799 17.235L8.85449 8.30957'
          stroke='CurrentColor'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default SlantArrow;
