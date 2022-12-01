import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import { toast } from 'react-hot-toast';
import { useAppSelector } from 'redux/app/hooks';
import { useGetUserQuery } from 'redux/services/user.service';
import { useDepositToWalletMutation } from 'redux/services/wallet.service';

export default function App() {
  const [depositToWallet] = useDepositToWalletMutation();
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {amount} = router.query;
  const {data} = useGetUserQuery(userProfile?._id);
  const config: any = {
    public_key: process.env.NEXT_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: data?.data?.email,
      name: data?.data?.firstName + ' ' + data?.data?.lastName,
    },
    customizations: {
      title: 'Deposit to wallet',
      description: 'Deposit to my wallet',
      logo: 'https://clique-web.vercel.app/assets/clique-logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/wallet');
    }
  }, [router, userProfile]);

  return (
    <div className='flutter-div'>
      <button
        className='flutterwave-button'
        disabled={!data?.data?.email ? true : false}
        onClick={() => {
          if (data?.data?.email) {
            handleFlutterPayment({
              callback: async (response) => {
                const res: any = await depositToWallet({
                  amount: Number(response.amount),
                  description: 'Funding wallet',
                  reference: `${response.tx_ref}`,
                });
                if ('data' in res) {
                  console.log('successful');
                }
                if ('error' in res) {
                  console.log(res?.error);
                  //   toast.error(
                  //     res?.error?.data?.message
                  //       ? res?.error?.data?.message
                  //       : "Something went wrong, couldn't make deposit",
                  //   );
                }
                router.push('/wallet');
                closePaymentModal(); // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }
        }}
      >
        Pay ₦{amount}
      </button>
    </div>
  );
}
