import { Box, Flex, Image, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import { useRouter } from "next/router";
import React from "react";

function TrendCard({ position }: { position: string }) {
  const router = useRouter();

  return (
    <Flex
      onClick={() => router.push("/player/" + position)}
      cursor={"pointer"}
      position={"relative"}
      _before={{
        content: `"${position}"`,
        position: "absolute",
        fontSize: "big",
        left: "-20px",
        top: "-35px",
        color: "clique.base",
        fontWeight: 500,
      }}
      alignItems={"center"}
      rounded={"20px"}
      px="50px"
      py="20px"
      mt="30px"
      h="220px"
      bg="clique.white"
    >
      <Box minW="50%" pr="40px">
        <Image
          maxH={"100%"}
          mr="30px"
          src="/assets/kortyvid.png"
          alt="kortyvid"
        />
      </Box>

      <Box w="50%">
        <Flex>
          <AvataWithSpace
            mr="10px"
            name="Prosper Otemuyiwa"
            url="https://bit.ly/prosper-baba"
            size="45px"
            borderColor="clique.brown"
            borderThickness="3px"
          />

          <Box>
            <Text
              fontFamily={"Poppins"}
              fontSize="smSubHead"
              color={"clique.lightGrey"}
            >
              Emma
            </Text>
            <Flex mt="5px" alignItems={"center"}>
              <Text
                noOfLines={2}
                color={"clique.lightGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
                mr="10px"
              >
                1.2k views
              </Text>
              <Text
                pos={"relative"}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 0,
                  width: "4px",
                  background: "clique.lightGrey",
                  height: "4px",
                  rounded: "full",
                }}
                pl="10px"
                noOfLines={2}
                color={"clique.lightGrey"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"smSubHead"}
                lineHeight={"1.2"}
              >
                3 days ago
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Text
          mt="5px"
          color={"clique.black"}
          fontFamily={"Poppins"}
          fontWeight={700}
          textTransform={"capitalize"}
          fontSize="head"
        >
          Eniola korty eo
        </Text>

        <Text
          fontFamily={"Poppins"}
          fontSize="smSubHead"
          color={"clique.lightGrey"}
        >
          My journey so far has been amazing thanks to you guys. I’m ALMOST
          there
        </Text>
      </Box>
    </Flex>
  );
}

export default TrendCard;
