import { TabPanel } from "@chakra-ui/react";
import React from "react";

function CliqueTabPanel({ children }: { children: React.ReactNode }) {
  return <TabPanel px={0}>{children}</TabPanel>;
}

export default CliqueTabPanel;
