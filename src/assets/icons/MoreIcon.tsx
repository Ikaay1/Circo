import React from 'react';

import {Icon} from '@chakra-ui/react';

const MoreIcon = (props: any) => {
  return (
    <Icon {...props} viewBox='0 0 24 24'>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='12.1181'
          cy='19.0772'
          r='1.90248'
          transform='rotate(-179.385 12.1181 19.0772)'
          fill='CurrentColor'
        />
        <circle
          cx='12.1181'
          cy='11.8077'
          r='1.90248'
          transform='rotate(-179.385 12.1181 11.8077)'
          fill='CurrentColor'
        />
        <circle
          cx='12.1181'
          cy='4.53814'
          r='1.90248'
          transform='rotate(-179.385 12.1181 4.53814)'
          fill='CurrentColor'
        />
      </svg>
    </Icon>
  );
};

export default MoreIcon;
