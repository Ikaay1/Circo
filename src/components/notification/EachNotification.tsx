import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import React from "react";
import moment from "moment";
import { useReadNotificationMutation } from "redux/services/notification.service";
import UpwardIcon from "@icons/UpwardIcon";
import DownwardIcon from "@icons/DownwardIcon";
import { useRouter } from "next/router";

function EachNotification({ data }: { data: any }) {
  const [readNotification, info] = useReadNotificationMutation();
  const route = useRouter();

  return (
    <AccordionItem
      mb={"10px"}
      border={"none"}
      bg="clique.blackGrey"
      rounded={"10px"}
    >
      <Box>
        <AccordionButton
          onClick={async () => {
            if (data?.status === "unread") {
              await readNotification(data._id);
            }
          }}
          _focus={{ outline: "none", boxShadow: "none", border: "none" }}
        >
          <Flex flex="1" textAlign="left" alignItems={"center"}>
            <Box minW="50px" mr="10px">
              {data?.type === "Debit" ? (
                <Icon as={DownwardIcon} fontSize="3xl" mr="2" />
              ) : data?.type === "Credit" ? (
                <Icon as={UpwardIcon} fontSize="3xl" mr="2" />
              ) : (
                <AvataWithSpace
                  name={
                    data?.triggerId?.firstName +
                      " " +
                      data?.triggerId?.lastName ?? "NA"
                  }
                  url={data?.triggerId?.photo}
                  mr="0px"
                  size="45px"
                  avatarSize="35px"
                  borderThickness="2px"
                  borderColor="clique.base"
                />
              )}
            </Box>

            <Text fontFamily={"Poppins"} fontSize="smSubHead">
              {data?.title}
            </Text>
          </Flex>

          <Text fontFamily={"Poppins"} fontSize="smSubHead">
            {moment(data?.createdAt).fromNow()}
          </Text>
        </AccordionButton>
      </Box>
      <AccordionPanel
        onClick={() => {
          if (data?.type === "Action") {
            route.push(data?.link);
          }
        }}
        cursor={data?.type === "Action" ? "pointer" : "default"}
        fontFamily={"Poppins"}
        fontSize="smSubHead"
        pb={4}
        pl="80px"
      >
        {data?.content}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default EachNotification;
