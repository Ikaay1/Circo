import React from "react";
import { useGetAllLiveStreamQuery } from "redux/services/livestream/live.service";

import {
  Box,
  Input,
  SimpleGrid,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";

import { scrollBarStyle2 } from "../../constants/utils";
import CardLoader from "./CardLoad";
import EventModal from "./eventCard/EventModal";
import Color from "@constants/color";

function EventTabs() {
  const [paid, setPaid] = React.useState("");
  const [ongoing, setOngoing] = React.useState("");
  const [search, setSearch] = React.useState("");
  const { data, isFetching } = useGetAllLiveStreamQuery({
    paid,
    ongoing,
    search,
  });

  return (
    <Tabs
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={Color().blackAndWhite}
      isLazy
    >
      <TabList
        bg={Color().lightAndPrimary}
        py="10px"
        overflowX={"auto"}
        sx={scrollBarStyle2}
      >
        <CliqueTab
          onClick={() => {
            setPaid("");
            setOngoing("");
            setSearch("");
          }}
        >
          All Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("false");
            setOngoing("");
            setSearch("");
          }}
        >
          Free Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("true");
            setOngoing("");
            setSearch("");
          }}
        >
          Paid Events
        </CliqueTab>
        <CliqueTab
          onClick={() => {
            setPaid("");
            setOngoing("true");
            setSearch("");
          }}
        >
          Ongoing Events
        </CliqueTab>
      </TabList>

      <Input
        w="200px"
        rounded={"full"}
        _focus={{
          boxShadow: "none",
          outline: "none",
          border: "1px solid grey",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
          }
        }}
        placeholder={"search live event"}
      />
      <TabPanels>
        <CliqueTabPanel>
          {isFetching ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3, mlg: 4, xl: 5 }}
              spacing="30px"
            >
              <>
                {[1, 2, 3, 4].map((i) => (
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
                {[1, 2, 3, 4].map((i) => (
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
                {[1, 2, 3, 4].map((i) => (
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
                {[1, 2, 3, 4].map((i) => (
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
