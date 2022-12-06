import { useRouter } from "next/router";
import React, { useState } from "react";
import { usePreSignupMutation } from "redux/services/auth.service";

import { Box, Text, useToast } from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import AuthInput from "@components/auth/AuthInput";
import CliqueLogo from "@components/auth/CliqueLogo";
import ShowAuthHeader from "@components/auth/ShowAuthHeader";
import ShowAuthImage from "@components/auth/ShowAuthImage";
import SocialMedia from "@components/auth/SocialMedia";
import { signUpInputData } from "@constants/utils";

import { SignUpDataInterface } from "../constants/interface";

const Signup = () => {
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
            header="Sign Up"
            detail="Connect to more Cliques today!"
          />
          <form onSubmit={handlePreSignup} className="login-form">
            <Box
              display={"flex"}
              justifyContent="space-between"
              marginTop={".5rem"}
            >
              <Box width="48%" height="57px" position="relative">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  type={"text"}
                  required={true}
                  placeholder="Firstname"
                />
                <Text
                  position="absolute"
                  top="6%"
                  left={"4.5%"}
                  fontSize="sm"
                  color="clique.white"
                  className="placeholder small"
                >
                  Firstname
                </Text>
              </Box>
              <Box width="48%" height="57px" position="relative">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  type={"text"}
                  required={true}
                  placeholder="Lastname"
                />
                <Text
                  position="absolute"
                  top="6%"
                  left={"4.5%"}
                  fontSize="sm"
                  color="clique.white"
                  className="placeholder small"
                >
                  Lastname
                </Text>
              </Box>
            </Box>
            {signUpInputData.map(({ name, image, key, inputName }) => (
              <div key={key}>
                <Box position="relative" height="57px" marginTop={".5rem"}>
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
            >
              <label
                className="remember"
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" required={true} name="" />I agree to
                the&nbsp;
                <span style={{ color: "#892cdc" }}>
                  Terms & Conditions&nbsp;
                </span>
                and&nbsp;
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
