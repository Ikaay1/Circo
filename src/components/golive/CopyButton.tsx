import { Box, Button, GridItem } from "@chakra-ui/react";
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
      }, 2000);
    }
  }, [isCopied]);
  return (
    <GridItem
      colSpan={3}
      justifySelf="center"
      onClick={() => {
        handleCopy(value);
      }}
    >
      <Box bg="clique.secondaryGrey1" px="2" py="3" borderRadius={"10px"}>
        <Button
          _hover={{
            bg: "none",
          }}
          bg="none"
        >
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </Box>
    </GridItem>
  );
}

export default CopyButton;
