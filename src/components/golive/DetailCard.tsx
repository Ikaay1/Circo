import {Field} from 'formik';
import React from 'react';

import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';

type Props = {
  label: string;
  input: boolean;
  name: string;
  type?: string;
  w?: any;
  fee?: boolean;
  limit?: number;
};

export default function DetailCard({
  name,
  label,
  input,
  type,
  w,
  fee,
  limit,
}: Props) {
  const value = useColorModeValue('clique.white', 'clique.secondaryGrey1');
  return (
    <Box w={w} bg={value} px='2' py='3' mt='10px' borderRadius={'10px'}>
      <Text
        px='16px'
        fontSize={'smSubHead'}
        fontWeight='400'
        mb='1'
        color={'clique.secondaryGrey2'}
      >
        {label}
      </Text>
      {input ? (
        <Field name={name}>
          {({field, form}: any) => (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <InputGroup>
                {fee && (
                  <InputLeftElement pr='0' pointerEvents='none'>
                    N
                  </InputLeftElement>
                )}
                <Input
                  pl={fee && '25px'}
                  variant='filled'
                  bg={value}
                  {...field}
                  id='title'
                  color={Color().blackAndWhite}
                  placeholder={`Enter ${name}`}
                  min={
                    type === 'date'
                      ? new Date()
                          .toISOString()
                          .slice(0, new Date().toISOString().lastIndexOf(':'))
                      : undefined
                  }
                  type={
                    type === 'date'
                      ? 'datetime-local'
                      : type === 'time'
                      ? 'time'
                      : 'text'
                  }
                  maxLength={limit ? limit : undefined}
                />
              </InputGroup>
              {limit ? (
                <Text
                  fontSize={'sm'}
                  fontWeight='400'
                  mb='1'
                  color={'clique.secondaryGrey2'}
                  textAlign={'right'}
                >
                  {field?.value?.length}/{limit}
                </Text>
              ) : null}
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      ) : (
        <Field name={name}>
          {({field, form}: any) => (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <Textarea
                color={Color().blackAndWhite}
                placeholder={`Enter ${name}`}
                {...field}
                variant='filled'
                bg={value}
                maxLength={limit ? limit : undefined}
              />
              {limit ? (
                <Text
                  fontSize={'sm'}
                  fontWeight='400'
                  mb='1'
                  color={'clique.secondaryGrey2'}
                  textAlign={'right'}
                >
                  {field?.value?.length}/{limit}
                </Text>
              ) : null}
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      )}
    </Box>
  );
}
