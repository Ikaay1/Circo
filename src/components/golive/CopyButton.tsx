import { Box, Button, GridItem, useColorModeValue } from "@chakra-ui/react";
import Color from "@constants/color";
import React, { useEffect } from "react";

function CopyButton({ value }: { value: string }) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (e: string) => {
    navigator.clipboard.writeText(e);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);
  const valueC = useColorModeValue("clique.white", "clique.secondaryGrey1");
  return (
    <GridItem
      colSpan={3}
      justifySelf="center"
      onClick={() => {
        handleCopy(value);
      }}
    >
      <Box bg={valueC} px="2" py="3" borderRadius={"10px"}>
        <Button
          _hover={{
            bg: "none",
          }}
          bg="none"
          color={Color().blackAndWhite}
        >
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </Box>
    </GridItem>
  );
}

export default CopyButton;
