import { Box, Circle, Flex, Icon, Image } from "@chakra-ui/react";
import AddIcon from "@icons/AddIcon";
import { useRef, ChangeEvent, useState } from "react";

type Props = {
  handleChooseCover: () => void;
  handleChooseProfile: () => void;
  state: {
    cover: string;
    profile: string;
  };
  handleFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    cover: boolean
  ) => void;
  coverRef: HTMLInputElement | any;
  profileRef: HTMLInputElement | any;
};

const Uploaders = ({
  handleChooseCover,
  handleChooseProfile,
  coverRef,
  profileRef,
  state,
  handleFileChange,
}: Props) => {
  return (
    <>
      <Box position="relative">
        {state.cover ? (
          <Box width="100%">
            <Image
              w="100%"
              h="170px"
              src={state.cover}
              alt="cover photo"
              width="100%"
              objectFit="cover"
              zIndex={"1"}
            />
            <Box
              position={"absolute"}
              top="43%"
              left="48%"
              zIndex="20"
              onClick={handleChooseCover}
              cursor="pointer"
            >
              <Icon as={AddIcon} />
            </Box>
          </Box>
        ) : (
          <Flex
            w="100%"
            h="160px"
            bg="linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(.jpg), #232323"
            justifyContent="center"
            alignItems="center"
          ></Flex>
        )}

        <Box
          position={"absolute"}
          bottom="-57%"
          left={"50%"}
          transform="translateX(-50%)"
        >
          {state.profile ? (
            <Box width="100%">
              <Box zIndex={"-1"} position="relative">
                <Image
                  src={state.profile}
                  alt="profile photo"
                  borderRadius="50%"
                  objectFit={"cover"}
                  h="120px"
                  w="120px"
                />
              </Box>

              <Box
                top="36%"
                left="38%"
                zIndex="1"
                position={"absolute"}
                onClick={handleChooseProfile}
                cursor="pointer"
              >
                <Icon as={AddIcon} />
              </Box>
            </Box>
          ) : (
            <Circle size="120px" bg="#232323" color="white"></Circle>
          )}
        </Box>
      </Box>
      <input
        ref={coverRef}
        type="file"
        onChange={(event) => handleFileChange(event, true)}
        name="cover"
        accept="image/png, image/jpeg"
        style={{
          display: "none",
        }}
      />

      <input
        ref={profileRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event) => handleFileChange(event, false)}
        name="profile"
        style={{
          display: "none",
        }}
      />
    </>
  );
};

export default Uploaders;
