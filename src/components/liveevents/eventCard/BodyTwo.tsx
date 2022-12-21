import { Button, Icon, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

function BodyTwo({ setStep }: { setStep: (step: number) => void }) {
  return (
    <>
      <Icon
        as={BiArrowBack}
        onClick={() => setStep(1)}
        color="clique.white"
        fontSize="2xl"
        cursor={"pointer"}
      />

      <Text
        mt="10px"
        color={"clique.white"}
        fontFamily={"Unbounded"}
        fontWeight={400}
        fontSize={"smSubHead"}
        lineHeight={"1.5"}
        mr="5px"
      >
        We need to talk about this
      </Text>
      <Button
        mt={"20px"}
        w="full"
        size="lg"
        onClick={() => setStep(2)}
        bg="clique.base"
        color="clique.white"
        rounded={"full"}
        colorScheme="purple"
      >
        Pay For Live
      </Button>
    </>
  );
}

export default BodyTwo;
