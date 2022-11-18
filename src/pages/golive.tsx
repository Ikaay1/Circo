import { Box, Text } from "@chakra-ui/react";
import EventTab from "@components/golive/EventTab";
import GoLiveTab from "@components/golive/GoLiveTab";
import LiveEventPage from "@components/golive/LiveEventPage";
import NewLiveTab from "@components/golive/NewLiveTab";
import SideMenu from "@components/golive/SideMenu";
import Header from "@components/widgets/Header";
import { scrollBarStyle } from "@constants/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

function Index({}: Props) {
  const router = useRouter();
  const [state, setState] = useState<string>("stream");

  return (
    <Box>
      <Header />
      <Box h={{ lg: "90vh" }} display="flex" bg="clique.primaryBg">
        <Box flex="1" h="100%">
          <SideMenu click={(route) => setState(route)} />
        </Box>
        <Box
          maxW={"calc(100vw - 250px)"}
          minW={"calc(100vw - 250px)"}
          px="30px"
          h="100%"
          maxH={"90vh"}
          pb="12"
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          {state === "stream" && (
            <Box>
              {" "}
              <Text
                pt="20px"
                position={"relative"}
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
                fontSize="head"
                lineHeight={"1"}
              >
                Stream
              </Text>{" "}
              <GoLiveTab state={state} />
            </Box>
          )}
          {state === "liveevent" && (
            <Box>
              <Text
                pt="20px"
                position={"relative"}
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
                fontSize="head"
                lineHeight={"1"}
              >
                Live Event
              </Text>
              <LiveEventPage setState={setState} state={state} />
            </Box>
          )}

          {state === "create" && (
            <Box>
              <Text
                pt="20px"
                position={"relative"}
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
                fontSize="head"
                lineHeight={"1"}
              >
                Create Live Event
              </Text>
              <NewLiveTab setState={setState} state={state} />
            </Box>
          )}
          {state === "viewevent" && (
            <Box>
              <Text
                pt="20px"
                position={"relative"}
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
                fontSize="head"
                lineHeight={"1"}
              >
                Go Live
              </Text>
              <EventTab setState={setState} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
