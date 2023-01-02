import moment from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "redux/app/hooks";
import { usePayForLiveMutation } from "redux/services/livestream/live.service";

import { Button, Text, useToast } from "@chakra-ui/react";

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

  const [payForLive, payInfo] = usePayForLiveMutation();
  const toast = useToast();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);

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
        onClick={async () => {
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
            const res: any = await payForLive({
              eventId: event?.eventId?._id,
              description: `Payment for live event with id ${event?.eventId?._id}`,
              amount: event?.eventId?.fee,
              receiversId: event?.streamerId?._id,
            });
            if (res?.data) {
              router.push(`/stream/${event?.eventId?._id}`);
              toast({
                title: "Payment Successful",
                description: "You have successfully paid for this event",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            } else {
              toast({
                title: "Error",
                description: res?.error
                  ? res.error?.data?.message
                  : "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
          }

          NProgress.done();
        }}
        bg="clique.base"
        color="clique.white"
        rounded={"full"}
        colorScheme="purple"
        isLoading={payInfo.isLoading}
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
