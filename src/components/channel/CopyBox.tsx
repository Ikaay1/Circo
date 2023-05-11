import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { useAppSelector } from "redux/app/hooks";

import { Box, Icon, Image, Text } from "@chakra-ui/react";
import { shareData } from "@constants/utils";
import CopyLinkIcon from "@icons/CopyLinkIcon";

import ChannelInput from "./ChannelInput";

const CopyBox = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const profile = useAppSelector((state) => state.app.userReducer.userProfile);
  const router = useRouter();
  const handleCopy = (e: string) => {
    navigator.clipboard.writeText(e);
    setIsCopied(true);
  };

  useEffect(() => {
    if (!profile?._id) {
      router.push("/login");
    }
  }, [profile?._id, router]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <Box p="1.5rem" backgroundColor={"clique.black2"} pb="2rem">
      <Text fontSize="smHead" lineHeight="32px" color="clique.white">
        Share
      </Text>
      <Box mt="2rem" display="flex" alignItems={"center"}>
        {shareData.map((icon) => (
          <Box
            cursor={"pointer"}
            onClick={() => {
              if (link.includes("channel")) {
                if (icon === "whatsapp") {
                  window.open(
                    `https://wa.me/?text=Hi%20use%20this%20link%20to%20checkout%20my%20circo%20channel%20${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                } else if (icon === "ig") {
                  window.open(
                    `https://www.instagram.com/direct/t/340282366841710300949128165346056853440`
                  );
                } else if (icon === "twitter") {
                  window.open(
                    `https://twitter.com/intent/tweet?text=Hi%20use%20this%20link%20to%20checkout%20my%20circo%20channel%20${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                } else if (icon === "facebook") {
                  window.open(
                    `https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                }
              } else {
                if (icon === "whatsapp") {
                  window.open(
                    `https://wa.me/?text=Hi%20use%20this%20link%20to%20checkout%20my%20circo%20video%20${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                } else if (icon === "ig") {
                  window.open(
                    `https://www.instagram.com/direct/t/340282366841710300949128165346056853440`
                  );
                } else if (icon === "twitter") {
                  window.open(
                    `https://twitter.com/intent/tweet?text=Hi%20use%20this%20link%20to%20checkout%20my%20circo%20video%20${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                } else if (icon === "facebook") {
                  window.open(
                    `https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_FEURL}${link}`
                  );
                }
              }
            }}
            w="85px"
            h="85px"
            borderRadius={"50%"}
            backgroundColor="clique.secondaryGrey1"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mr="1.3rem"
            key={icon}
          >
            <Image
              w="50px"
              h="50px"
              objectFit={"cover"}
              src={`/assets/${icon}.png`}
              alt=""
            />
          </Box>
        ))}
      </Box>
      <Box mt="3rem" height={"55px"} position={"relative"}>
        <ChannelInput
          isReadonly
          value={`${process.env.NEXT_PUBLIC_FEURL}${link}`}
        />
        <Box
          position="absolute"
          top="50%"
          zIndex={5}
          right={"3.5%"}
          transform={"translateY(-50%)"}
          fontSize="sm"
          color="clique.secondaryGrey2"
          cursor="pointer"
          onClick={() => {
            handleCopy(`${process.env.NEXT_PUBLIC_FEURL}${link}`);
          }}
          bg="clique.secondaryGrey1"
        >
          {isCopied ? "Copied" : <Icon as={CopyLinkIcon} />}
        </Box>
      </Box>
    </Box>
  );
};

export default CopyBox;
