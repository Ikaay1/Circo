import React from 'react';

import {Icon} from '@chakra-ui/react';

const ArrowRight = (props: any) => {
  return (
    <Icon {...props} viewBox='0 0 19 12'>
      <svg
        width='19'
        height='12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM18.5303 6.53033C18.8232 6.23744 18.8232 5.76256 18.5303 5.46967L13.7574 0.696699C13.4645 0.403806 12.9896 0.403806 12.6967 0.696699C12.4038 0.989593 12.4038 1.46447 12.6967 1.75736L16.9393 6L12.6967 10.2426C12.4038 10.5355 12.4038 11.0104 12.6967 11.3033C12.9896 11.5962 13.4645 11.5962 13.7574 11.3033L18.5303 6.53033ZM1 6.75H18V5.25H1V6.75Z'
          fill='#892CDC'
        />
      </svg>
    </Icon>
  );
};

export default ArrowRight;
