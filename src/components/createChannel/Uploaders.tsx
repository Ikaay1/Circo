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
        <Flex
          w="100%"
          h="160px"
          bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
          justifyContent="center"
          alignItems="center"
          onClick={handleChooseCover}
          cursor="pointer"
        >
          {state.cover ? (
            <Image w="100%" h="160px" src={state.cover} alt="cover photo" />
          ) : (
            <Icon as={AddIcon} />
          )}
        </Flex>

        <Box
          position={"absolute"}
          bottom="-52%"
          left={"50%"}
          transform="translateX(-50%)"
          onClick={handleChooseProfile}
          cursor="pointer"
        >
          <Circle size="120px" bg="#232323" color="white">
            {state.profile ? (
              <Image
                src={state.profile}
                alt="profile photo"
                borderRadius="50%"
                objectFit={"cover"}
                h="120px"
                w="120px"
              />
            ) : (
              <Icon as={AddIcon} />
            )}
          </Circle>
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
