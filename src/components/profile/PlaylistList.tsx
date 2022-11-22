import {
  Box,
  Flex,
  Icon,
  Image,
  Skeleton,
  Text,
  VStack
} from "@chakra-ui/react";

import { useGetUserQuery } from "redux/services/user.service";
import MoreIcon from "../../assets/icons/MoreIcon";
import { Videos } from "./PlaylistDetails";

type Props = {
  videos: Videos[];
  id: string;
  isLoading: Boolean;
};
const PlaylistList = ({ videos, id, isLoading: netWorkLoading }: Props) => {
  const { isLoading, data: userData } = useGetUserQuery(id);
  return (
    <>
      {netWorkLoading ? (
        <Flex flexDirection={"column"} gap="2">
          {[1, 2, 3, 4].map((each, i) => {
            return (
              <Flex key={i}>
                <Skeleton h="100px" w="100px" borderRadius="10px" mr="2" />
                <VStack my="auto">
                  <Skeleton w="70px" height="20px" mb="3" />
                  <Skeleton w="70px" height="10px" />
                </VStack>
              </Flex>
            );
          })}
        </Flex>
      ) : (
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
                    {isLoading ? (
                      <Skeleton w="100%" height="15px" />
                    ) : (
                      `${userData?.data?.firstName} ${userData?.data?.lastName}`
                    )}
                  </Text>
                </Box>
              </Box>
              <Box cursor={"pointer"}>
                <Icon as={MoreIcon} />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default PlaylistList;
