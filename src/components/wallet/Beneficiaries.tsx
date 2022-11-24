import { Box } from '@chakra-ui/react';

import BeneficiariesCard from './BeneficiariesCard';
import WithdrawalCard from './WithdrawalCard';

type Props = {
  onClick: () => void;
  hasBeneficiary: boolean;
};

function Beneficiaries({onClick, hasBeneficiary}: Props) {
  return (
    <Box pr='2' pt='6'>
      <BeneficiariesCard onClick={onClick} hasBeneficiary={hasBeneficiary} />
      <WithdrawalCard />
    </Box>
  );
}

export default Beneficiaries;
