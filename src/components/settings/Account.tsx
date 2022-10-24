import {
  Avatar, Box,
  Divider, Flex, Link, Text
} from "@chakra-ui/react";

type Props = {};

function Account({}: Props) {
  return (
    <Box>
      <Text fontSize={"smSubHead"} mb="3">
        Profile
      </Text>
      <Text fontSize={"subHead"} mb="2.5">
        Choose how you appear and what you see on Clique
      </Text>
      <Text fontSize={"xsl"} mb="1.5">
        You are signed in to clique as
        <span style={{ color: "#3088D9" }}> sparksdclark@gmail.com</span>
      </Text>
      <Link
        color="clique.red"
        fontSize={"smSubHead"}
        _hover={{ textDecoration: "none" }}
      >
        Delete acount
      </Link>
      <Divider mt="1.5" mb="3"></Divider>
      <Text fontSize={"smSubHead"} mb="3">
        Your Clqiue Channel
      </Text>
      <Text fontSize={"subHead"} mb="3.5">
        This is your public presence on Clique. You need your own channel to
        upload videos and go live.
      </Text>
      <Flex>
        <Avatar
          p="0"
          size="md"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />

        <Flex flexDirection={"column"} ml="5" pt="3.5" fontSize={"smSubHead"}>
          <Link
            color="clique.tertiary"
            mb="2"
            _hover={{ textDecoration: "none" }}
          >
            Guru Maraji
          </Link>
          <Link
            mb="2"
            color="clique.tertiary"
            _hover={{ textDecoration: "none" }}
          >
            Create your channel
          </Link>
          <Link
            mb="2"
            color="clique.tertiary"
            _hover={{ textDecoration: "none" }}
          >
            Channel status and settings
          </Link>
          <Link color="clique.red" mb="2" _hover={{ textDecoration: "none" }}>
            Delete acount
          </Link>
        </Flex>
      </Flex>

      <Divider mb="2"></Divider>
      <Text fontSize={"smSubHead"} mb="3">
        Subscriptions
      </Text>
      <Text fontSize={"smSubHead"} mb="3">
        Channels you are subscribed to show on your feed and you have access to
        their videos and live shows.
      </Text>
      <Link color="clique.tertiary" _hover={{ textDecoration: "none" }}>
        View subscriptions
      </Link>
    </Box>
  );
}

export default Account;
