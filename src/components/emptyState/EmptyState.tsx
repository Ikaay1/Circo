import { Flex, Image, Text } from '@chakra-ui/react';

type Props = {
  msg: string;
};

const EmptyState = (props: Props) => {
  return (
    <Flex
      height={'100%'}
      alignItems='center'
      justifyContent={'center'}
      flexDirection='column'
    >
      <Image
        w='20%'
        objectFit='cover'
        src='/assets/emptyState.png'
        alt='empty state'
        mx='auto'
      />
      <Text
        mx='auto'
        noOfLines={2}
        maxW={{base: '80%', lg: '25%'}}
        textAlign={'center'}
        mt='7'
      >
        {props.msg}
      </Text>
    </Flex>
  );
};

export default EmptyState;
