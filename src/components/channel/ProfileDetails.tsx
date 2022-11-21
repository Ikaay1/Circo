import {
  Avatar,
  Box,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useGetUserQuery } from "redux/services/user.service";
import { useNumberAbbrev } from "../../../custumHooks/useNumberAbbrev";

const ProfileDetails = ({ id }: { id: string }) => {
  const { isLoading, data } = useGetUserQuery(id);
  const abbreNum = useNumberAbbrev();
  return (
    <>
      {isLoading && !data? (
        <Box>
          <SkeletonCircle size="40" mx="auto" />
          <Skeleton w="60%" height="20px" mb="2" mt="3" mx="auto" />
          <Skeleton w="50%" height="10px" mx="auto" />
        </Box>
      ) : (
        <Box>
          {true ? (
            <WrapItem>
              <Avatar
                size="2xl"
                name={data?.data?.firstName + " " + data?.data?.lastName}
                mx="auto"
                loading="lazy"
              />
            </WrapItem>
          ) : (
            <Image
              src="/assets/profilephoto.png"
              alt="profile photo"
              borderRadius="50%"
              objectFit={"cover"}
              margin="0 auto"
              h="120px"
              w="120px"
            />
          )}

          <Text
            fontWeight="600"
            fontSize="head"
            lineHeight="32px"
            color="clique.white"
            textAlign={"center"}
          >
            <Skeleton isLoaded={!isLoading} width="70%" mx="auto" mt="2">
              {data?.data.firstName + " " + data?.data?.lastName}
            </Skeleton>
          </Text>
          <Text
            fontSize="subHead"
            lineHeight="24px"
            color="clique.secondaryGrey2"
            textAlign={"center"}
          ></Text>
          <Text
            fontWeight="500"
            fontSize="subHead"
            lineHeight="24px"
            color="clique.secondaryGrey2"
            textAlign={"center"}
          >
            <Skeleton isLoaded={!isLoading} width="60%" mx="auto" mt="2">
              {abbreNum(data?.data?.subscribersCount, 2) + " "}
              Subscribers
            </Skeleton>
          </Text>
        </Box>
      )}
    </>
  );
};

export default ProfileDetails;
