import React from "react";
import { useGetSubscriptionsQuery } from "redux/services/user.service";

import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";

import EachSubscribe from "./EachSubscribe";
import SeeMore from "./SeeMore";

const Subscriptions = () => {
  const { data, isFetching } = useGetSubscriptionsQuery({ page: 1, limit: 5 });
  const { data: allData, isFetching: allIsFetching } = useGetSubscriptionsQuery(
    {
      page: "no",
      limit: "no",
    }
  );
  return (
    <>
      {isFetching || allIsFetching ? (
        <>
          {[1, 2, 3].map((num) => (
            <Flex pl="50px" key={num} mt="15px" alignItems={"center"}>
              <SkeletonCircle size="10" mr="10px" />
              <Skeleton w="60%" height="15px" />
            </Flex>
          ))}
        </>
      ) : (
        <>
          {data?.data?.user.length > 0 && (
            <>
              <Text
                pl="60px"
                fontFamily={"Poppins"}
                fontWeight={500}
                textTransform={"capitalize"}
              >
                subscriptions
              </Text>
              {data?.data?.user.map(
                (item: {
                  channel_id: {
                    photo: string;
                    name: string;
                  };
                  _id: string;
                }) => (
                  <EachSubscribe
                    key={item._id}
                    id={item._id}
                    channel_id={item.channel_id}
                  />
                )
              )}
              {allData?.data?.user?.length > 5 && <SeeMore allData={allData} />}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Subscriptions;
