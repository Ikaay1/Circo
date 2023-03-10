import {
	Box,
	Divider,
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
import { scrollBarStyle2 } from '@constants/utils';

type Props = {
  walletData: any;
};

function WithdrawalCard({walletData}: Props) {
  return (
    <Box bg={Color().whiteAndBlack} borderRadius='xl' py='7' mb='5' px='5'>
      <Text fontSize={'smHead'} mb='2'>
        Withdrawal
      </Text>
      <Divider mb='1' />

      <Text fontSize={'xsl'} mb='2'>
        Recent withdrawal history{' '}
      </Text>
      {walletData?.withdraw_history?.length ? (
        <TableContainer sx={scrollBarStyle2}>
          <Table variant='unstyled' size='sm' fontSize='10px'>
            <Thead>
              <Tr color='clique.text'>
                <Th fontSize='xsl' textTransform={'none'} pl='0'>
                  Name
                </Th>
                <Th fontSize='xsl' textTransform={'none'}>
                  Amount
                </Th>
                <Th fontSize='xsl' textTransform={'none'}>
                  Bank
                </Th>
                <Th fontSize='xsl' textTransform={'none'}>
                  Account no
                </Th>
              </Tr>
            </Thead>
            <Tbody className='no-wrap'>
              {walletData?.withdraw_history?.map((each: any) => {
                return (
                  <Tr key={each.reference}>
                    <Td fontSize='xsl' pl='0'>
                      {each.recipient}
                    </Td>
                    <Td isNumeric fontSize='xsl'>
                      {each.amount}
                    </Td>
                    <Td fontSize='xsl'>{each?.bank}</Td>
                    <Td fontSize='xsl'>{each?.accountNumber}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text fontSize='sm2' textAlign={'center'}>
          No withdraw history yet
        </Text>
      )}
      <Text color='clique.red' fontSize='xsl' textAlign='center' mt='3'>
        Note: Withdrawal is automated by Circo and is sent to your added
        beneficiary account on the 25th of every month.
      </Text>
    </Box>
  );
}

export default WithdrawalCard;

const withdrawalHistory = [
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
  {name: 'Tony Kent Clark', amount: '₦300,000.00', bank: 'ZENITH BANK'},
];
