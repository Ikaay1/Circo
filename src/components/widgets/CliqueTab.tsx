import { Tab } from "@chakra-ui/react";
import React from "react";

function CliqueTab({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Tab
      onClick={onClick}
      px={0}
      mr="20px"
      fontSize={"smSubHead"}
      py="5px"
      _selected={{
        borderBottom: "3px solid",
        borderColor: "clique.base",
      }}
    >
      {children}
    </Tab>
  );
}

export default CliqueTab;
