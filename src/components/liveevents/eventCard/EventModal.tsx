import React from 'react';

import {
	Box,
	Button,
	Image,
	Modal,
	ModalContent,
	ModalOverlay,
	SlideFade,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { scrollBarStyle } from '@constants/utils';

import BodyOne from './BodyOne';
import BodyTwo from './BodyTwo';
import EventCard from './EventCard';

function EventModal({event}: {event: any}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);
  return (
    <>
      <EventCard event={event} onOpen={onOpen} />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          maxW={{base: '70%', lg: '400px'}}
          w={{base: '70%', lg: '400px'}}
          bottom='0'
          minH='100vh'
          overflowY={'scroll'}
          sx={scrollBarStyle}
          m='0'
          py='30px'
          position={'absolute'}
          right={0}
          bg='clique.black'
        >
          <Box px={{base: '10px', lg: '50px'}}>
            <Image
              w='full'
              alt='event flyer'
              src={event?.eventId?.thumbNails[0]}
              rounded={'10px'}
            />
            <Text
              pt='10px'
              textAlign={'center'}
              fontFamily={'Poppins'}
              fontWeight={500}
              textTransform={'capitalize'}
              fontSize='smHead'
            >
              N{event?.eventId?.fee}
            </Text>
            <Text
              textAlign={'center'}
              fontFamily={'Poppins'}
              fontWeight={500}
              textTransform={'capitalize'}
              fontSize='smSubHead'
            >
              per Ticket
            </Text>

            {step === 1 && (
              <SlideFade in={step === 1} offsetX='0px' offsetY={'0'} dir='left'>
                <BodyOne event={event} setStep={setStep} />
              </SlideFade>
            )}
            {/* {step === 2 && (
              <SlideFade
                in={step === 2}
                offsetX="80px"
                offsetY={"0"}
                dir="right"
              >
                <BodyTwo setStep={setStep} />
              </SlideFade>
            )} */}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventModal;
