import SideMenu from "@components/widgets/sideMenu";
import { Flex } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";

function Index() {
  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
