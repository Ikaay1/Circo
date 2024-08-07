import React from "react";

import {
  Box,
  Flex,
  Icon,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Color from "@constants/color";
import Padlock from "@icons/Padlock";
import PasswordIcon from "@icons/PasswordIcon";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  onBlur,
}: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <>
      {!option ? (
        <Input
          value={theState}
          h="62px"
          borderRadius="12px"
          onChange={(e) => setTheState(e.target.value)}
          _focus={{ boxShadow: "none", border: "none", outline: "none" }}
          _active={{ boxShadow: "none", border: "none", outline: "none" }}
          // className='input'
          type={
            !i
              ? image
                ? showPassword
                  ? "text"
                  : "password"
                : email
                ? "email"
                : "text"
              : i === 1
              ? showPassword0
                ? "text"
                : "password"
              : showPassword1
              ? "text"
              : "password"
          }
          required={referral ? false : true}
          placeholder={name}
          color={Color().blackAndWhite}
          backgroundColor={Color().greyAndPureWhite}
          _placeholder={{
            color: Color().blackAndWhite,
            fontSize: isFocused || theState !== "" ? "sm3" : "1rem",
            pb: isFocused || theState !== "" ? "5px" : "0",
            transition: "all .3s ease",
            transform:
              isFocused || theState !== ""
                ? "translateY(-110%);  "
                : "translateY(0%); ",
          }}
          borderWidth={"1px"}
          borderColor={Color().greyAndPureWhite}
          onFocus={() => setIsFocused(true)}
          onBlur={
            !onBlur
              ? () => setIsFocused(false)
              : () => {
                  setIsFocused(false);
                  onBlur();
                }
          }
        />
      ) : (
        <Select
          value={ageRange}
          bg={Color().greyAndPureWhite}
          borderWidth={"1px"}
          borderColor={Color().greyAndPureWhite}
          borderRadius="12px"
          //   pl="1.3rem"
          _focus={{ boxShadow: "none" }}
          h="60px"
          w="100%"
          onChange={(e) => setAgeRange(e.target.value)}
          className="input"
          required={true}
          placeholder={"Select " + name}
          _placeholder={{
            color: Color().blackAndWhite,
          }}
        >
          {option.map((item: any, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
      )}
      {theState !== "" && !option && (
        <Text
          position="absolute"
          left={"4%"}
          pt="5px"
          fontSize="sm3"
          color={Color().blackAndWhite}
          transition="all .3s ease"
          top="0%"
          transform={
            isFocused || theState !== ""
              ? "translateY(0%)"
              : "translateY(50%); font-size: 1rem"
          }
          zIndex="99"
        >
          {name}
        </Text>
      )}

      {image && (
        <Flex
          alignItems={"center"}
          position="absolute"
          right={"4.5%"}
          top="50%"
          transform="translateY(-50%)"
          cursor={"pointer"}
          onClick={handleShowPassword}
          zIndex="99"
        >
          {colorMode === "dark" ? (
            showPassword ? (
              <Icon as={AiFillEyeInvisible} fontSize={"20px"} />
            ) : (
              <Icon as={AiFillEye} fontSize={"20px"} />
            )
          ) : showPassword ? (
            <Icon as={AiFillEyeInvisible} fontSize={"20px"} />
          ) : (
            <Icon as={AiFillEye} fontSize={"20px"} />
          )}
        </Flex>
      )}
    </>
  );
};

export default AuthInput;
