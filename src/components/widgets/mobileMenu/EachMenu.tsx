import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function EachMenu({ name, icon, type, item }: any) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
      {type === "sub" ? (
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
              >
                {name}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <Flex
              mt="5px"
              cursor={"pointer"}
              // onClick={}
              h="40px"
              position={"relative"}
              _before={{
                content: '""',
                display:
                  path === "/" + name.replace(/\s/g, "").toLowerCase()
                    ? "block"
                    : "none",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 0,
                width: "6px",
                height: "25px",
                background: "clique.base",
                borderRightRadius: "4px",
                boxShadow: "10px 0px 18px #892CDC",
              }}
            >
              <Flex
                pl="50px"
                _hover={{
                  color: "clique.base",
                }}
                transition={"all 0.2s ease-in-out"}
                color={
                  path === "/" + name.replace(/\s/g, "").toLowerCase()
                    ? "clique.base"
                    : "clique.whiteGrey"
                }
                alignItems={"center"}
              >
                <Icon mr="15px" />
                <Text
                  fontFamily={"Poppins"}
                  fontWeight={500}
                  textTransform={"capitalize"}
                >
                  Name
                </Text>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ) : (
        <Flex
          mt="5px"
          cursor={"pointer"}
          onClick={() => {
            if (type === "menu") {
              router.push(`/${name.replace(/\s/g, "").toLowerCase()}`);
            }
          }}
          h="40px"
          position={"relative"}
          _before={{
            content: '""',
            display:
              path === "/" + name.replace(/\s/g, "").toLowerCase()
                ? "block"
                : "none",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            width: "6px",
            height: "25px",
            background: "clique.base",
            borderRightRadius: "4px",
            boxShadow: "10px 0px 18px #892CDC",
          }}
        >
          <Flex
            pl="50px"
            _hover={{
              color: "clique.base",
            }}
            transition={"all 0.2s ease-in-out"}
            color={
              path === "/" + name.replace(/\s/g, "").toLowerCase()
                ? "clique.base"
                : "clique.whiteGrey"
            }
            alignItems={"center"}
          >
            <Icon mr="15px" as={icon} />
            <Text
              fontFamily={"Poppins"}
              fontWeight={500}
              textTransform={"capitalize"}
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default EachMenu;
