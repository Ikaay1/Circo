import { useRouter } from "next/router";
import React from "react";

import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { helpGrowData, walletData } from "@constants/utils";
import ArrowRight from "@icons/ArrowRight";

const Grow = () => {
  const router = useRouter();
  return (
    <>
      <Text
        fontWeight={{ base: "600", lg: "700" }}
        fontSize={{ base: "smHead", lg: "big3" }}
        lineHeight="36px"
        textAlign="center"
        letterSpacing="-0.02em"
        color="clique.white"
      >
        We help you grow
      </Text>
      <Box mt={"5.5rem"}>
        {helpGrowData.map(({ key, header, image, bigImage, text }, i) => (
          <Box
            key={key}
            display={{lg: 'flex'}}
            justifyContent={{lg: 'space-between'}}
            alignItems={{lg: 'center'}}
          >
            <Box mt={"4.5rem"} w={{ lg: "40%" }} h={{ lg: "100%" }}>
              <Text
                fontSize={{ base: "sm2", lg: "medium" }}
                lineHeight={{ base: "28px", lg: "49px" }}
                color="clique.white"
                fontWeight={{ lg: "600" }}
              >
                {header}
              </Text>
              <Text
                fontSize={{ base: "sm", lg: "sm2" }}
                lineHeight={{ base: "20px", lg: "1.6" }}
                color="clique.white"
                mt={{ base: ".45rem", lg: ".75" }}
                fontWeight={"400"}
              >
                {text}
              </Text>
              <Flex
                alignItems={'center'}
                display={{base: 'none', lg: 'flex'}}
                mt='1rem'
                cursor='pointer'
                onClick={() => router.push('/signup')}
              >
                <Text
                  fontFamily='Poppins'
                  fontStyle='normal'
                  fontWeight='500'
                  lineHeight='20px'
                  color='clique.white'
                >
                  Get Started
                </Text>
                <Icon height={'100%'} ml='.6rem' as={ArrowRight} />
              </Flex>
            </Box>
            <Box
              mt="5rem"
              position={"relative"}
              h={{ lg: "60%" }}
              w={{
                lg: '683px',
              }}
              order={{lg: i === 1 ? '-1' : '1'}}
              mr={{lg: i === 1 ? '1.5rem' : '0rem'}}
              //
            >
              <Image
                src={`/assets/${image}.png`}
                alt={`${image}`}
                w={{
                  base: i === 0 ? '290px' : '320px',
                }}
                ml={{
                  base: 'auto',
                }}
                mr={{base: i === 1 ? 'auto' : ''}}
                display={{lg: 'none'}}
              />
              <Image
                src={`/assets/${bigImage}.png`}
                alt={`${image}`}
                w={{
                  lg: i === 0 ? '600px' : '683px',
                }}
                h={{lg: i === 0 ? '400px' : '466px'}}
                ml={{
                  lg: i === 0 ? 'auto' : '',
                }}
                display={{base: 'none', lg: 'block'}}
              />
              {i === 0 && (
                <Box
                  w={{base: '185px', lg: '422px'}}
                  p={{base: '.5rem', lg: '1.1rem'}}
                  background='clique.black5'
                  borderRadius='8.1807px'
                  position={'absolute'}
                  top='-15%'
                  left={'0'}
                >
                  {walletData.map(({key, image, time, amount}, i) => (
                    <Box
                      display={'flex'}
                      justifyContent='space-between'
                      background='clique.blackGrey'
                      borderRadius='4.09035px'
                      p={{
                        base: '.3rem',
                        lg: '.7rem',
                      }}
                      mb={{
                        base: '.2rem',
                        lg: '.4rem',
                      }}
                      key={key}
                    >
                      <Box display={'flex'}>
                        <Box
                          w={{
                            base: '16px',
                            lg: '30px',
                          }}
                          h={{
                            base: '16px',
                            lg: '30px',
                          }}
                          borderRadius={'50%'}
                          display={'flex'}
                          justifyContent='center'
                          alignItems={'center'}
                          bg={
                            i !== 2
                              ? 'rgba(133, 191, 154, 0.3)'
                              : 'rgba(195, 46, 46, 0.26)'
                          }
                          mr={{
                            base: '.15rem',
                            lg: '.55rem',
                          }}
                        >
                          <Image
                            src={`/assets/${image}.png`}
                            alt='arrow up icon'
                            w={{
                              base: '12px',
                              lg: '24px',
                            }}
                            h={{
                              base: '12px',
                              lg: '24px',
                            }}
                          />
                        </Box>

                        <Text
                          fontSize={{
                            base: 'xs2',
                            lg: 'sm',
                          }}
                          lineHeight={{
                            base: '8px',
                            lg: '20px',
                          }}
                          color='clique.white'
                        >
                          {i !== 2
                            ? 'Circo Wallet credited with'
                            : 'Circo Wallet debited with'}{' '}
                          <Text
                            display={'inline'}
                            color={i !== 2 ? '#22C55E' : '#D52B2B'}
                          >
                            {amount}
                          </Text>
                        </Text>
                      </Box>
                      <Text
                        fontSize={{
                          base: 'xs2',
                          lg: 'sm',
                        }}
                        lineHeight={{
                          base: '8px',
                          lg: '20px',
                        }}
                        color='clique.white'
                      >
                        {time}
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Grow;
