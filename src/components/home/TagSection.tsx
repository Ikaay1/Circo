import React from "react";

import { Button, HStack, useColorModeValue } from "@chakra-ui/react";

import { CategoriesInterface } from "../../constants/interface";

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
      // position={'sticky'}
      top="0"
      // bg='clique.primaryBg'
      alignItems={"center"}
      maxW="100%"
      flexWrap={"wrap"}
      bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}
    >
      <Button
        variant="ghost"
        rounded={"full"}
        bg={categoryId === "all" ? "clique.base" : "clique.grey"}
        fontFamily={"Unbounded"}
        size={"sm"}
        fontWeight={400}
        px="20px"
        color={categoryId === "all" ? "clique.black" : "clique.white"}
        onClick={() => {
          setCategoryId("all");
          setPage(1);
        }}
      >
        All
      </Button>
      {categories.map((eachCategory) => (
        <Button
          variant="ghost"
          rounded={"full"}
          bg={categoryId === eachCategory._id ? "clique.base" : "clique.grey"}
          fontFamily={"Unbounded"}
          size={"sm"}
          px="20px"
          fontWeight={400}
          color={
            categoryId === eachCategory._id ? "clique.black" : "clique.white"
          }
          key={eachCategory.name}
          onClick={() => {
            setCategoryId(eachCategory._id);
            setPage(1);
          }}
        >
          {eachCategory.name}
        </Button>
      ))}
    </HStack>
  );
}

export default TagSection;
