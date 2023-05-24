import {
  Box,
  Divider,
  Flex,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import {ReceiptInfo} from '@constants/interface';
import {scrollBarStyle2} from '@constants/utils';
import DownwardIcon from '@icons/DownwardIcon';
import UpwardIcon from '@icons/UpwardIcon';

type Props = {
  walletData: any;
  info: ReceiptInfo;
};

function WithdrawalCard({info, walletData}: Props) {
  return (
    <>
      {/* <Box bg={Color().whiteAndBlack} borderRadius="xl" py="7" mb="5" px="5">
      <Text fontSize={"smHead"} mb="2">
        Withdrawal
      </Text>
      <Divider mb="1" />

      <Text fontSize={"xsl"} mb="2">
        Recent withdrawal history{" "}
      </Text>
      {walletData?.withdraw_history?.length ? (
        <TableContainer sx={scrollBarStyle2}>
          <Table variant="unstyled" size="sm" fontSize="10px">
            <Thead>
              <Tr color="clique.text">
                <Th fontSize="xsl" textTransform={"none"} pl="0">
                  Name
                </Th>
                <Th fontSize="xsl" textTransform={"none"}>
                  Amount
                </Th>
                <Th fontSize="xsl" textTransform={"none"}>
                  Bank
                </Th>
                <Th fontSize="xsl" textTransform={"none"}>
                  Account no
                </Th>
              </Tr>
            </Thead>
            <Tbody className="no-wrap">
              {walletData?.withdraw_history?.map((each: any) => {
                return (
                  <Tr key={each.reference}>
                    <Td fontSize="xsl" pl="0">
                      {each.recipient}
                    </Td>
                    <Td isNumeric fontSize="xsl">
                      {each.amount}
                    </Td>
                    <Td fontSize="xsl">{each?.bank}</Td>
                    <Td fontSize="xsl">{each?.accountNumber}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text fontSize="sm2" textAlign={"center"}>
          No withdraw history yet
        </Text>
      )}
    </Box> */}
      {info?.description ? (
        <Box
          bg={Color().whiteAndBlack}
          borderColor='clique.black'
          borderRadius='xl'
          pt='3'
          pb='5'
          px='1'
          mb='5'
        >
          <Text textAlign='center' fontSize={'subHead'}>
            Transaction Receipt
          </Text>

          <Box>
            <Flex
              flexDirection={'column'}
              pb='20'
              px='2'
              pt='3'
              borderRadius={'xl'}
              // backgroundSize={'cover'}
              // backgroundImage="'/assets/transactionbg.svg'"
            >
              <Flex
                justifyContent={'space-between'}
                align='center'
                justify='center'
                mb='4rem'
              >
                <Spacer />
                <Icon
                  as={info?.from === 'To' ? DownwardIcon : UpwardIcon}
                  fontSize='5xl'
                />
                <Spacer />
                <Text fontSize={'xsl'} fontWeight='400'>
                  {info?.duration}
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'} mb='2'>
                <Text
                  fontWeight='400'
                  color={'clique.secondaryGrey2'}
                  fontSize='xsl'
                >
                  {info?.from}
                </Text>

                <Text fontSize={'smSubHead'} fontWeight='400'>
                  {info?.name}
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'} mb='2'>
                <Text
                  fontSize={'smSubHead'}
                  fontWeight='400'
                  color={'clique.secondaryGrey2'}
                >
                  Description
                </Text>
                <Text
                  fontSize={'smSubHead'}
                  fontWeight='400'
                  textAlign={'right'}
                >
                  {info?.description}
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'} mb='2'>
                <Text
                  fontSize={'smSubHead'}
                  fontWeight='400'
                  color={'clique.secondaryGrey2'}
                >
                  Date
                </Text>
                <Text fontSize={'smSubHead'} fontWeight='400'>
                  {info?.date}
                </Text>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Text
                  fontSize={'smSubHead'}
                  fontWeight='400'
                  color={'clique.secondaryGrey2'}
                >
                  Reference
                </Text>
                <Text fontSize={'smSubHead'} fontWeight='400'>
                  {info?.reference}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default WithdrawalCard;

const withdrawalHistory = [
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
];
