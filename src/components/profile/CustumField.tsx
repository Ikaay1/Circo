import {Field} from 'formik';
import React, {useState} from 'react';

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ChannelInput from '@components/channel/ChannelInput';
import Color from '@constants/color';
import PasswordIcon from '@icons/PasswordIcon';

type Props = {
  nameValue: string;
  sideContent?: string;
  name: string;
  type?: string;
  userNameChange?: boolean;
};

export default function CustumField({
  nameValue,
  sideContent,
  name,
  type,
  userNameChange,
}: Props) {
  const [show, setShow] = useState<Boolean>(false);
  const value = useColorModeValue('clique.darkGrey', 'clique.white');
  const [isFocused, setIsFocused] = React.useState(false);
  console.log('foc', isFocused);
  return (
    <Field name={nameValue}>
      {({field, form: {touched, errors}}: any) => (
        <FormControl
          isInvalid={errors[field.name] && touched[field.name]}
          mx='auto'
          isReadOnly={userNameChange}
        >
          <Box
            position={'relative'}
            width={{base: '100%', lg: '520px'}}
            height='50px'
            mt='.8rem'
            mx='auto'
          >
            <Input
              h='62px'
              borderRadius='12px'
              _focus={{boxShadow: 'none', border: 'none', outline: 'none'}}
              _active={{boxShadow: 'none', border: 'none', outline: 'none'}}
              // className='input'
              type={type ? (show ? 'text' : 'password') : 'text'}
              placeholder={name}
              color={Color().blackAndWhite}
              backgroundColor={Color().greyAndWhite2}
              _placeholder={{
                color: Color().blackAndWhite,
                fontSize: isFocused || field.value ? 'sm3' : '1rem',
                pb: isFocused || field.value ? '5px' : '0',
                transition: 'all .3s ease',
                transform:
                  isFocused || field.value
                    ? 'translateY(-110%)'
                    : 'translateY(0%)',
              }}
              borderWidth={'1px'}
              borderColor={Color().greyAndWhite2}
              onFocus={() => setIsFocused(true)}
              {...field}
              onBlur={() => setIsFocused(false)}
              name={nameValue}
            />
            {/* <Text
              position="absolute"
              top="-5%"
              left={"2%"}
              fontSize="smSubHead"
              color="clique.secondaryGrey2"
              transition="all 0.15s ease"
              className="edit-profile-placeholder"
            >
              {name}
            </Text> */}

            {field.value && (
              <Text
                position='absolute'
                left={'4%'}
                pt='5px'
                fontSize='sm3'
                color={Color().blackAndWhite}
                transition='all .3s ease'
                top='0%'
                transform={
                  isFocused || field.value
                    ? 'translateY(0%)'
                    : 'translateY(50%); font-size: 1rem'
                }
                zIndex='99'
              >
                {name}
              </Text>
            )}

            <Text
              position='absolute'
              top='50%'
              right={'3.5%'}
              transform={'translateY(-50%)'}
              fontSize='sm'
              color='clique.secondaryGrey2'
              zIndex={'99'}
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
