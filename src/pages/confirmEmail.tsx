import React, { useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import AuthInput from "@components/auth/AuthInput";
import { CliqueLogo } from "@components/landing/Navbar";

import { ShowAuthHeader, ShowAuthImage } from "./login";

const ConfirmEmail = () => {
  const [email, setEmail] = useState("");

  return (
    <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <CliqueLogo />
      <ShowAuthImage />
      <Box
        marginLeft={{ base: "40%", xl: "50%" }}
        minW={{ base: "60%", xl: "50%" }}
        py="50px"
      >
        <Box padding={"1rem"} width="450px" height={"100%"} margin="0 auto">
          <ShowAuthHeader
            header="Change Password"
            detail="Enter your Clique email address to chnage password"
          />
          <form onSubmit={(e) => e.preventDefault()} className="login-form">
            <Box position="relative" height="57px" marginTop={".5rem"}>
              <AuthInput
                name={"Email"}
                theState={email}
                setTheState={setEmail}
              />
            </Box>
            <Text
              color="clique.secondaryGrey2"
              textAlign="center"
              marginTop="5.5rem"
            >
              You will receive an email with a link to verify your account then,
              you can change your password
            </Text>
            <AuthButton {...{ marginTop: ".8rem" }} name="Next" />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
