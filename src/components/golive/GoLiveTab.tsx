import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React from "react";
import Stream from "./Stream";
import StreamKey from "./StreamKey";

function GoLiveTab({ state }: { state: string }) {
  return (
    <Tabs
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={"clique.white"}
    >
      <TabList bg="clique.primaryBg" py="10px">
        <CliqueTab>Streaming details </CliqueTab>
        <CliqueTab>Streaming Key </CliqueTab>
        <CliqueTab>Monitor live</CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          <Stream state={state} />
        </CliqueTabPanel>
        <CliqueTabPanel>
          <StreamKey />
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GoLiveTab;
