import React from 'react';

import {Box, Icon, Input, Select, Text, useColorMode} from '@chakra-ui/react';
import Color from '@constants/color';
import Padlock from '@icons/Padlock';
import PasswordIcon from '@icons/PasswordIcon';

const AuthInput = ({
  image,
  theState,
  name,
  showPassword,
  showPassword0,
  showPassword1,
  handleShowPassword,
  email,
  i,
  setTheState,
  referral,
  option,
  ageRange,
  setAgeRange,
}: any) => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      {!option ? (
        <Input
          value={theState}
          onChange={(e) => setTheState(e.target.value)}
          className='input'
          type={
            !i
              ? image
                ? showPassword
                  ? 'text'
                  : 'password'
                : email
                ? 'email'
                : 'text'
              : i === 1
              ? showPassword0
                ? 'text'
                : 'password'
              : showPassword1
              ? 'text'
              : 'password'
          }
          required={referral ? false : true}
          placeholder={name}
          color={Color().blackAndWhite}
          backgroundColor={Color().whiteAndBlack}
          _placeholder={{
            color: Color().blackAndWhite,
          }}
          borderWidth={'1px'}
          borderColor={Color().blackAndWhite}
        />
      ) : (
        <Select
          value={ageRange}
          bg={Color().whiteAndBlack}
          borderWidth={'1px'}
          borderColor={Color().blackAndWhite}
          borderRadius='15px'
          //   pl="1.3rem"
          _focus={{boxShadow: 'none'}}
          h='57px'
          w='100%'
          onChange={(e) => setAgeRange(e.target.value)}
          className='input'
          required={true}
          placeholder={'Select ' + name}
        >
          {option.map((item: any, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
      )}
      <Text
        position='absolute'
        top='6%'
        left={'4.5%'}
        fontSize='sm'
        color={Color().blackAndWhite}
        className='placeholder small'
        backgroundColor={Color().whiteAndBlack}
        zIndex='99'
      >
        {name}
      </Text>
      {image && (
        <Box
          position='absolute'
          right={'4.5%'}
          top='15%'
          cursor={'pointer'}
          onClick={handleShowPassword}
          zIndex={99}
        >
          {colorMode === 'dark' ? (
            <Icon as={Padlock} />
          ) : (
            <Icon as={PasswordIcon} />
          )}
        </Box>
      )}
    </>
  );
};

export default AuthInput;
