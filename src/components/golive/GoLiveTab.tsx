import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React, { useState } from "react";
import Stream from "./Stream";
import StreamKey from "./StreamKey";

function GoLiveTab({ state }: { state: string }) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs
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
          <Stream state={state} setTabIndex={setTabIndex} />
        </CliqueTabPanel>
        <CliqueTabPanel>
          <StreamKey />
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GoLiveTab;
