import React from 'react';

import {Icon} from '@chakra-ui/react';

const CloseIcon = (props: any) => {
  return (
    <Icon viewBox='0 0 34 34' {...props}>
      <svg
        width='34'
        height='34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12.7867 21.2422L21.272 12.7569'
          stroke='#E6E6E6'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M21.272 21.2431L12.7867 12.7578'
          stroke='#E6E6E6'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default CloseIcon;
