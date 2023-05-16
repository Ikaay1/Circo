import React, { useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { usePostCommentOnStreamMutation } from 'redux/services/livestream/streamComment.service';

import {
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Textarea,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

function NewChatComment({id, profile}: {id: string; profile: any}) {
  const [comment, setComment] = React.useState('');
  const [postCommentOnStream, postInfo] = usePostCommentOnStreamMutation();
  const userProfile = useAppSelector((state) => state.app.userReducer);
  const toast = useToast();
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
    <Flex
      pos={'fixed'}
      bottom='0'
      right={'0'}
      px='20px'
      bg=''
      py='20px'
      w='400px'
      pl='40px'
    >
      <AvataWithSpace
        name={userProfile?.channel_id?.name}
        url={userProfile?.channel_id?.photo}
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
          fontSize={'smSubHead'}
          _placeholder={{
            color: useColorModeValue('clique.ashGrey', 'clique.lightPrimaryBg'),
            fontSize: 'smSubHead',
            transform: 'translateY(29%)',
          }}
          placeholder='Enter Comment...'
          bg={useColorModeValue('clique.lightPrimaryBg', 'clique.ashGrey')}
          border={'none'}
          _focus={{border: 'none', boxShadow: 'none'}}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // onKeyDown={async (e) => {
          //   if (e.key === "Enter") {
          //     const post: any = await postCommentOnStream({
          //       streamId: id,
          //       commentBody: comment,
          //     });

          //     if (post.data) {
          //       setComment("");
          //     } else {
          //       toast({
          //         title: "Error",
          //         description: "Something went wrong",
          //         status: "error",
          //         duration: 3000,
          //         position: "top-right",
          //         isClosable: true,
          //       });
          //     }
          //   }
          // }}
        />
        <InputRightElement
          cursor={'pointer'}
          h='100%'
          roundedRight='10px'
          bg='clique.ashGrey'
        >
          {postInfo.isLoading ? (
            <Spinner />
          ) : (
            <Image
              onClick={async () => {
                const post: any = await postCommentOnStream({
                  streamId: id,
                  commentBody: comment,
                });
                if (post.data) {
                  setComment('');
                } else {
                  toast({
                    title: 'Error',
                    description: 'Something went wrong',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true,
                  });
                }
              }}
              w='25px'
              src='/assets/inputIcon.svg'
              alt='icon'
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default NewChatComment;
