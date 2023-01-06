import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Color from "@constants/color";
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppSelector } from "redux/app/hooks";
import CopyButton from "./CopyButton";

function EventKey() {
  const [showPassword, setShowPassword] = React.useState(false);

  const streamDetails = useAppSelector(
    (state) => state.app.stream.selectedStream
  );
  const value = useColorModeValue("clique.white", "clique.secondaryGrey1");
  return (
    <Flex>
      <Box w="50%">
        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          Stream key
        </Text>
        <Grid
          templateColumns="repeat(15, 1fr)"
          mt="10px"
          justifyContent={"space-between"}
        >
          <GridItem colSpan={12} mr="16px">
            <Box bg={value} px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  color={Color().blackAndWhite}
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
            <Box bg={value} px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  color={Color().blackAndWhite}
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
            <Box bg={value} px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  color={Color().blackAndWhite}
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

        <Text mt="20px" fontSize="smSubHead" color="clique.text">
          RMTP URL
        </Text>
        <Grid
          templateColumns="repeat(15, 1fr)"
          mt="10px"
          justifyContent={"space-between"}
        >
          <GridItem colSpan={12} mr="16px">
            <Box bg={value} px="2" py="3" borderRadius={"10px"}>
              <InputGroup border={"none"}>
                <Input
                  color={Color().blackAndWhite}
                  border={"none"}
                  isReadOnly
                  type={"text"}
                  value={"rtmps://global-live.mux.com:443/app/ "}
                />
              </InputGroup>
            </Box>
          </GridItem>

          <CopyButton value={"tmps://global-live.mux.com:443/app/ "} />
        </Grid>
      </Box>

      <Box px="50px"></Box>
    </Flex>
  );
}

export default EventKey;
