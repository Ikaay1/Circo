import React from "react";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import { useReplyStreamCommentMutation } from "redux/services/livestream/streamComment.service";
import Color from "@constants/color";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/app/hooks";

function NewReplyComment({ id }: { id: string }) {
  const router = useRouter();
  const { channel } = useAppSelector((store) => store.app.userReducer);
  const [comment, setComment] = React.useState("");
  const [replyStreamComment, postInfo] = useReplyStreamCommentMutation();

  const toast = useToast();

  return (
    <Flex
      position={"static"}
      bottom="0"
      right={"0"}
      px="0"
      // bg={Color().whiteAndBlack}
      py="0"
      w="100%"
    >
      <AvataWithSpace
        name={channel?.name}
        url={channel?.photo}
        mr="20px"
        size="40px"
        borderThickness="2px"
        borderColor="clique.base"
      />

      <InputGroup>
        <Input
          rounded={"10px"}
          p="5px"
          px="10px"
          color={Color().blackAndWhite}
          fontSize={"smSubHead"}
          _placeholder={{
            color: Color().blackAndWhite,
            fontSize: "smSubHead",
          }}
          placeholder="Enter Comment..."
          bg={Color().lightAndPrimary}
          border={"none"}
          _focus={{ border: "none", boxShadow: "none" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const post: any = await replyStreamComment({
                commentId: id,
                replyBody: comment,
              });

              if (post.data) {
                setComment("");
              } else {
                toast({
                  title: "Error",
                  description: "Something went wrong",
                  status: "error",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
                });
              }
            }
          }}
        />
        <InputRightElement
          cursor={"pointer"}
          h="100%"
          roundedRight="10px"
          bg={Color().whiteAndBlack}
          onClick={async () => {
            const post: any = await replyStreamComment({
              commentId: id,
              replyBody: comment,
            });
            if (post.data) {
              setComment("");
            } else {
              toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
              });
            }
          }}
        >
          {postInfo.isLoading ? (
            <Spinner />
          ) : (
            <Image w="25px" src="/assets/inputIcon.svg" alt="icon" />
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default NewReplyComment;
