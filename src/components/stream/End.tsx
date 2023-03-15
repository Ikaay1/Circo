import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { useEndStreamMutation } from "redux/services/livestream/live.service";
import { clearWebCamStream } from "redux/slices/streamSlice";

function End() {
  const [endStream, endInfo] = useEndStreamMutation();
  const streamDetails = useAppSelector(
    (state) => state?.app?.stream?.webCamStream
  );
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Button
      pos={"absolute"}
      bottom={"30px"}
      left={"50%"}
      transform={"translateX(-50%)"}
      mt="80px"
      rounded="full"
      onClick={async () => {
        const endRes: any = await endStream(streamDetails?._id);
        if (endRes?.data?.data) {
          toast({
            title: "Stream Ended",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });

          dispatch(clearWebCamStream());

          router.push("/golive");

          //turn of user  camera
        } else {
          toast({
            title: "Error",
            description: endRes?.error?.data?.message ?? "Something went wrong",
            status: "error",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
        }
      }}
      isLoading={endInfo.isLoading}
      bg={"clique.dangerRed"}
      color="white"
      colorScheme={"red"}
      fontFamily={"Poppins"}
    >
      End Live Stream
    </Button>
  );
}

export default End;
