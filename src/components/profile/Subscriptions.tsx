import React from "react";

import { Box, Image, Text } from "@chakra-ui/react";
import { subscriptionsData } from "@constants/utils";
import { useAppSelector } from "redux/app/hooks";
import { useGetUserQuery } from "redux/services/user.service";

const Subscriptions = () => {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const { isLoading, data: userData } = useGetUserQuery(userProfile._id);
  
  return (
    <Box p="1rem" pb="2.5rem">
      <Text
        fontWeight="500"
        fontSize="smHead2"
        lineHeight="36px"
        letterSpacing="-0.02em"
        color="clique.white"
        textAlign={"center"}
      >
        Subscriptions
      </Text>
      <Box>
        {userData?.data?.subscribers.map(
          ({
            firstName,
            lastName,
            _id,
          }: {
            firstName: string;
            lastName: string;
            _id: string;
          }) => (
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              marginTop=".6rem"
              key={_id}
            >
              <Box display={"flex"} alignItems="center">
                <Image
                  w="57px"
                  h="57px"
                  borderRadius={"50%"}
                  objectFit="cover"
                  pr=".7rem"
                  src="/assets/subscriptionavatar.png"
                  alt=""
                />
                <Text fontSize="subHead" lineHeight="31px" color="clique.white">
                  {firstName + " " + lastName}
                </Text>
              </Box>
              <Text
                fontSize="sm"
                lineHeight="26px"
                color={"active" === "active" ? "clique.green" : "clique.red"}
              >
                {"active" === "active" ? "Active" : "Expired"}
              </Text>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Subscriptions;
