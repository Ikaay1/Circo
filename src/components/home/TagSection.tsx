import React from "react";

import { Button, HStack, useColorModeValue } from "@chakra-ui/react";

import { CategoriesInterface } from "../../constants/interface";
import { scrollBarStyle4 } from "../../constants/utils";
import Color from "@constants/color";

function TagSection({
  categories,
  setCategoryId,
  setPage,
  categoryId,
}: {
  categories: CategoriesInterface[];
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  categoryId: string;
}) {
  return (
    <HStack
      gap="10px 1px"
      py="10px"
      px={{ base: "10px", lg: "0px" }}
      // position={'sticky'}
      top="0"
      alignItems={"center"}
      maxW="100%"
      overflowX={"auto"}
      sx={scrollBarStyle4}
    >
      <Button
        variant="ghost"
        rounded={"full"}
        bg={categoryId === "all" ? "clique.base" : Color().blackAndWhiteGrey}
        fontFamily={"Poppins"}
        size={"sm"}
        fontWeight={400}
        px="20px"
        color={
          categoryId === "all" ? Color().whiteAndBlack : Color().blackAndWhite
        }
        onClick={() => {
          setCategoryId("all");
          setPage(1);
        }}
        flexShrink={0}
      >
        All
      </Button>
      {categories.map((eachCategory) => (
        <Button
          variant="ghost"
          rounded={"full"}
          bg={
            categoryId === eachCategory._id
              ? "clique.base"
              : Color().greyAndPureWhite
          }
          fontFamily={"Poppins"}
          size={"sm"}
          px="20px"
          fontWeight={400}
          color={
            categoryId === eachCategory._id
              ? Color().whiteAndBlack
              : Color().blackAndWhite
          }
          key={eachCategory.name}
          onClick={() => {
            setCategoryId(eachCategory._id);
            setPage(1);
          }}
          flexShrink={0}
        >
          {eachCategory.name}
        </Button>
      ))}
    </HStack>
  );
}

export default TagSection;
