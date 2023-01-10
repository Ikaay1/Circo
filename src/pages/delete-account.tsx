import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

function DeleteAccount() {
  const router = useRouter();
  return (
    <Box>
      <Box
        w="200px"
        cursor={"pointer"}
        onClick={() => router.push("/home")}
        maxW="200px"
        minW="200px"
      >
        <Image alt="clique logo" h="100%" src="/assets/Clique-Logo.svg" />
      </Box>
    </Box>
  );
}

export default DeleteAccount;
