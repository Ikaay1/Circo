import { Button, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
const NProgress = require("nprogress");

function BodyOne({
  setStep,
  event,
}: {
  setStep: (step: number) => void;
  event: any;
}) {
  const router = useRouter();
  return (
    <>
      <Text
        mt="20px"
        color={"clique.base"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"smSubHead"}
        lineHeight={"1.3"}
        textTransform={"uppercase"}
        mr="5px"
      >
        {event?.eventId?.title}
        {": "}
        {moment(event?.eventId?.schedule).format("MMM Do YYYY h:mm a")}
      </Text>
      <Text
        mt="20px"
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"smSubHead"}
        lineHeight={"1.5"}
        mr="5px"
      >
        <Text color={"clique.base"} as="span">
          About:
        </Text>{" "}
        {event?.eventId?.description}
      </Text>
      <Button
        mt={"50px"}
        w="full"
        size="lg"
        onClick={() => {
          NProgress.start();
          if (event?.eventId?.fee === 0) {
            router.push(`/stream/${event?.eventId?._id}`);
          }
          4;
          NProgress.done();
        }}
        bg="clique.base"
        color="clique.white"
        rounded={"full"}
        colorScheme="purple"
      >
        {event?.eventId?.fee ? `Purchase Ticket` : "Join Stream"}
      </Button>
    </>
  );
}

export default BodyOne;
