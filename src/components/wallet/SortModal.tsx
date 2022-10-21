import {
  Box,
  Checkbox,
  Flex, Icon, Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  Stack, Text
} from "@chakra-ui/react";
import CalenderIcon from "@icons/CalenderIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AddMoneyModal({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent
          bg="clique.black"
          borderColor="clique.black"
          borderRadius="xl"
          pt="3"
          py="10"
        >
          <ModalBody>
            <Flex flexDirection={"column"}>
              <Stack
                spacing={5}
                direction={["row"]}
                align="center"
                justify="center"
                mb="20"
              >
                <Box>
                  <Text
                    fontSize={"smSubHead"}
                    fontWeight="400"
                    color={"clique.secondaryGrey2"}
                    mb="0.5"
                  >
                    Start Date
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={CalenderIcon} color="clique.white" />
                    </InputLeftElement>
                    <Input type="date" />
                  </InputGroup>
                </Box>

                <Box>
                  <Text
                    fontSize={"smSubHead"}
                    fontWeight="400"
                    color={"clique.secondaryGrey2"}
                    mb="0.5"
                  >
                    End Date
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={CalenderIcon} color="clique.white" />
                    </InputLeftElement>
                    <Input type="date" />
                  </InputGroup>
                </Box>
              </Stack>
              <Stack
                spacing={24}
                direction={["row"]}
                align="center"
                justify="center"
              >
                <Checkbox size="md">All</Checkbox>
                <Checkbox size="md">Credit</Checkbox>
                <Checkbox size="md">Debit</Checkbox>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddMoneyModal;
