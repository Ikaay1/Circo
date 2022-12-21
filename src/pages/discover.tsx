import HomeLayout from "layouts/HomeLayout";
import React from "react";
import { useGetSuggestedUsersQuery } from "redux/services/user.service";

import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import DiscoverBox from "@components/discover/DiscoverBox";
import SubscriptionCard from "@components/discover/SubscriptionCard";
import LiveEvents from "@components/home/LiveEvents";
import SideMenu from "@components/widgets/sideMenu";
import {
  purpleBoxStyle,
  scrollBarStyle2,
  scrollBarStyle3,
} from "@constants/utils";

function Index() {
  const { data, isFetching } = useGetSuggestedUsersQuery({
    page: 1,
    limit: 7,
  });
  console.log(data?.data?.user);
  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        <Box
          maxH={"90vh"}
          pb="50px"
          px="30px"
          maxW={"calc(100vw - 500px)"}
          w={"calc(100vw - 500px)"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle3}
        >
          <Text
            py="20px"
            position={"relative"}
            pl="20px"
            _before={{ ...purpleBoxStyle, background: "clique.base" }}
            color={"clique.white"}
            fontFamily={"Unbounded"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="subHead"
            lineHeight={"1"}
          >
            Discover
          </Text>
          <DiscoverBox />{" "}
          <Text
            py="40px"
            position={"relative"}
            pl="20px"
            _before={{ ...purpleBoxStyle, background: "clique.base" }}
            color={"clique.white"}
            fontFamily={"Unbounded"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="subHead"
            lineHeight={"1"}
          >
            Suggested Subscriptions
          </Text>
          <Flex overflowX={"scroll"} sx={scrollBarStyle2}>
            {isFetching || !data ? (
              <>
                {[1, 2].map((num) => (
                  <Box
                    key={num}
                    h="220px"
                    w="full"
                    rounded={"20px"}
                    position={"relative"}
                    minW="420px"
                    mr="20px"
                  >
                    <Skeleton h="100%" rounded={"20px"} w="100%" />
                    <Box position="absolute" top={"5%"} left="13%" w="60%">
                      <Flex>
                        <SkeletonCircle size="20" mr=".5rem" />
                      </Flex>
                      <Box mt="3rem">
                        <Skeleton w="100%" height="30px" />
                        <Skeleton w="100%" mt={".6rem"} height="30px" />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <>
                {data?.data?.user?.map((user: any) => (
                  <Box key={user._id}>
                    <SubscriptionCard user={user} />
                  </Box>
                ))}
              </>
            )}
          </Flex>
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
