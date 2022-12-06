import { Accordion } from "@chakra-ui/react";
import React from "react";
import EachNotification from "./EachNotification";

function AccordionNotification({ data }: { data: any }) {
  return (
    <Accordion allowMultiple>
      {data?.map((item: any) => (
        <EachNotification key={item._id} data={item} />
      ))}
    </Accordion>
  );
}

export default AccordionNotification;
