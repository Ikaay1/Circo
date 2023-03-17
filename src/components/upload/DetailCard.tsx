import React, {ChangeEvent} from 'react';

import {Box, Input, Text, Textarea, useColorModeValue} from '@chakra-ui/react';

type Props = {
  title: string;
  input: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputChangeArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  valueArea: string;
  limit?: boolean;
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
          maxLength={limit === true ? 70 : undefined}
        />
      ) : (
        <Textarea
          variant='filled'
          value={valueArea}
          onChange={handleInputChangeArea}
          bg={valueC}
          required
        />
      )}
    </Box>
  );
}

//
