import { Box } from '@chakra-ui/react';

import { walletData } from '../../constants/utils';
import BeneficiariesCard from './BeneficiariesCard';
import WithdrawalCard from './WithdrawalCard';

type Props = {
  onClick: () => void;
  hasBeneficiary: boolean;
  walletData: any;
};

function Beneficiaries({onClick, hasBeneficiary, walletData}: Props) {
  return (
    <Box pr='2' pl={{base: '2', lg: '0'}} pt={{lg: '6'}}>
      <BeneficiariesCard
        walletData={walletData}
        onClick={onClick}
        hasBeneficiary={hasBeneficiary}
      />
      <WithdrawalCard walletData={walletData} />
    </Box>
  );
}

export default Beneficiaries;
