import { Box } from '@chakra-ui/react';

import BeneficiariesCard from './BeneficiariesCard';
import WithdrawalCard from './WithdrawalCard';

type Props = {
  onClick: () => void;
  hasBeneficiary: boolean;
  walletData: any;
};

function Beneficiaries({onClick, hasBeneficiary, walletData}: Props) {
  return (
    <Box pr='2' pt='6'>
      <BeneficiariesCard
        walletData={walletData}
        onClick={onClick}
        hasBeneficiary={hasBeneficiary}
      />
      <WithdrawalCard />
    </Box>
  );
}

export default Beneficiaries;
