import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import CliqueTab from "@components/widgets/CliqueTab";
import CliqueTabPanel from "@components/widgets/CliqueTabPanel";
import React, { useState } from "react";
import NewStream from "./NewStream";

function NewLiveTab({ state, setState }: { state: string; setState: any }) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs
      isLazy
      variant={"unstyled"}
      minW="full"
      fontFamily="Poppins"
      color={"clique.white"}
      index={tabIndex}
      onChange={(index: any) => setTabIndex(index)}
    >
      <TabList bg="clique.primaryBg" py="10px">
        <CliqueTab>Streaming details </CliqueTab>
      </TabList>
      <TabPanels>
        <CliqueTabPanel>
          <NewStream
            setState={setState}
            state={state}
            setTabIndex={setTabIndex}
          />
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default NewLiveTab;
