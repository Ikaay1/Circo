import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import { usePreSignupMutation } from "redux/services/auth.service";

import { Box, Input, Text, useToast } from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import AuthInput from "@components/auth/AuthInput";
import CliqueLogo from "@components/auth/CliqueLogo";
import ShowAuthHeader from "@components/auth/ShowAuthHeader";
import ShowAuthImage from "@components/auth/ShowAuthImage";
import SocialMedia from "@components/auth/SocialMedia";
import Color from "@constants/color";
import { signUpInputData } from "@constants/utils";

import { SignUpDataInterface } from "../constants/interface";

const Signup = () => {
  const token = useAppSelector((state) => state.app.userReducer.token);
  const toast = useToast();
  const [preSignup, preSignupStatus] = usePreSignupMutation();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePreSignup = async (e: any) => {
    e.preventDefault();
    let allData;
    if (!referralCode) {
      allData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        ageRange: ageRange.trim(),
      };
    } else {
      allData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        referredBy: referralCode.trim(),
        ageRange: ageRange.trim(),
      };
    }

    const data = {
      firstName: firstName.trim(),
      email: email.toLowerCase().trim(),
    };

    const res: SignUpDataInterface = await preSignup(data);
    if ("data" in res) {
      // redirect to otp page and pass all data
      localStorage.setItem("hashedOtp", JSON.stringify(res.data.data.otp_hash));
      localStorage.setItem("userData", JSON.stringify(allData));
      router.push(`/otp`);
    } else if (res.error) {
      toast({
        title: "Error",
        //@ts-ignore
        description: res?.error?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Error",
        //@ts-ignore
        description: "Something went wrong, please try again ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, [token, router]);
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      // backgroundColor={Color().whiteAndBlack}
    >
      <CliqueLogo />
      <Box display={{ base: "none", lg: "block" }}>
        <ShowAuthImage />
      </Box>
      <Box
        marginLeft={{ base: "0", xl: "50%" }}
        minW={{ base: "60%", xl: "50%" }}
        py="50px"
      >
        <Box padding={"1rem"} width="450px" height={"100%"} margin="0 auto">
          <ShowAuthHeader
            header="Sign Up"
            detail="Connect to more Circos today!"
          />
          <form onSubmit={handlePreSignup} className="login-form">
            <Box
              display={"flex"}
              justifyContent="space-between"
              marginTop={".5rem"}
            >
              <Box width="48%" height="60px" position="relative">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  type={"text"}
                  required={true}
                  placeholder="Firstname"
                  backgroundColor={Color().greyAndWhite}
                  _placeholder={{
                    color: Color().blackAndWhite,
                    opacity: "0",
                  }}
                  h="60px"
                  borderWidth={"1px"}
                  borderColor={Color().greyAndWhite}
                  _focus={{
                    boxShadow: "none",
                    border: "none",
                    outline: "none",
                  }}
                  _active={{
                    boxShadow: "none",
                    border: "none",
                    outline: "none",
                  }}
                  color={Color().blackAndWhite}
                  onFocus={() => setIsFirstNameFocused(true)}
                  onBlur={() => setIsFirstNameFocused(false)}
                />
                <Text
                  position="absolute"
                  top="30%"
                  left={"8%"}
                  fontSize="sm"
                  className="placeholder small"
                  color={Color().blackAndWhite}
                  zIndex="99"
                ></Text>{" "}
                <Text
                  position="absolute"
                  top="0%"
                  left={"8%"}
                  fontSize="sm3"
                  pt="5px"
                  color={Color().blackAndWhite}
                  transition="all .3s ease"
                  transform={
                    isFirstNameFocused || firstName !== ""
                      ? "translateY(0%)"
                      : "translateY(50%); font-size: 1rem"
                  }
                  zIndex="99"
                >
                  Firstname
                </Text>
              </Box>
              <Box width="48%" height="60px" position="relative">
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  _focus={{
                    boxShadow: "none",
                    border: "none",
                    outline: "none",
                  }}
                  _active={{
                    boxShadow: "none",
                    border: "none",
                    outline: "none",
                  }}
                  className="input"
                  type={"text"}
                  required={true}
                  placeholder="Lastname"
                  color={Color().blackAndWhite}
                  backgroundColor={Color().greyAndWhite}
                  _placeholder={{
                    color: Color().blackAndWhite,
                    opacity:  "0" 
                  }}
                  borderWidth={"1px"}
                  h="60px"
                  borderColor={Color().greyAndWhite}
                  onFocus={() => setIsLastNameFocused(true)}
                  onBlur={() => setIsLastNameFocused(false)}
                />

                <Text
                  position="absolute"
                  top="0%"
                  left={"8%"}
                  fontSize="sm3"
                  pt="5px"
                  color={Color().blackAndWhite}
                  zIndex="99"
                  transition="all .3s ease"
                  transform={
                    isLastNameFocused || lastName !== ""
                      ? "translateY(0%)"
                      : "translateY(50%); font-size: 1rem"
                  }
                >
                  Lastname
                </Text>
              </Box>
            </Box>
            {signUpInputData.map(({ name, image, key, inputName }) => (
              <div key={key}>
                <Box position="relative" height="60px" marginTop={".5rem"}>
                  <AuthInput
                    image={image}
                    name={name}
                    handleShowPassword={handleShowPassword}
                    theState={
                      image
                        ? password
                        : inputName === "referralCode"
                        ? referralCode
                        : inputName === "userName"
                        ? userName
                        : email
                    }
                    setTheState={
                      image
                        ? setPassword
                        : inputName === "referralCode"
                        ? setReferralCode
                        : inputName === "email"
                        ? setEmail
                        : setUserName
                    }
                    showPassword={showPassword}
                    email={inputName === "email"}
                    referral={inputName === "referralCode"}
                  />
                </Box>
              </div>
            ))}

            <Box position="relative" height="57px" marginTop={".5rem"}>
              <AuthInput
                name={"Age Range"}
                option={["18 and above", "Below 18"]}
                ageRange={ageRange}
                setAgeRange={setAgeRange}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              marginTop={"1.6rem"}
              color={Color().blackAndWhite}
            >
              <label
                className="remember"
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <input
                  color={Color().blackAndWhite}
                  type="checkbox"
                  required={true}
                  name=""
                />
                <Box color={Color().blackAndWhite} as="span">
                  I agree to the&nbsp;
                </Box>
                <span style={{ color: "#892cdc" }}>
                  Terms & Conditions&nbsp;
                </span>
                <Box color={Color().blackAndWhite} as="span">
                  and&nbsp;
                </Box>
                <span style={{ color: "#892cdc" }}>Privacy Policy</span>
              </label>
            </Box>
            <AuthButton
              status={preSignupStatus}
              {...{ marginTop: "1.2rem" }}
              name="Sign Up"
            />
          </form>
          <SocialMedia
            haveAccount={"Already have an account?"}
            text={"Login here"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
