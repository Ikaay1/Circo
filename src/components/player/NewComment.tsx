import Picker from 'emoji-picker-react';
import React, {useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';

import {
  Box,
  CheckboxIcon,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import Color from '@constants/color';

function NewComment({
  handleComment,
  setComment,
  comment,
  postInfo,
  fixed,
  showEmoji,
}: {
  handleComment: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  postInfo: any;
  fixed?: string;
  showEmoji?: boolean;
}) {
  const channel = useAppSelector((state) => state.app.userReducer.channel);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [rows, setRows] = useState(1);
  const _handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e.which);
    if (e.key === 'Enter') {
      console.log('ent');
      setRows((prevRow) => prevRow + 1);
    }
  };
  const _handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e.which);
    if (
      e.key.toLowerCase() === 'backspace' ||
      e.key.toLowerCase() === 'delete'
    ) {
      console.log('del');
      const lines = comment.split('\n').length;
      setRows(lines);
    }
  };

  return (
    <>
      <Flex
        pos={fixed !== 'yes' ? 'fixed' : 'static'}
        bottom='0'
        right={'0'}
        px={fixed !== 'yes' ? '20px' : 0}
        // bg={fixed !== 'yes' ? 'clique.black' : 'transparent'}
        bg={Color().whiteAndBlack}
        py={fixed !== 'yes' ? '20px' : 0}
        w={{base: '100%', lg: fixed !== 'yes' ? '400px' : '100%'}}
      >
        <AvataWithSpace
          name={channel?.name}
          url={channel?.photo}
          mr='20px'
          size='40px'
          borderThickness='2px'
          borderColor='clique.base'
        />

        <InputGroup>
          <Textarea
            onKeyPress={(e) => _handleKeyPress(e)}
            onKeyDown={(e) => _handleKeyDown(e)}
            rows={rows}
            rounded={'10px'}
            p='5px'
            px='10px'
            // color={'clique.white'}
            fontSize={'smSubHead'}
            _placeholder={{
              color: useColorModeValue(
                'clique.ashGrey',
                'clique.lightPrimaryBg',
              ),
              fontSize: 'smSubHead',
              transform: 'translateY(29%)',
            }}
            placeholder={
              fixed !== 'yes' ? 'Enter Comment...' : 'Enter Reply...'
            }
            bg={useColorModeValue('clique.lightPrimaryBg', 'clique.ashGrey')}
            border={'none'}
            _focus={{border: 'none', boxShadow: 'none'}}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            transition={'all .5s ease'}
            // onKeyDown={async (e) => {
            //   if (e.key === 'Enter') {
            //     handleComment();
            //   }
            // }}
          />
          <InputRightElement
            cursor={'pointer'}
            h='100%'
            roundedRight='10px'
            bg={useColorModeValue('clique.lightPrimaryBg', 'clique.ashGrey')}
          >
            <Image
              onClick={onOpen}
              w='20px'
              h='20px'
              src='/assets/smilie.png'
              alt=''
            />
            {postInfo.isLoading ? (
              <Spinner borderColor={'clique.white'} />
            ) : (
              <Image
                onClick={handleComment}
                w='25px'
                src='/assets/inputIcon.svg'
                alt='icon'
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
      {/* <Box position={'absolute'} right={0}>
        <Picker
          onEmojiClick={(emojiObject, e) =>
            setComment((prevComment) => `${prevComment}${emojiObject.emoji}`)
          }
        />
      </Box> */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        // motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        {/* <ModalOverlay /> */}
        <ModalContent
          position={'absolute'}
          right={0}
          w={{base: '370px', lg: '350px'}}
        >
          <Picker
            onEmojiClick={(emojiObject, e) =>
              setComment((prevComment) => `${prevComment}${emojiObject.emoji}`)
            }
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewComment;
