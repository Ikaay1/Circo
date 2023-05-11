import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/app/hooks";

import {
  Box,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import Color from "@constants/color";
import ShareIcon from "@icons/ShareIcon";

import CopyBox from "./CopyBox";

const Bio = ({
  showSubscribe,
  bio,
  id,
  onClick,
  buttonText,
  isFetching,
  date,
}: {
  showSubscribe: boolean;
  bio?: string;
  id: string;
  onClick: () => void;
  buttonText?: string;
  isFetching?: boolean;
  date?: string;
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const [state, setState] = useState("");

  const whiteAndBlack = Color().whiteAndBlack;
  const blackAndWhite = Color().blackAndWhite2;
  return (
    <>
      <Box
        mt={"1.4rem"}
        ml="1rem"
        mr={"2rem"}
        display="flex"
        justifyContent={{ base: "center", lg: "space-between" }}
        alignItems="flex-start"
      >
        <Box w="40%" display={{ base: "none", lg: "block" }}>
          <Text
            fontWeight="600"
            fontSize="subHead"
            lineHeight="24px"
            color="clique.secondaryGrey2"
          >
            Bio
          </Text>
          <Text
            fontWeight="400"
            fontSize="smSubHead"
            lineHeight="24px"
            color="clique.secondaryGrey2"
            pr="1rem"
          >
            {bio}
          </Text>
        </Box>
        {showSubscribe && (
          <Box>
            <Box
              display="flex"
              alignItems="center"
              mt={{ base: "9rem", lg: "0" }}
            >
              <Box
                mr="1rem"
                cursor="pointer"
                onClick={() => {
                  onOpen();
                }}
              >
                <Icon as={ShareIcon} color={blackAndWhite} />
              </Box>
              {userProfile?._id === id ? null : (
                <AuthButton
                  width="180px"
                  height="50px"
                  borderRadius="30px"
                  fontSize="sm2"
                  name={isFetching ? <Spinner /> : buttonText}
                  onClick={onClick}
                  bg={
                    buttonText === "Subscribed" || isFetching
                      ? "clique.grey"
                      : "clique.purple"
                  }
                  cursor={buttonText === "Subscribed" && "default"}
                />
              )}
            </Box>
            {!router.asPath.includes("/channel/1") && date && (
              <Text
                w="190px"
                textAlign={"center"}
                fontSize={"smSubHead"}
                color={Number(date) > 5 ? "clique.base" : "clique.seconDaryRed"}
                mt=".4rem"
                ml="auto"
              >
                Expires in: {date} days
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Box w="100%" padding="1rem" display={{ lg: "none" }} mt="1rem">
        <Text
          fontWeight="600"
          fontSize="subHead"
          lineHeight="24px"
          color="clique.secondaryGrey2"
        >
          Bio
        </Text>
        <Text
          fontWeight="400"
          fontSize="smSubHead"
          lineHeight="24px"
          color="clique.secondaryGrey2"
          pr="1rem"
        >
          {bio}
        </Text>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position="absolute"
            left={"50%"}
            transform={"translate(-50%, 60%)"}
            w={{ base: "100%", lg: "auto" }}
          >
            <CopyBox
              link={
                router.asPath === "/channel/1/content"
                  ? `channel/subscribe/${userProfile?.channel?.name}`
                  : `channel/subscribe/${router?.query?.id}`
              }
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bio;
