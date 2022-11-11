import React from "react";
import { useAppSelector } from "redux/app/hooks";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";

import MoreIcon from "../../assets/icons/MoreIcon";
import { Videos } from "./PlaylistDetails";

type Props = {
  videos: Videos[];
};
const PlaylistList = ({ videos }: Props) => {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  return (
    <>
      <Box>
        {videos?.map((item, i) => (
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            mt={i !== 0 ? "1.4rem" : "0em"}
            key={item?._id}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Box mr={"1rem"}>
                {item.thumbNail ? (
                  <Image
                    src={item.thumbNail}
                    w="75px"
                    h="75px"
                    objectFit={"cover"}
                    borderRadius="10px"
                    alt="user image"
                  />
                ) : (
                  <Flex
                    w="75px"
                    h="75px"
                    borderRadius="10px"
                    bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
                  ></Flex>
                )}
              </Box>
              <Box>
                <Text
                  fontWeight="500"
                  fontSize="smSubHead"
                  lineHeight="28px"
                  color="clique.white"
                  mb=".5rem"
                >
                  {item?.title}
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="24px"
                  color="clique.secondaryGrey2"
                >
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </Text>
              </Box>
            </Box>
            <Box cursor={"pointer"}>
              <Icon as={MoreIcon} />
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PlaylistList;
