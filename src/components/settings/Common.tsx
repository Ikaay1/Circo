import React from "react";
import { Box, Text, Divider } from "@chakra-ui/react";
type Props = {
  title: string;
  subTitle: string;
  main: string;
  highlight: string;
  firstHighlight?: string;
};

function Common(props: Props) {
  return (
    <Box>
      <Text fontSize={"smSubHead"} mb="5">
        {props.title}
      </Text>
      <Text fontSize={"subHead"} mb="5">
        {props.subTitle}
        <span style={{ color: "#3088D9" }}> {props.firstHighlight}</span>
      </Text>
      <Text fontSize={"xsl"} mb="10">
        {props.main}
        <span style={{ color: "#3088D9" }}> {props.highlight}</span>
      </Text>
      <Divider></Divider>
    </Box>
  );
}

export default Common;
