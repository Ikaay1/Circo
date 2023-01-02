import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "redux/app/hooks";
import { useSignupMutation } from "redux/services/auth.service";
import { setCredentials } from "redux/slices/authSlice";

import {
  Box,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import { CategoriesInterface, LoginDataInterface } from "@constants/interface";
import { scrollBarStyle } from "@constants/utils";
import PlusIcon from "@icons/PlusIcon";

import TickIcon from "../assets/icons/TickIcon";
import { useCategoryQuery } from "../redux/services/category.service";

const Interests = () => {
  const { data, isLoading } = useCategoryQuery("");
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  const [signup, signUpStatus] = useSignupMutation();

  const handleSignUp = async () => {
    if (!categories.length) {
      toast.error("Please choose your interests");
      return;
    }
    let userData = JSON.parse(localStorage.getItem("userData")!);
    userData = {
      ...userData,
      interests: categories,
    };

    const res: any = await signup(userData);

    localStorage.removeItem("userData");
    if ("data" in res) {
      dispatch(
        setCredentials({
          payload: res.data,
        })
      );
      router.push("/home");
      localStorage.removeItem("userData");
    } else {
      toast.error(res.error?.data?.message);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      height={"100vh"}
      overflowY="scroll"
      sx={scrollBarStyle}
    >
      <Box
        width={"850px"}
        bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}
        padding={"1.5rem 3rem"}
      >
        <Text
          fontSize="head"
          lineHeight="32px"
          color="clique.white"
          textAlign={"center"}
        >
          Personalize your Interest
        </Text>
        <Text
          lineHeight="24px"
          color="clique.secondaryGrey2"
          textAlign={"center"}
        >
          Help us personalize your interest by telling us what you like.
        </Text>
        <Box
          display={"flex"}
          gap="16px 6.65px"
          flexWrap={"wrap"}
          marginTop="3rem"
        >
          {data ? (
            <>
              {data.data.map((category: CategoriesInterface) => (
                <Box
                  display={"flex"}
                  alignItems="center"
                  bg={
                    categories.includes(category._id)
                      ? "clique.paleGreen"
                      : "clique.paleGrey"
                  }
                  padding="10.5px"
                  borderRadius={"26.58px"}
                  key={category._id}
                  cursor={"pointer"}
                  onClick={() =>
                    setCategories((prevCategories) =>
                      prevCategories.includes(category._id)
                        ? prevCategories.filter((id) => id !== category._id)
                        : [...prevCategories, category._id]
                    )
                  }
                >
                  <Text
                    mr=".55rem"
                    fontSize="sm2"
                    lineHeight="27px"
                    color="clique.white"
                  >
                    {category.name}
                  </Text>
                  <Icon
                    as={categories.includes(category._id) ? TickIcon : PlusIcon}
                  />
                </Box>
              ))}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6, 7].map((each) => (
                <Box boxShadow="lg" key={each}>
                  <SkeletonCircle w="150px" h="50px" />
                </Box>
              ))}
            </>
          )}
        </Box>
        {data && (
          <Box marginTop="2rem">
            <AuthButton
              w="380px"
              margin={"0 auto"}
              name="Let's go!"
              onClick={handleSignUp}
              status={signUpStatus}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Interests;
