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
import { usePostCommentOnStreamMutation } from "redux/services/livestream/streamComment.service";
import Color from "@constants/color";

function NewComment({ id, profile }: { id: string; profile: any }) {
  const [comment, setComment] = React.useState("");
  const [postCommentOnStream, postInfo] = usePostCommentOnStreamMutation();

  const toast = useToast();
  return (
    <Flex px="20px" bg={Color().lightAndPrimary} py="20px" w="full">
      <AvataWithSpace
        name={profile?.firstName + " " + profile?.lastName}
        url={profile?.avatar}
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
          bg={useColorModeValue("clique.white", "clique.ashGrey")}
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

export default NewComment;
