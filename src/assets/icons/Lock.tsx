import React from 'react';

import {Icon} from '@chakra-ui/react';

const Lock = (props: any) => {
  return (
    <Icon {...props} viewBox='0 0 21 21'>
      <svg
        width='21'
        height='21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.3444 7.83203H5.6569C5.57357 7.83203 5.50065 7.83203 5.41732 7.83203V6.6237C5.41732 3.57161 6.2819 1.54036 10.5007 1.54036C15.0111 1.54036 15.584 3.73828 15.584 5.65495C15.584 6.0612 15.9069 6.38411 16.3132 6.38411C16.7194 6.38411 17.0423 6.0612 17.0423 5.65495C17.0423 1.95703 14.8444 0.0820312 10.5007 0.0820312C4.63607 0.0820312 3.95898 3.8112 3.95898 6.6237V7.92578C1.04232 8.29036 0.0839844 9.76953 0.0839844 13.4049V15.3424C0.0839844 19.6133 1.38607 20.9154 5.6569 20.9154H15.3444C19.6152 20.9154 20.9173 19.6133 20.9173 15.3424V13.4049C20.9173 9.13411 19.6152 7.83203 15.3444 7.83203ZM10.5007 17.5195C8.76107 17.5195 7.35482 16.1029 7.35482 14.3737C7.35482 12.6341 8.77148 11.2279 10.5007 11.2279C12.2298 11.2279 13.6465 12.6445 13.6465 14.3737C13.6465 16.1133 12.2402 17.5195 10.5007 17.5195Z'
          fill='#A1A1A1'
        />
      </svg>
    </Icon>
  );
};

export default Lock;
