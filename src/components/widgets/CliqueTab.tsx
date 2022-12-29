import React from 'react';

import { Tab } from '@chakra-ui/react';

function CliqueTab({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Tab
      onClick={onClick}
      px={0}
      mr={{lg: '20px'}}
      fontSize={'smSubHead'}
      py='5px'
      _selected={{
        borderBottom: '3px solid',
        borderColor: 'clique.base',
      }}
      w={{base: '200px', lg: 'auto'}}
      flexShrink={0}
    >
      {children}
    </Tab>
  );
}

export default CliqueTab;
