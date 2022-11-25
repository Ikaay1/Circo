import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Puff } from 'react-loader-spinner';
import { useGetUserQuery } from 'redux/services/user.service';
import { useDepositToWalletMutation } from 'redux/services/wallet.service';
import styled from 'styled-components';

import { Image } from '@chakra-ui/react';
// @ts-ignore
import PaystackPop from '@paystack/inline-js';

const Success = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    height: 300px;
    width: 296px;
    border-radius: 10px;
    position: relative;
    .circle {
      height: 18px;
      width: 18px;
      border-radius: 40px;
      position: absolute;
      border: 3px solid white;
    }
    .one {
      top: 10px;
      left: 74px;
      background-color: #5b90fe;
    }
    .two {
      top: 35px;
      left: 147px;
      background-color: #9658ff;
    }
    .three {
      height: 6px;
      width: 6px;
      top: 11px;
      left: 217px;
      border: none;
      background-color: #9658ff;
    }
    .four {
      top: -9px;
      left: 190px;
      background-color: #5b90fe;
    }
    .five {
      height: 64px;
      width: 64px;
      border: 8px solid white;
      top: -32px;
      left: 116px;
      background: linear-gradient(52.96deg, #3f7dfe 10.7%, #b183ff 92%);
    }
    h3,
    p {
      text-align: center;
    }
    h3 {
      color: #15051e;
      font-size: 20px;
      line-height: 24px;
      font-weight: 700;
      margin: 0 0 10px;
    }
    p {
      color: #263238;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      padding: 0 10px;
    }
  }
`;

export default function Home() {
  const router = useRouter();
  let {id, amount} = router.query;
  const {data, isFetching: getUserLoading} = useGetUserQuery(id);
  const [depositToWallet] = useDepositToWalletMutation();
  const [requestData, setRequestData] = useState({email: ''});
  const [transSuccess, setTransSuccess] = useState(false);

  console.log('router', router);
  useEffect(() => {
    if (data) {
      console.log(data);
      setRequestData(data.data);
    }
  }, [data]);

  async function payWithPaystack() {
    if (amount && requestData?.email) {
      const paystackPop = new PaystackPop();

      const res = await paystackPop.checkout({
        key: 'pk_test_86f85beca1c41dea982647b8ea5922190f5ba933',
        email: requestData?.email,
        amount: Number(amount) * 100,
        async onSuccess(response: any) {
          console.log('response', response);
          const res: any = await depositToWallet({
            amount: Number(amount),
            description: 'Funding wallet',
            reference: response.reference,
          });
          if ('data' in res) {
            setTransSuccess(true);
            router.push('/wallet');
          } else {
            toast.error(res.error?.data?.message);
            router.push('/wallet');
          }
        },

        onError() {
          alert('Unable to process Payment');
        },
        onCancel() {
          alert('Payment Cancelled');
        },
      });
    }
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='powered'>
          <h5 className='header-text'>Powered by </h5>
          <Image src='/assets/paystack.jpeg' className='logo' alt='paystack' />
        </div>
        {true ? (
          <div className='App'>
            <div className='checkout-form'>
              <div id=''></div>
              {getUserLoading || !data ? (
                <Puff
                  height='80'
                  width='80'
                  radius={1}
                  color='#4fa94d'
                  ariaLabel='puff-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              ) : (
                <button
                  onClickCapture={() => {
                    payWithPaystack();
                  }}
                  className='paystack-button'
                >
                  Pay ₦{amount}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      {transSuccess && (
        <Success>
          <div>
            <div className='circle one'></div>
            <div className='circle two'></div>
            <div className='circle three'></div>
            <div className='circle four'></div>
            <div className='circle five'></div>
            <h3> </h3>
            <h3>Payment Successful</h3>
            <p>Congratulations you have successfully made payment</p>
            <p style={{color: '#F6CA2F'}}>
              Click on the X or Close Button in the <strong>upper-left</strong>{' '}
              corner of the browser window to close browser and continue
            </p>
          </div>
        </Success>
      )}
    </div>
  );
}
