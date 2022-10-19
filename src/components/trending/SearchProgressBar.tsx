import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";

function SearchProgressBar() {
  return (
    <Box mb="15px">
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"14px"} fontFamily={"Poppins"}>
          Title
        </Text>
        <Text fontFamily={"Poppins"} fontSize={"12px"}>
          20000
        </Text>
      </Flex>

      <Progress
        colorScheme="yellow"
        size={"sm"}
        rounded={"full"}
        value={50}
        color="red"
        background="clique.progressBg"
        sx={{
          "& > div": {
            background: "clique.yellow",
            borderRadius: "full",
          },
        }}
      />
    </Box>
  );
}

export default SearchProgressBar;
