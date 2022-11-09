import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppSelector } from "redux/app/hooks";
import CopyButton from "./CopyButton";

function StreamKey() {
  const [showPassword, setShowPassword] = React.useState(false);

  const streamDetails = useAppSelector(
    (state) => state.app.stream.streamDetails
  );

  return (
    <Flex>
      <Box w="50%">
        <Text fontSize="smSubHead" color="clique.text">
          Select Streaming Key
        </Text>
        <Box
          bg="clique.secondaryGrey1"
          px="2"
          py="3"
          mt="10px"
          borderRadius={"10px"}
        >
          <Select border={"none"} isReadOnly>
            <option>Key 1</option>
          </Select>
        </Box>
        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          Stream key
        </Text>
        <Grid
          templateColumns="repeat(15, 1fr)"
          mt="10px"
          justifyContent={"space-between"}
        >
          <GridItem colSpan={12} mr="16px">
            <Box bg="clique.secondaryGrey1" px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  border={"none"}
                  isReadOnly
                  type={showPassword ? "text" : "password"}
                  value={streamDetails?.streamKey}
                />
                <InputRightElement>
                  <Icon
                    cursor={"pointer"}
                    onClick={() => setShowPassword(!showPassword)}
                    fontSize={"20px"}
                    as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </GridItem>

          <CopyButton value={streamDetails?.streamKey} />
        </Grid>
        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          Streaming ID
        </Text>
        <Grid
          templateColumns="repeat(15, 1fr)"
          mt="10px"
          justifyContent={"space-between"}
        >
          <GridItem colSpan={12} mr="16px">
            <Box bg="clique.secondaryGrey1" px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  border={"none"}
                  isReadOnly
                  type={"text"}
                  value={streamDetails?.streamerId}
                />
              </InputGroup>
            </Box>
          </GridItem>

          <CopyButton value={streamDetails?.streamerId} />
        </Grid>
        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          Playback Id
        </Text>
        <Grid
          templateColumns="repeat(15, 1fr)"
          mt="10px"
          justifyContent={"space-between"}
        >
          <GridItem colSpan={12} mr="16px">
            <Box bg="clique.secondaryGrey1" px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  border={"none"}
                  isReadOnly
                  type={"text"}
                  value={streamDetails?.playbackId}
                />
              </InputGroup>
            </Box>
          </GridItem>

          <CopyButton value={streamDetails?.playbackId} />
        </Grid>
      </Box>

      <Box px="50px">
        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          Stream latency
        </Text>

        {/* <RadioGroup
          defaultValue="1"
          colorScheme="clique"
          color="clique.text"
          mt="10px"
        >
          <Box>
            <Radio value={"1"}>Normal Latency</Radio>
          </Box>
          <Box>
            <Radio value="2">Normal Latency</Radio>
          </Box>
        </RadioGroup> */}
      </Box>
    </Flex>
  );
}

export default StreamKey;
