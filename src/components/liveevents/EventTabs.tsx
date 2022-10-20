import {
  Divider,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React from "react";
import EventModal from "./eventCard/EventModal";

function EventTabs() {
  return (
    <Tabs
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={"clique.white"}
    >
      <TabList position={"sticky"} top="0" bg="clique.primaryBg" py="10px">
        <CliqueTab>Unpaid Events</CliqueTab>
        <CliqueTab>Paid Events</CliqueTab>
        <CliqueTab>Ongoing Events</CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
            <EventModal />
          </SimpleGrid>
        </CliqueTabPanel>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            <EventModal />
            <EventModal />
          </SimpleGrid>
        </CliqueTabPanel>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            <EventModal />
          </SimpleGrid>
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EventTabs;
