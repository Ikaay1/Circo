import {
  Avatar,
  AvatarBadge,
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
  useDisclosure,
} from "@chakra-ui/react";
import { scrollBarStyle } from "@constants/utils";
import React from "react";
import { GoSettings } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useGetNotificationQuery } from "redux/services/notification.service";
import AccordionNotification from "./AccordionNotification";

function NotificationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetNotificationQuery("");
  const unread = data?.data?.preference?.filter(
    (item: any) => item?.status === "unread"
  );

  return (
    <>
      <Flex
        mr="10px"
        cursor={"pointer"}
        onClick={onOpen}
        alignItems={"center"}
        justifyContent="center"
        p="3px"
        bg="clique.grey"
        rounded="full"
      >
        <Avatar
          p="0"
          bg="clique.grey"
          icon={<Icon fontSize={"smHead2"} as={MdOutlineNotificationsNone} />}
          size="sm"
        >
          <AvatarBadge
            bg="clique.base"
            top={"0"}
            right={"5px"}
            boxSize="12px"
            border="none"
            fontSize={"xs"}
          >
            {unread?.length || 0}
          </AvatarBadge>
        </Avatar>
      </Flex>

      <Modal
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="lg"
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
          right={"250px"}
          pos="absolute"
          bg="clique.primaryBg"
        >
          <ModalHeader
            display="flex"
            alignItems={"center"}
            textAlign={"center"}
            fontSize={"smSubHead"}
            justifyContent="center"
            mb="20px"
          >
            Notification{" "}
            <Icon
              ml="5px"
              as={GoSettings}
              bg="clique.base"
              color="clique.primaryBg"
              p="2px"
              fontSize={"smHead"}
              rounded={"5px"}
            />{" "}
          </ModalHeader>

          {isLoading &&
            [1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} h="50px" rounded="10px" mb="10px" />
            ))}
          {data && <AccordionNotification data={data?.data?.preference} />}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationModal;
