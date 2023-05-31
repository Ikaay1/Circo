import { Button, useToast } from "@chakra-ui/react";
import Color from "@constants/color";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { useEndStreamMutation } from "redux/services/livestream/live.service";
import { clearWebCamStream } from "redux/slices/streamSlice";

function End({
  id,
  setEndStreamDetails,
}: {
  id: string;
  setEndStreamDetails: any;
}) {
  const [endStream, endInfo] = useEndStreamMutation();
  const streamDetails = useAppSelector(
    (state) => state?.app?.stream?.webCamStream
  );
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const endRes: any = await endStream(id);
        if (endRes?.data?.data) {
          toast({
            title: "Stream Ended",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });

          // dispatch(clearWebCamStream());
          setEndStreamDetails(endRes?.data?.data);
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
      fontFamily={"Poppins"}
      mt={"30px"}
      w="120px"
      size="md"
      color={Color().blackAndWhite}
      border={"1px solid "}
      borderColor="clique.red"
      rounded={"full"}
      fontWeight={400}
      colorScheme="red"
    >
      End
    </Button>
  );
}

export default End;
