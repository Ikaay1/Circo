import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import tickSquare from '@icons/UploadIcon copy';

type Props = {
  onClick: () => void;
  hasBeneficiary: boolean;
  walletData: any;
};

function BeneficiariesCard({onClick, hasBeneficiary, walletData}: Props) {
  return (
    <Box pt='7' pb='5' mb='5' bg='clique.black' borderRadius='xl' px='6'>
      <Text fontSize={'smHead'} mb='2'>
        Beneficiaries
      </Text>
      <Divider mb='5' />
      {hasBeneficiary ? (
        <Flex
          bg='clique.blackGrey'
          borderRadius='xl'
          p='2'
          align='center'
          mb='7'
        >
          <Icon as={tickSquare} mr='3' fontSize={'l'}></Icon>

          <Box>
            <Text fontSize={'smSubHead'}>
              {walletData.beneficiary.accountName}
            </Text>
            <Flex color='clique.text'>
              <Text mr='2' fontSize={'xs'}>
                {walletData.beneficiary.bankName}
              </Text>
              <Text fontSize={'xs'}>
                {walletData.beneficiary.accountNumber}
              </Text>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Text fontSize={'xsl'} color='clique.text' align='center' py='5'>
          You do not have a beneficiary account to receive your monthly
          automated withdrawal. Kindly add your account number to create a
          beneficiary.
        </Text>
      )}

      <Btn
        text={hasBeneficiary ? 'Change beneficiary' : 'Add beneficiary'}
        style={{width: '100%'}}
        py='7'
        onClick={onClick}
      ></Btn>
    </Box>
  );
}

export default BeneficiariesCard;
