import {
  Avatar,
  Box,
  Skeleton,
  SkeletonCircle,
  Text,
  WrapItem,
} from "@chakra-ui/react";
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
            photo,
          }: {
            firstName: string;
            lastName: string;
            _id: string;
            photo: string;
          }) => (
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              marginTop=".6rem"
              key={_id}
            >
              <Box display={"flex"} alignItems="center">
                {isLoading ? (
                  <SkeletonCircle h="57px" w="57px" />
                ) : (
                  <WrapItem>
                    <Avatar
                      w="57px"
                      h="57px"
                      name={firstName + " " + lastName}
                      src={photo}
                    />
                  </WrapItem>
                )}

                <Skeleton isLoaded={!isLoading} ml=".7rem">
                  <Text
                    fontSize="subHead"
                    lineHeight="31px"
                    color="clique.white"
                    pl=".7rem"
                  >
                    {firstName + " " + lastName}
                  </Text>
                </Skeleton>
              </Box>
              <Skeleton isLoaded={!isLoading}>
                <Text
                  fontSize="sm"
                  lineHeight="26px"
                  color={"active" === "active" ? "clique.green" : "clique.red"}
                >
                  {"active" === "active" ? "Active" : "Expired"}
                </Text>
              </Skeleton>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Subscriptions;
