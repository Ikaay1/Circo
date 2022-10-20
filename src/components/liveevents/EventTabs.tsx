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
      <TabList>
        <CliqueTab>Unpaid Events</CliqueTab>
        <CliqueTab>Paid Events</CliqueTab>
        <CliqueTab>Ongoing Events</CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          <SimpleGrid columns={4}>
            <EventModal />
          </SimpleGrid>
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EventTabs;
