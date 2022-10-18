import { CliqueLogo } from "@components/landing/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { controlInput, signUpInputData } from "@constants/utils";
import { ShowAuthHeader, ShowAuthImage, SocialMedia } from "./login";
import {
  usePreSignupMutation,
  useSignupMutation,
} from "redux/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Signup = () => {
  const [preSignup, preSignupStatus] = usePreSignupMutation();
  const [signup, signUpStatus] = useSignupMutation();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".input");
    const texts: NodeListOf<HTMLParagraphElement> =
      document.querySelectorAll(".placeholder");

    if (inputs[0].value) {
      controlInput(0, 1, false, texts);
    }
    if (inputs[1].value) {
      controlInput(2, 3, false, texts);
    }
    if (inputs[2].value) {
      controlInput(4, 5, false, texts);
    }
    if (inputs[3].value) {
      controlInput(6, 7, false, texts);
    }
    if (inputs[4].value) {
      controlInput(8, 9, false, texts);
    }
    if (inputs[0].value === "") {
      controlInput(0, 1, true, texts);
    }
    if (inputs[1].value === "") {
      controlInput(2, 3, true, texts);
    }
    if (inputs[2].value === "") {
      controlInput(4, 5, true, texts);
    }
    if (inputs[3].value === "") {
      controlInput(6, 7, true, texts);
    }
    if (inputs[4].value === "") {
      controlInput(8, 9, true, texts);
    }
  }, [userName, password, email, firstName, lastName]);

  const handlePreSignup = async (e: any) => {
    e.preventDefault();

    const allData = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
    };

    const data = {
      firstName: firstName,
      email: email,
    };

    const res: any = await preSignup(data);
    console.log(res);
    if (res.data) {
      // redirect to otp page and pass all data
      router.push(
        `/otp?data=${JSON.stringify(allData)}&hascode=${JSON.stringify(
          res.data
        )}`
      );
    } else if (res.error) {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <CliqueLogo />
      <ShowAuthImage height="900px" />
      <Box width={"700px"} marginTop="2rem">
        <Box padding={"1rem"} width="450px" height={"100%"} margin="0 auto">
          <ShowAuthHeader
            header="Sign Up"
            detail="Connect to more Cliques today!"
          />
          <form onSubmit={handlePreSignup} className="login-form">
            {signUpInputData.map(
              ({ name, image, key, placeholder, inputName }) => (
                <div key={key}>
                  <Box position="relative" height="57px" marginTop={".5rem"}>
                    <input
                      value={
                        image
                          ? password
                          : inputName === "userName"
                          ? userName
                          : inputName === "firstName"
                          ? firstName
                          : inputName === "lastName"
                          ? lastName
                          : email
                      }
                      onChange={
                        image
                          ? (e) => setPassword(e.target.value)
                          : inputName === "firstName"
                          ? (e) => setFirstName(e.target.value)
                          : inputName === "lastName"
                          ? (e) => setLastName(e.target.value)
                          : inputName === "email"
                          ? (e) => setEmail(e.target.value)
                          : (e) => setUserName(e.target.value)
                      }
                      className="input"
                      type={image ? "password" : "text"}
                      required={true}
                    />
                    <Text
                      position="absolute"
                      top="6%"
                      left={"4.5%"}
                      fontSize="12px"
                      color="#FFFFFF"
                      className="placeholder small"
                    >
                      {name}
                    </Text>
                    <Text
                      fontSize="16px"
                      color="#FFFFFF"
                      position="absolute"
                      left={"4.5%"}
                      bottom="20%"
                      className="placeholder big"
                    >
                      {placeholder}
                    </Text>
                    {image && (
                      <Image
                        position="absolute"
                        right={"4.5%"}
                        bottom="26%"
                        src={image}
                        cursor={"pointer"}
                        alt="show password"
                      />
                    )}
                  </Box>
                </div>
              )
            )}
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

            <Button
              type="submit"
              background="#892cdc"
              borderRadius="50px"
              width="100%;"
              height="60px;"
              display="flex;"
              alignItems="center"
              justifyContent="center"
              fontWeight="500"
              fontSize="26px"
              letterSpacing="-0.02em"
              color="#ffffff "
              marginTop="1.2rem"
              isLoading={preSignupStatus.isLoading}
            >
              Sign Up
            </Button>
          </form>
          <SocialMedia haveAccount={"Already have an account?"} login={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
