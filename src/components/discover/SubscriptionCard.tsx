import React from 'react';

import { Flex } from '@chakra-ui/react';

import SubcribeOverLay from './SubcribeOverLay';
import SubscribeBody from './SubscribeBody';

function SubscriptionCard({user, refetch}: any) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Flex
      cursor={'pointer'}
      minW='420px'
      mr='20px'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      key={user._id}
    >
      {!isHover ? (
        <SubscribeBody user={user} />
      ) : (
        <SubcribeOverLay isHover={isHover} user={user} refetch={refetch} />
      )}{' '}
    </Flex>
  );
}

export default SubscriptionCard;
