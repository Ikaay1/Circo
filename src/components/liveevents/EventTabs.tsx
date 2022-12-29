import React from "react";
import { useGetAllLiveStreamQuery } from "redux/services/livestream/live.service";

import { Box, SimpleGrid, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";

import CardLoader from "./CardLoad";
import EventModal from "./eventCard/EventModal";

function EventTabs() {
  const [paid, setPaid] = React.useState("");
  const [ongoing, setOngoing] = React.useState("");
  const { data, isFetching } = useGetAllLiveStreamQuery({
    paid,
    ongoing,
  });
  return (
    <Tabs
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={"clique.white"}
      isLazy
    >
      <TabList bg="clique.primaryBg" py="10px">
        <CliqueTab
          onClick={() => {
            setPaid("");
            setOngoing("");
          }}
        >
          All Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("false");
            setOngoing("");
          }}
        >
          Free Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("true");
            setOngoing("");
          }}
        >
          Paid Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("");
            setOngoing("true");
          }}
        >
          Ongoing Events
        </CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          {isFetching ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
            >
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <CardLoader key={i} />
                ))}
              </>
            </SimpleGrid>
          ) : data && data.data.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
            >
              {data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              w={{ base: "100%", lg: "calc(100vw - 250px)" }}
              h={{ lg: "60vh" }}
            >
              <EmptyState msg="No events yet" />
            </Box>
          )}
        </CliqueTabPanel>
        <CliqueTabPanel>
          {isFetching ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <CardLoader key={i} />
                ))}
              </>
            </SimpleGrid>
          ) : data && data.data.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              {data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              w={{ base: "100%", lg: "calc(100vw - 250px)" }}
              h={{ lg: "60vh" }}
            >
              <EmptyState msg="No unpaid events yet" />
            </Box>
          )}
        </CliqueTabPanel>
        <CliqueTabPanel>
          {isFetching ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <CardLoader key={i} />
                ))}
              </>
            </SimpleGrid>
          ) : data && data.data.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              {data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              w={{ base: "100%", lg: "calc(100vw - 250px)" }}
              h={{ lg: "60vh" }}
            >
              <EmptyState msg="No paid events yet" />
            </Box>
          )}
        </CliqueTabPanel>
        <CliqueTabPanel>
          {isFetching ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <CardLoader key={i} />
                ))}
              </>
            </SimpleGrid>
          ) : data && data.data.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
              w="full"
            >
              {data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              w={{ base: "100%", lg: "calc(100vw - 250px)" }}
              h={{ lg: "60vh" }}
            >
              <EmptyState msg="No ongoing events yet" />
            </Box>
          )}
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EventTabs;
