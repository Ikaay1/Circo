import Header from "@/components/widgets/Header";
import { Box } from "@chakra-ui/react";
import React from "react";
import { IHomeLayoutProps } from "types";

function HomeLayout({ children }: IHomeLayoutProps) {
  return (
    <Box>
      <Header />
    </Box>
  );
}

export default HomeLayout;
