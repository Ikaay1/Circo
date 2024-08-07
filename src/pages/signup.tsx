import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {
  usePreSignupMutation,
  useValidateMutation,
} from 'redux/services/auth.service';

import {Box, Input, Text, useToast} from '@chakra-ui/react';
import AuthButton from '@components/auth/AuthButton';
import AuthInput from '@components/auth/AuthInput';
import CliqueLogo from '@components/auth/CliqueLogo';
import ShowAuthHeader from '@components/auth/ShowAuthHeader';
import ShowAuthImage from '@components/auth/ShowAuthImage';
import SocialMedia from '@components/auth/SocialMedia';
import Color from '@constants/color';
import {signUpInputData} from '@constants/utils';

import {SignUpDataInterface} from '../constants/interface';

const Signup = () => {
  const token = useAppSelector((state) => state.app.userReducer.token);
  const toast = useToast();
  const [preSignup, preSignupStatus] = usePreSignupMutation();
  const [validate, validateStatus] = useValidateMutation();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePreSignup = async (e: any) => {
    e.preventDefault();
    let allData;
    if (!referralCode) {
      allData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        ageRange: ageRange.trim(),
      };
    } else {
      allData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        referredBy: referralCode.trim(),
        ageRange: ageRange.trim(),
      };
    }

    const data = {
      firstName: firstName.trim(),
      email: email.toLowerCase().trim(),
      userName: userName.trim(),
    };

    const res: SignUpDataInterface = await preSignup(data);
    if ('data' in res) {
      // redirect to otp page and pass all data
      localStorage.setItem('hashedOtp', JSON.stringify(res.data.data.otp_hash));
      localStorage.setItem('userData', JSON.stringify(allData));
      router.push(`/otp`);
    } else if (res?.error) {
      toast({
        title: 'Error',
        //@ts-ignore
        description: res?.error?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Error',
        //@ts-ignore
        description: 'Something went wrong, please try again ',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    if (token) {
      router.push('/home');
    }
  }, [token, router]);

  useEffect(() => {
    localStorage.removeItem('hashedOtp');
    localStorage.removeItem('userData');
  }, []);

  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(userName)) {
      setUsernameError('Username cannot contain special characters');
    } else {
      setUsernameError('');
    }
  }, [userName]);

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      alignItems={'center'}
      backgroundColor={Color().lightAndPrimary}
    >
      <CliqueLogo />
      <Box display={{base: 'none', lg: 'block'}}>
        <ShowAuthImage />
      </Box>
      <Box
        marginLeft={{base: '0', xl: '50%'}}
        minW={{base: '60%', xl: '50%'}}
        py='50px'
      >
        <Box
          padding={'1rem'}
          width={{base: 'full', md: '450px'}}
          height={'100%'}
          margin='0 auto'
        >
          <ShowAuthHeader
            header='Sign Up'
            detail='Connect to more Circos today!'
          />
          <form onSubmit={handlePreSignup} className='login-form'>
            <Box display={'flex'} justifyContent='space-between' mt='30px'>
              <Box width='48%' height='60px' position='relative'>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='input'
                  borderRadius='12px'
                  type={'text'}
                  required={true}
                  placeholder='Firstname'
                  backgroundColor={Color().greyAndPureWhite}
                  _placeholder={{
                    color: Color().blackAndWhite,

                    fontSize:
                      isFirstNameFocused || firstName !== '' ? 'sm3' : '1rem',
                    pb: isFirstNameFocused || firstName !== '' ? '5px' : '0',
                    transition: 'all .3s ease',
                    transform:
                      isFirstNameFocused || firstName !== ''
                        ? 'translateY(-110%);  '
                        : 'translateY(0%); ',
                  }}
                  h='60px'
                  borderWidth={'1px'}
                  borderColor={Color().greyAndPureWhite}
                  _focus={{
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                  _active={{
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                  color={Color().blackAndWhite}
                  onFocus={() => setIsFirstNameFocused(true)}
                  onBlur={() => setIsFirstNameFocused(false)}
                />

                <Text
                  position='absolute'
                  top='0%'
                  left={'8%'}
                  fontSize='sm3'
                  pt='5px'
                  color={Color().blackAndWhite}
                  display={firstName !== '' ? 'block' : 'none'}
                  transition='all .3s ease'
                  zIndex='99'
                >
                  Firstname
                </Text>
              </Box>
              <Box width='48%' height='60px' position='relative'>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  _focus={{
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                  _active={{
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                  className='input'
                  type={'text'}
                  required={true}
                  placeholder='Lastname'
                  color={Color().blackAndWhite}
                  backgroundColor={Color().greyAndPureWhite}
                  _placeholder={{
                    color: Color().blackAndWhite,
                    fontSize:
                      isLastNameFocused || lastName !== '' ? 'sm3' : '1rem',
                    pb: isLastNameFocused || lastName !== '' ? '5px' : '0',
                    transition: 'all .3s ease',
                    transform:
                      isLastNameFocused || lastName !== ''
                        ? 'translateY(-110%);  '
                        : 'translateY(0%); ',
                  }}
                  borderRadius='12px'
                  borderWidth={'1px'}
                  h='60px'
                  borderColor={Color().greyAndPureWhite}
                  onFocus={() => setIsLastNameFocused(true)}
                  onBlur={() => setIsLastNameFocused(false)}
                />

                <Text
                  position='absolute'
                  top='0%'
                  left={'8%'}
                  fontSize='sm3'
                  pt='5px'
                  color={Color().blackAndWhite}
                  zIndex='99'
                  transition='all .3s ease'
                  display={lastName !== '' ? 'block' : 'none'}
                >
                  Lastname
                </Text>
              </Box>
            </Box>
            {signUpInputData.map(({name, image, key, inputName}) => (
              <div key={key}>
                <Box position='relative' height='60px' marginTop={'.5rem'}>
                  <AuthInput
                    image={image}
                    name={name}
                    handleShowPassword={handleShowPassword}
                    theState={
                      image
                        ? password
                        : inputName === 'referralCode'
                        ? referralCode
                        : inputName === 'userName'
                        ? userName
                        : email
                    }
                    setTheState={
                      image
                        ? setPassword
                        : inputName === 'referralCode'
                        ? setReferralCode
                        : inputName === 'email'
                        ? setEmail
                        : setUserName
                    }
                    showPassword={showPassword}
                    email={inputName === 'email'}
                    referral={inputName === 'referralCode'}
                    onBlur={
                      name === 'Username'
                        ? async () => {
                            if (!usernameError) {
                              const res: any = await validate({userName});
                              if (res?.error) {
                                setUsernameError(
                                  res?.error?.data?.message ||
                                    'Something went wrong',
                                );
                              }
                            }
                          }
                        : name === 'Email'
                        ? async () => {
                            if (
                              email
                                .toLowerCase()
                                .match(
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                )
                            ) {
                              const res: any = await validate({email});
                              if (res?.error) {
                                setEmailError(
                                  res?.error?.data?.message ||
                                    'Something went wrong',
                                );
                              }
                            }
                          }
                        : undefined
                    }
                  />
                </Box>
                {name === 'Username' && usernameError && (
                  <Text color='clique.red' fontSize='12px' mt='.3rem'>
                    {usernameError}
                  </Text>
                )}
                {name === 'Email' && emailError && (
                  <Text color='clique.red' fontSize='12px' mt='.3rem'>
                    {emailError}
                  </Text>
                )}
              </div>
            ))}

            <Box position='relative' height='57px' marginTop={'.5rem'}>
              <AuthInput
                name={'Age Range'}
                option={['18 and above', 'Below 18']}
                ageRange={ageRange}
                setAgeRange={setAgeRange}
              />
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              marginTop={'1.6rem'}
              color={Color().blackAndWhite}
            >
              <label
                className='remember'
                style={{
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <input
                  color={Color().blackAndWhite}
                  type='checkbox'
                  required={true}
                  name=''
                />
                <Box color={Color().blackAndWhite2} as='span'>
                  I agree to the&nbsp;
                </Box>
                <span style={{color: '#892cdc'}}>
                  <Link href='/terms-of-service'>Terms of Service</Link>&nbsp;
                </span>
                <Box color={Color().blackAndWhite2} as='span'>
                  and&nbsp;
                </Box>
                <span style={{color: '#892cdc'}}>
                  <Link href='/privacy-policy'>Privacy Policy</Link>
                </span>
              </label>
            </Box>
            <AuthButton
              status={preSignupStatus}
              {...{marginTop: '1.2rem'}}
              name='Sign Up'
              disabled={usernameError || emailError ? true : false}
            />
          </form>
          <SocialMedia
            haveAccount={'Already have an account?'}
            text={'Login here'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
export {getServerSideProps} from '../components/widgets/Chakara';
