import React from 'react';

import {Icon} from '@chakra-ui/react';

const GoTo = (props: any) => {
  return (
    <Icon {...props} viewBox='0 0 24 24'>
      <svg
        width='24'
        height='24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008'
          stroke='CurrentColor'
          stroke-width='1.5'
          stroke-miterlimit='10'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default GoTo;
