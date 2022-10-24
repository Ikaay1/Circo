import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import SimpleSwitch from "./SimpleSwitch";
import { TbCopy } from "react-icons/tb";

type Props = {
  onClick: (code:string) => void;
};

const Notification = (props: Props) => {
  return (
    <Box>
      <Box maxW={"50%"}>
        <Text fontSize={"smSubHead"} mb="5">
          Notifications
        </Text>
        <Text fontSize={"subHead"}>Manage your Clique notifications here</Text>
        <SimpleSwitch text="All Notifications" />
        <Text fontSize={"subHead"} mt="7">
          CONTENT
        </Text>
        <SimpleSwitch text="Likes my post" />
        <SimpleSwitch text="Comment on my post" />
        <SimpleSwitch text="Likes my comment" />
        <SimpleSwitch text="Mentions me" />
        <Text fontSize={"subHead"} mt="7">
          GENERAL
        </Text>
        <SimpleSwitch text="New subscriber" />
        <SimpleSwitch text="Receive payment" />
        <SimpleSwitch text="Wallet credits" />
        <SimpleSwitch text="Wallet debits" />
        <SimpleSwitch text="Live stream started" />
      </Box>
      <Divider my="7"></Divider>

      <Box maxW={"50%"}>
        <Text fontSize={"smSubHead"}>Theme</Text>
        <SimpleSwitch text="Light/Dark mode" />
      </Box>
      <Divider my="7"></Divider>

      <Box maxW={"50%"}>
        <Text fontSize={"smSubHead"} mb="5">
          Referral
        </Text>
        <Text fontSize={"subHead"} mb="6">
          Refer a friend and earn #1000!
        </Text>
        <Text color="clique.text" fontSize={"xsl"}>
          Referral Code
        </Text>
        <Flex justifyContent="space-between" mt="2">
          <Text fontSize={"smSubHead"}>D657Y85</Text>
          <TbCopy
            fontSize={"20"}
            color="#8758FF"
            onClick={() => props.onClick("D657Y85")}
            cursor="pointer"
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Notification;
