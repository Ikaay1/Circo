import { Text, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <Text textAlign={"center"} fontSize="xl" mt="100px">
      Welcome to our next app with chakra and redux
    </Text>
  );
};

export default Home;
