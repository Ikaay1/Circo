import React from "react";
//@ts-ignore
import { Line } from "react-chartjs-2";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { analyticsData, chartData, data, options } from "@constants/utils";
import FallIcon from "@icons/FallIcon";
import UpIcon from "@icons/UpIcon";

const Analytics = () => {
  return (
    <Box>
      <Box bg="clique.blackGrey" maxH={"300px"} py="5">
        <Box pl="4">
          <Text
            fontWeight="500"
            fontSize="subHead"
            lineHeight="26px"
            color="clique.secondaryGrey2"
          >
            Subscribers
          </Text>
          <Box display={"flex"} alignItems="center">
            <Text fontSize="smHead2" lineHeight="36px" color="clique.white">
              13,241
            </Text>
            <Box
              backgroundColor={true ? "clique.lightGreen" : "clique.wine"}
              borderRadius="50%"
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              ml="2"
            >
              <Icon as={true ? UpIcon : FallIcon} />
            </Box>
          </Box>
          <Text
            fontSize="smSubHead"
            lineHeight="26px"
            color="clique.secondaryGrey2"
          >
            Daily subscribers insight
          </Text>
        </Box>
        <Box height={"100%"} width="90%" mx="auto">
          <Line options={options} data={data} />
        </Box>
      </Box>
      <Flex marginTop={"2rem"} justifyContent="space-between">
        {analyticsData.map(({ text1, text2 }) => (
          <Box
            alignItems={"center"}
            marginTop="1rem"
            key={text1}
            bg="clique.blackGrey"
            px="6"
            py="2"
            textAlign={"center"}
          >
            <Text fontSize="sm" lineHeight="24px" color="clique.secondaryGrey2">
              {text1}
            </Text>
            <Text fontSize="smHead" lineHeight="24px" color="clique.white">
              {text2}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Analytics;
