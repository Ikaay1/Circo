import { Field } from 'formik';
import React, { useState } from 'react';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Icon,
	Input,
	Text,
} from '@chakra-ui/react';
import ChannelInput from '@components/channel/ChannelInput';
import PasswordIcon from '@icons/PasswordIcon';

type Props = {
  nameValue: string;
  sideContent?: string;
  name: string;
  type?: string;
};

export default function CustumField({
  nameValue,
  sideContent,
  name,
  type,
}: Props) {
  const [show, setShow] = useState<Boolean>(false);
  return (
    <Field name={nameValue}>
      {({field, form: {touched, errors}}: any) => (
        <FormControl
          isInvalid={errors[field.name] && touched[field.name]}
          mx='auto'
        >
          <Box
            position={'relative'}
            width='520px'
            height='50px'
            mt='.8rem'
            mx='auto'
          >
            <Input
              width='100%'
              height='100%'
              background='#clique.secondaryGrey3'
              borderRadius='10px'
              type={type ? (show ? 'text' : 'password') : 'text'}
              outline='none'
              fontSize='subHead'
              color='clique.white'
              focusBorderColor='rgb(225, 225 ,225, 0.2)'
              autoFocus={false}
              className='edit-profile-input'
              {...field}
              name={nameValue}
            />
            <Text
              position='absolute'
              top='-5%'
              left={'2%'}
              fontSize='smSubHead'
              color='clique.secondaryGrey2'
              transition='all 0.15s ease'
              className='edit-profile-placeholder'
            >
              {name}
            </Text>

            <Text
              position='absolute'
              top='50%'
              right={'3.5%'}
              transform={'translateY(-50%)'}
              fontSize='sm'
              color='clique.secondaryGrey2'
            >
              {sideContent ? (
                sideContent
              ) : (
                <Icon
                  as={PasswordIcon}
                  cursor='pointer'
                  onClick={() => setShow(!show)}
                />
              )}
            </Text>
          </Box>
          <Flex mx='auto' justify={'center'}>
            <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
          </Flex>
        </FormControl>
      )}
    </Field>
  );
}
