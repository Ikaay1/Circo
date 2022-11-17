import { Box, Circle, Icon, Image } from "@chakra-ui/react";
import AddIcon from "@icons/AddIcon";
import EmptyProfile from "@icons/EmptyProfile";
import ProfileAdd from "@icons/ProfileAdd";
import { ChangeEvent } from "react";

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
          <Box>
            <Image
              w="100%"
              h="170px"
              src={state.cover}
              alt="cover photo"
              width="100%"
              objectFit="cover"
              zIndex={"-1"}
            />
            <Box
              position={"absolute"}
              top="43%"
              left="48.5%"
              zIndex="1"
              onClick={handleChooseCover}
              cursor="pointer"
            >
              <Icon as={AddIcon} />
            </Box>
          </Box>
        ) : (
          <>
            <Image
              objectFit="cover"
              w="100%"
              h="160px"
              src="/assets/channelEmpty.png"
              alt="empty state"
              width="100%"
              zIndex={"-1"}
            />
            <Box
              position={"absolute"}
              top="43%"
              left="48.5%"
              onClick={handleChooseCover}
              cursor="pointer"
              zIndex="1"
            >
              <Icon as={AddIcon} />
            </Box>
          </>
        )}

        <Box
          position={"absolute"}
          bottom="-57%"
          left={"50%"}
          transform="translateX(-50%)"
        >
          {state.profile ? (
            <Box width="100%">
              <Image
                src={state.profile}
                alt="profile photo"
                borderRadius="50%"
                objectFit={"cover"}
                h="120px"
                w="120px"
                zIndex={"-1"}
              />
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
            <>
              <Circle
                size="120px"
                bg="#232323"
                color="white"
                zIndex={"-1"}
              ></Circle>
              <Box top="15%" left="17%" position={"absolute"}>
                <Icon as={EmptyProfile} fontSize="81px" />
                <Box
                  top="55%"
                  left="43%"
                  zIndex="1"
                  position={"absolute"}
                  onClick={handleChooseProfile}
                  cursor="pointer"
                >
                  <Icon as={ProfileAdd} boxSize={3} />
                </Box>
              </Box>
            </>
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
