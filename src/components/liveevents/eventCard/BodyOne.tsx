import { Button, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/app/hooks";
const NProgress = require("nprogress");

function BodyOne({
  setStep,
  event,
}: {
  setStep: (step: number) => void;
  event: any;
}) {
  const router = useRouter();
  const userProfile = useAppSelector(
    (store) => store.app.userReducer.userProfile
  );
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

          if (
            event?.eventId?.fee === 0 ||
            event?.eventId?.fee === "0" ||
            !event?.eventId?.fee ||
            event?.paid.includes(userProfile?._id) ||
            event?.streamerId?._id === userProfile?._id
          ) {
            router.push(`/stream/${event?.eventId?._id}`);
          } else {
            //call paystack
          }

          NProgress.done();
        }}
        bg="clique.base"
        color="clique.white"
        rounded={"full"}
        colorScheme="purple"
      >
        {event?.eventId?.fee === 0 ||
        event?.eventId?.fee === "0" ||
        !event?.eventId?.fee ||
        event?.paid.includes(userProfile?._id) ||
        event?.streamerId?._id === userProfile?._id
          ? "Join Stream"
          : `Purchase Ticket`}
      </Button>
    </>
  );
}

export default BodyOne;
