import { Button, Text } from "@chakra-ui/react";

function BodyOne({ setStep }: { setStep: (step: number) => void }) {
  return (
    <>
      <Text
        mt="20px"
        color={"clique.base"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"smSubHead"}
        lineHeight={"1.3"}
        textTransform={"uppercase"}
        mr="5px"
      >
        TIWA SAVAGE LIVE - ONTARIO CANDA DEC 28 . 8PM
      </Text>
      <Text
        mt="20px"
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"smSubHead"}
        lineHeight={"1.5"}
        mr="5px"
      >
        <Text color={"clique.base"} as="span">
          About:
        </Text>{" "}
        Lörem ipsum suledes. Safönde pred in. Oskap nil reaning har ultrare.
        Vajuska varade, cynfili parade, på öl. Intrabel tralingar. Prer gps-väst
        som kat igöskapet. Söning 5:2-diet
      </Text>
      <Button
        mt={"50px"}
        w="full"
        size="lg"
        // onClick={() => setStep(2)}
        bg="clique.base"
        color="clique.white"
        rounded={"full"}
        colorScheme="purple"
      >
        Purchase Ticket
      </Button>
    </>
  );
}

export default BodyOne;
