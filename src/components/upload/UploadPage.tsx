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
import { selectArr, videoDetails } from "@constants/utils";
import AddIcon from "@icons/AddIcon";
import CopyIcon from "@icons/CopyIcon";
import DetailCard from "./DetailCard";

type Props = {
  src: File | undefined;
};
function UploadPage({ src }: Props) {
  const url = URL.createObjectURL(src as File);
  return (
    <Flex gap={3} pl="5" pr="12">
      <Box w="20%" maxW="20%" minW="20%" pt="4" pr="2">
        <Text fontSize={"1.25rem"} mb="5">
          Your video look
        </Text>
        <Box borderRadius={"10px"} overflow="hidden">
          <video width="100%" height={"60px"} src={url} />
        </Box>
        <Text
          fontWeight={600}
          fontSize="0.813rem"
          mb="3"
          className="no-wrap"
          mt="4"
        >
          NAT GEO WILD DOCUMENTARY
        </Text>
        <Text fontSize="0.688rem">
          This is a documentation based on the life and times of NAT GEO WILD.
          This documentation shows you how they started, their challenges and
          how they have been able to overcome and
          <span style={{ color: "#3D8EC9" }}> more...</span>
        </Text>
      </Box>

      <Flex width="50%">
        <Divider orientation="vertical" bg="clique.secondaryGrey" mr="4" />
        <Box pt="2" pb="5">
          <Text fontSize="1.75rem">Video details</Text>

          <VStack align="stretch" mt={4}>
            {videoDetails.map((each) => {
              return (
                <DetailCard
                  key={each.title}
                  title={each.title}
                  details={each.details}
                />
              );
            })}
          </VStack>
          <Box mt="7" mb="4">
            <Text fontSize="0.75rem">Thumbnail</Text>
            <Text fontSize="0.625rem" color="clique.secondaryGrey2" mb="2">
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
                <Text fontSize="0.75rem">Upload Thumbnail</Text>
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
          <Text fontSize={"1rem"} mb="4">
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
                {src?.name}
              </Text>
            </Box>
          </Box>
        </Box>

        <Button bg="clique.base" py="5" borderRadius={"50px"} maxW="100%">
          Upload
        </Button>
      </Flex>
    </Flex>
  );
}

export default UploadPage;
