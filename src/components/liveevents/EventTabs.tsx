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
import { useGetAllLiveStreamQuery } from "redux/services/live.service";
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
          Unpaid Events
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
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            {isFetching &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardLoader key={i} />
              ))}
            {!isFetching &&
              data &&
              data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
          </SimpleGrid>
        </CliqueTabPanel>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
            w="full" 
          >
            {isFetching &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardLoader key={i} />
              ))}{" "}
            {!isFetching &&
              data &&
              data.data.length > 0 &&
              data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
          </SimpleGrid>
        </CliqueTabPanel>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            {isFetching &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardLoader key={i} />
              ))}
            {!isFetching &&
              data &&
              data.data.length > 0 &&
              data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
          </SimpleGrid>
        </CliqueTabPanel>
        <CliqueTabPanel>
          <SimpleGrid
            columns={{ base: 3, lg: 3, mlg: 4, xl: 5 }}
            spacing="30px"
          >
            {isFetching &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardLoader key={i} />
              ))}
            {!isFetching &&
              data &&
              data.data.length > 0 &&
              data.data.map((event: any) => (
                <EventModal key={event.id} event={event} />
              ))}
          </SimpleGrid>
        </CliqueTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EventTabs;
