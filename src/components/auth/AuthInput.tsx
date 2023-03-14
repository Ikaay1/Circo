import React from "react";

import { Box, Icon, Input, Select, Text, useColorMode } from "@chakra-ui/react";
import Color from "@constants/color";
import Padlock from "@icons/Padlock";
import PasswordIcon from "@icons/PasswordIcon";

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
          className="input"
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
          backgroundColor={Color().greyAndWhite}
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
          borderColor={Color().greyAndWhite}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <Select
          value={ageRange}
          bg={Color().greyAndWhite}
          borderWidth={"1px"}
          borderColor={Color().greyAndWhite}
          borderRadius="12px"
          //   pl="1.3rem"
          _focus={{ boxShadow: "none" }}
          h="60px"
          w="100%"
          onChange={(e) => setAgeRange(e.target.value)}
          className="input"
          required={true}
          placeholder={"Select " + name}
        >
          {option.map((item: any, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
      )}
      {theState !== "" && (
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
        <Box
          position="absolute"
          right={"4.5%"}
          top="50%"
          transform="translateY(-50%)"
          cursor={"pointer"}
          onClick={handleShowPassword}
        >
          {colorMode === "dark" ? (
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
