import React, {ChangeEvent} from 'react';

import {Box, Input, Text, Textarea, useColorModeValue} from '@chakra-ui/react';

type Props = {
  title: string;
  input: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputChangeArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  valueArea: string;
  limit?: number;
};

export default function DetailCard({
  title,
  input,
  value,
  handleInputChange,
  valueArea,
  handleInputChangeArea,
  limit,
}: Props) {
  const valueC = useColorModeValue('clique.white', 'clique.secondaryGrey1');
  console.log('valueArea', valueArea);
  return (
    <Box bg={valueC} px='2' py='3' borderRadius={'10px'}>
      <Text
        fontSize={'smSubHead'}
        fontWeight='400'
        mb='1'
        color={'clique.secondaryGrey2'}
      >
        {title}
      </Text>
      {input ? (
        <Input
          variant='filled'
          value={value}
          onChange={handleInputChange}
          bg={valueC}
          required
          maxLength={limit ? limit : undefined}
        />
      ) : (
        <Textarea
          variant='filled'
          value={valueArea}
          onChange={handleInputChangeArea}
          bg={valueC}
          maxLength={limit ? limit : undefined}
          required
        />
      )}
      <Text
        fontSize={'sm'}
        fontWeight='400'
        mb='1'
        color={'clique.secondaryGrey2'}
        textAlign={'right'}
      >
        {input ? value?.length : valueArea?.length}/{input ? 70 : 300}
      </Text>
    </Box>
  );
}

//
