import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Select,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import { selectArr, videoDetails } from "@constants/utils";
import AddIcon from "@icons/AddIcon";
import CopyIcon from "@icons/CopyIcon";
import { useState } from "react";
import DetailCard from "./DetailCard";

type Props = {
  url: string;
  name: string;
};
function UploadPage({ url, name }: Props) {
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  return (
    <Flex gap={3} pl="5" pr="12">
      <Box w="20%" maxW="20%" minW="20%" pt="4" pr="2">
        <Text fontSize={"smHead"} mb="5">
          Your video look
        </Text>
        <Box borderRadius={"10px"} overflow="hidden">
          <video width="100%" height={"60px"} src={url} />
        </Box>
        <Text
          fontWeight={600}
          fontSize="smSubHead"
          mb="3"
          className="no-wrap"
          mt="4"
        >
          NAT GEO WILD DOCUMENTARY
        </Text>
        <Text fontSize="xsl">
          This is a documentation based on the life and times of NAT GEO WILD.
          This documentation shows you how they started, their challenges and
          how they have been able to overcome and
          <span style={{ color: "#3D8EC9" }}> more...</span>
        </Text>
      </Box>

      <Flex width="50%">
        <Divider orientation="vertical" bg="clique.secondaryGrey" mr="4" />
        <Box pt="2" pb="5">
          <Text fontSize="head">Video details</Text>

          <VStack align="stretch" mt={4}>
            {videoDetails.map((each) => {
              return (
                <DetailCard
                  key={each.title}
                  title={each.title}
                  input={each.input}
                  value={state.title}
                  valueArea={state.description}
                  handleInputChange={(event) =>
                    setState({ ...state, title: event?.target?.value })
                  }
                  handleInputChangeArea={(event) =>
                    setState({ ...state, description: event?.target?.value })
                  }
                />
              );
            })}
          </VStack>
          <Box mt="7" mb="4">
            <Text fontSize="smSubHead">Thumbnail</Text>
            <Text fontSize="xsl" color="clique.secondaryGrey2" mb="2">
              Select or upload a picture that shows what is your video
            </Text>
            <Flex gap="2">
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent="center"
                gap="2"
                border="1px"
                width="40%"
                borderRadius={"10px"}
                borderColor="clique.secondaryGrey2"
                style={{ borderStyle: "dashed" }}
              >
                <Icon as={AddIcon} />
                <Text fontSize="smSubHead">Upload Thumbnail</Text>
              </Flex>

              <Box
                maxW="40%"
                maxH="40%"
                borderRadius={"10px"}
                overflow="hidden"
              >
                <video width="100%" src={url} />
              </Box>
            </Flex>
          </Box>
          <Text fontSize={"subHead"} mb="4">
            Other Parameters
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {selectArr.map((each, i) => {
              return (
                <GridItem w="100%" key={i}>
                  <Select
                    placeholder={each.placeholder}
                    bg="clique.secondaryGrey1"
                    borderColor="clique.secondaryGrey1"
                    size="md"
                    height={"40px"}
                  >
                    <option value={each.options[0]}>{each.options[0]}</option>
                  </Select>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Flex>
      <Flex
        w="30%"
        maxW="30%"
        minW="30%"
        flexDirection={"column"}
        pb="40px"
        gap="100px"
        pt="65px"
      >
        <Box borderRadius={"10px"} overflow="hidden">
          <Box>
            <video width="100%" height={"60px"} src={url} controls />
          </Box>
          <Box
            bg="clique.secondaryGrey1"
            pl="5"
            pt="2"
            pr="6"
            pb="8"
            borderBottomRadius="md"
          >
            <Box>
              <Text fontSize={"0.75rem"}>Video link</Text>
              <Flex justifyContent="space-between" mt="2">
                <Link fontSize={"0.75rem"} color="clique.primaryBlue">
                  https://clique.com/8u6yt26f
                </Link>
                <Icon as={CopyIcon} fontSize="70px" />
              </Flex>
            </Box>
            <Box mt="8">
              <Text fontSize={"0.75rem"}>File name</Text>
              <Text mt="2" fontSize={"0.75rem"}>
                {name}
              </Text>
            </Box>
          </Box>
        </Box>
        <Btn text="upload"></Btn>
      </Flex>
    </Flex>
  );
}

export default UploadPage;
