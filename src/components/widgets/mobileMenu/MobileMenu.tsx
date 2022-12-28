import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import { mobileMenu } from "@constants/utils";
import React from "react";
import EachMenu from "./EachMenu";

function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <SlideFade in={isOpen} offsetX="-20px" offsetY="0">
      <Box
        pt="20px"
        pb="100px"
        position={"fixed"}
        left="0"
        top="10vh"
        minW="100vw"
        minH={"90vh"}
        px="20px"
        zIndex={1000}
        bg="clique.black"
        shadow="md"
      >
        <Accordion allowToggle>
          {mobileMenu.map((item, index) => (
            <EachMenu
              key={index}
              name={item.name}
              icon={item.icon}
              type={item.type}
              item={item}
            />
          ))}
        </Accordion>
      </Box>
    </SlideFade>
  );
}

export default MobileMenu;
