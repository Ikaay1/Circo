import { Accordion } from "@chakra-ui/react";
import React, { useRef } from "react";
import EachNotification from "./EachNotification";

function AccordionNotification({
  lastElementRef,
  data,
}: {
  data: any;
  lastElementRef?: any;
}) {
  return (
    <Accordion allowMultiple>
      {data?.map((item: any, i: number) => {
        if (data.length === i + 1) {
          return (
            <EachNotification
              key={item._id}
              data={item}
              lastElementRef={lastElementRef}
            />
          );
        } else {
          return <EachNotification key={item._id} data={item} />;
        }
      })}
    </Accordion>
  );
}

export default AccordionNotification;
