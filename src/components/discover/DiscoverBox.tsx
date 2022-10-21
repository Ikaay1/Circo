import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import DiscoverCard from "./DiscoverCard";

function DiscoverBox() {
  return (
    <SimpleGrid columns={2} spacing="50px">
      <DiscoverCard />
      <DiscoverCard />
    </SimpleGrid>
  );
}

export default DiscoverBox;
