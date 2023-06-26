import useGetNotifications from "hooks/useGetNotifications";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { GoSettings } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import {
  useGetNotificationQuery,
  useReadAllMutation,
} from "redux/services/notification.service";
import io from "socket.io-client";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Color from "@constants/color";
import { scrollBarStyle } from "@constants/utils";

import AccordionNotification from "./AccordionNotification";
import { socket } from "@constants/socket";

function NotificationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [readAll, readInfo] = useReadAllMutation();
  const { data, isLoading, isFetching, refetch } = useGetNotificationQuery({
    page,
  });

  const { loading, hasMore, contents } = useGetNotifications({
    data,
    isFetching,
    page,
    isLoading,
  });

  const observerRef: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    socket.on("newnotification", (data: any) => {
      refetch();
    });

    return () => {
      socket.off("newnotification");
    };
  }, []);

  return (
    <>
      <Flex
        mr="10px"
        cursor={"pointer"}
        onClick={onOpen}
        alignItems={"center"}
        justifyContent="center"
        p="3px"
        bg={useColorModeValue("clique.lightPrimaryBg", "clique.grey")}
        rounded="full"
      >
        <Avatar
          p="0"
          bg={useColorModeValue("clique.lightPrimaryBg", "clique.grey")}
          icon={
            <Icon
              fontSize={"smHead2"}
              color={Color().blackAndWhite}
              as={MdOutlineNotificationsNone}
            />
          }
          size="sm"
        >
          {data?.data?.unread > 0 && (
            <AvatarBadge
              bg="clique.base"
              top={"0"}
              right={"5px"}
              boxSize="12px"
              border="none"
              fontSize={"xs"}
            >
              {data?.data?.unread && data?.data?.unread > 0
                ? data?.data?.unread
                : ""}
            </AvatarBadge>
          )}
        </Avatar>
      </Flex>

      <Modal
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size={{ base: "full", lg: "lg" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="clique.modalOverlay" />
        <ModalContent
          sx={scrollBarStyle}
          maxH={"90vh"}
          overflowY={"scroll"}
          borderRadius="20px"
          pt="10px"
          pb="30px"
          mt="70px"
          px="20px"
          right={{ base: "0", lg: "250px" }}
          pos="absolute"
          top={{ base: "10vh", lg: "0" }}
          bg={Color().lightAndPrimary}
        >
          <ModalHeader
            display="flex"
            alignItems={"center"}
            textAlign={"center"}
            fontSize={"smSubHead"}
            justifyContent="space-between"
            mb="10px"
          >
            <Box w="120px"></Box>
            <Flex alignItems="center">
              Notification
              <Icon
                ml="5px"
                // as={GoSettings}
                bg="clique.base"
                color="clique.primaryBg"
                p="2px"
                fontSize={"smHead"}
                rounded={"5px"}
              />
            </Flex>
            <Flex w="120px" justifyContent={"right"}>
              {" "}
              <Button
                onClick={() => readAll()}
                fontSize={"sm"}
                fontWeight="normal"
                isLoading={readInfo?.isLoading}
                size={"sm"}
                px="10px"
                disabled={
                  readInfo?.isLoading || !data?.data?.notifications?.length
                    ? true
                    : false
                }
              >
                Mark all as read
              </Button>
            </Flex>
          </ModalHeader>

          {isLoading ? (
            [1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} h="50px" rounded="10px" mb="10px" />
            ))
          ) : data?.data?.notifications?.length > 0 ? (
            <AccordionNotification
              data={data?.data?.notifications}
              lastElementRef={lastElementRef}
            />
          ) : (
            <Text fontFamily="Poppins" textAlign={"center"} fontWeight={"500"}>
              No notification available
            </Text>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationModal;
