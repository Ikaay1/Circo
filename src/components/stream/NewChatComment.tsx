import React from "react";
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
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import { usePostCommentOnStreamMutation } from "redux/services/livestream/streamComment.service";
import { useAppSelector } from "redux/app/hooks";

function NewChatComment({ id, profile }: { id: string; profile: any }) {
  const [comment, setComment] = React.useState("");
  const [postCommentOnStream, postInfo] = usePostCommentOnStreamMutation();
  const userProfile = useAppSelector((state) => state.app.userReducer);
  const toast = useToast();
  return (
    <Flex
      pos={"fixed"}
      bottom="0"
      right={"0"}
      px="20px"
      bg=""
      py="20px"
      w="400px"
      pl="40px"
    >
      <AvataWithSpace
        name={userProfile?.channel?.name}
        url={userProfile?.channel?.photo}
        mr="20px"
        size="40px"
        borderThickness="2px"
        borderColor="clique.base"
      />

      <InputGroup>
        <Textarea
          rows={2}
          rounded={"10px"}
          p="5px"
          px="10px"
          color={"clique.white"}
          fontSize={"smSubHead"}
          _placeholder={{
            color: "clique.white",
            fontSize: "smSubHead",
          }}
          placeholder="Enter Comment..."
          bg={useColorModeValue("clique.lightPrimaryBg", "clique.ashGrey")}
          border={"none"}
          _focus={{ border: "none", boxShadow: "none" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const post: any = await postCommentOnStream({
                streamId: id,
                commentBody: comment,
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
          bg="clique.ashGrey"
          onClick={async () => {
            const post: any = await postCommentOnStream({
              streamId: id,
              commentBody: comment,
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

export default NewChatComment;
