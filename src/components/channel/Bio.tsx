import {
  Box,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AuthButton from "@components/auth/AuthButton";
import ShareIcon from "@icons/ShareIcon";
import { useAppSelector } from "redux/app/hooks";

import CopyBox from "./CopyBox";

const Bio = ({
  showSubscribe,
  bio,
  id,
  onClick
}: {
  showSubscribe: boolean;
  bio?: string;
  id: string;
  onClick: () => void;

}) => {
  const { isOpen, onOpen, onClose, } = useDisclosure();
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  return (
    <>
      <Box
        mt={"1.4rem"}
        ml="1rem"
        mr={"2rem"}
        display="flex"
        justifyContent={"space-between"}
        alignItems="flex-start"
      >
        <Box w="40%">
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
          <Box display={"flex"} alignItems="center">
            <Box
              mr=".5rem"
              cursor="pointer"
              onClick={() => {
                onOpen();
              }}
            >
              <Icon as={ShareIcon} />
            </Box>
            {userProfile._id === id ? null : (
              <AuthButton
                width="180px"
                height="50px"
                borderRadius="30px"
                fontSize="sm2"
                name="Subscribe"
                onClick={onClick}
              />
            )}
          </Box>
        )}
      </Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Box
            position="absolute"
            left={"50%"}
            transform={"translate(-50%, 60%)"}
          >
            <CopyBox />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bio;
