import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React, { useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import EventKey from "./EventKey";
import EventStream from "./EventStream";
import Monitor from "./Monitor";

function EventTab({ setState }: any) {
  const [tabIndex, setTabIndex] = useState(0);
  const event = useAppSelector((state) => state.app.stream.selectedStream);

  return (
    <Tabs
      isLazy
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={"clique.white"}
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
    >
      <TabList bg="clique.primaryBg" py="10px">
        <CliqueTab>Streaming details </CliqueTab>
        <CliqueTab>Streaming Key </CliqueTab>
        <CliqueTab>Monitor live</CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          <EventStream event={event} setTabIndex={setTabIndex} />
        </CliqueTabPanel>
        <CliqueTabPanel>
          <EventKey />
        </CliqueTabPanel>
        <CliqueTabPanel>
          <Monitor setState={setState} streamDetails={event} />
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EventTab;
