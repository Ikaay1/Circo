import { Tab } from "@chakra-ui/react";
import React from "react";

function CliqueTab({ children }: { children: React.ReactNode }) {
  return (
    <Tab
      px={0}
      mr="20px"
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
