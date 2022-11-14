import { useRouter } from "next/router";

import {
  Box,
  Circle,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import CreateChannelModal from "@components/createChannel/CreateChannelModal";
import Subscriptions from "@components/profile/Subscriptions";
import { scrollBarStyle } from "@constants/utils";
import SideIcon from "@icons/SideIcon";
import { useAppSelector } from "redux/app/hooks";

type Channel = {
  bio: string;
  cover?: string;
  createdAt: string;
  isDisabled: boolean;
  name: string;
  subscriptionFee: number;
  subscriptionInfo: string;
  profile?: string;
  updatedAt: string;
  userId: string;
  visitors: Array<string>;
  _id: string;
};

const UserDetail = ({ data }: { data?: Channel }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const {
    isOpen: channelIsOpen,
    onOpen: channelOnOpen,
    onClose: channelOnClose,
  } = useDisclosure();
  return (
    <>
      <Box position="relative">
        {data?.cover ? (
          <Image w="100%" h="170px" src={data?.cover} alt="cover photo" />
        ) : (
          <Flex
            w="100%"
            h="160px"
            bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323"
          ></Flex>
        )}

        <Box
          position={"absolute"}
          bottom={
            router.query.name === "content" || router.query.name === "analytics"
              ? "-100%"
              : "-52%"
          }
          left={"50%"}
          transform="translateX(-50%)"
        >
          {data?.profile ? (
            <Image
              src={data?.profile}
              alt="profile photo"
              borderRadius="50%"
              objectFit={"cover"}
              h="120px"
              w="120px"
            />
          ) : (
            <Circle size="120px" bg="#232323" color="white"></Circle>
          )}

          {/* name of content creator. Shows on both profile and channel routes but only in their content subroutes(and analytics subroute for channel) */}
          {(router.query.name === "content" ||
            router.query.name === "analytics") && (
            <>
              <Text
                fontWeight="600"
                fontSize="head"
                lineHeight="32px"
                color="clique.white"
                textAlign={"center"}
              >
                {data?.name}
              </Text>
              <Text
                fontSize="subHead"
                lineHeight="24px"
                color="clique.secondaryGrey2"
                textAlign={"center"}
              >
                @{userProfile.userName}
              </Text>
              <Text
                fontWeight="500"
                fontSize="subHead"
                lineHeight="24px"
                textDecorationLine="underline"
                color="clique.secondaryGrey2"
                textAlign={"center"}
                onClick={() => {
                  onOpen();
                }}
                cursor="pointer"
              >
                SUBSCRIPTIONS
              </Text>
            </>
          )}
        </Box>

        {router.pathname.includes("profile") ? (
          <Box position={"absolute"} right="10" bottom="-55">
            {data === null && (
              <Btn text="Create channel" mr="4" onClick={channelOnOpen} />
            )}

            <SideIcon />
          </Box>
        ) : null}
      </Box>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW="400px"
          w="400px"
          bottom="0"
          minH="100vh"
          overflowY={"scroll"}
          sx={scrollBarStyle}
          m="0"
          py="30px"
          position={"absolute"}
          right={0}
          bg="clique.black"
        >
          <Subscriptions />
        </ModalContent>
      </Modal>
      <CreateChannelModal
        onOpen={channelOnOpen}
        isOpen={channelIsOpen}
        onClose={channelOnClose}
      />
    </>
  );
};

export default UserDetail;
