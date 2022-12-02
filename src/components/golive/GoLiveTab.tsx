import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import EmptyState from "@components/emptyState/EmptyState";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React, { useState } from "react";
import { useAppSelector } from "redux/app/hooks";
import Monitor from "./Monitor";
import Stream from "./Stream";
import StreamKey from "./StreamKey";

function GoLiveTab({ state }: { state: string }) {
  const [tabIndex, setTabIndex] = useState(0);
  const streamDetails = useAppSelector(
    (state) => state.app.stream.streamDetails
  );
  return (
    <Tabs
      // isLazy
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
          <Stream
            streamDetails={streamDetails}
            state={state}
            setTabIndex={setTabIndex}
          />
        </CliqueTabPanel>
        <CliqueTabPanel>
          <StreamKey streamDetails={streamDetails} />
        </CliqueTabPanel>

        <CliqueTabPanel>
          {streamDetails ? (
            <Monitor streamDetails={streamDetails} />
          ) : (
            <EmptyState msg="No Stream to monitor" />
          )}
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GoLiveTab;
