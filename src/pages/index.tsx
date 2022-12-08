import { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import Creative from "@components/landing/Creative";
import Creators from "@components/landing/Creators";
import Exclusive from "@components/landing/Exclusive";
import Footer from "@components/landing/Footer";
import Grow from "@components/landing/Grow";
import Navbar from "@components/landing/Navbar";
import Platform from "@components/landing/Platform";
import Sidebar from "@components/landing/Sidebar";

import type { NextPage } from "next";
import { useAppSelector } from "redux/app/hooks";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const token = useAppSelector((state) => state.app.userReducer.token);
  const router = useRouter();
  
  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, [token, router]);
  return (
    <Box overflowX={"hidden"}>
      <Box
        marginTop={{ base: "2.5rem", sm: "3.5rem", lg: "1.8rem" }}
        px={{ base: "1rem", sm: "2rem", lg: "5rem" }}
      >
        <Navbar setShowSideBar={setShowSideBar} />
      </Box>
      <Box pb={"2.5rem"} px={{ base: "1rem", sm: "2rem", lg: "5rem" }}>
        <Exclusive />
      </Box>
      <Box
        px={{ base: "1rem", sm: "2rem", lg: "5rem" }}
        pt={{ base: "3rem", sm: "3.5rem", lg: "4rem" }}
        pb={{ base: "4.5rem", sm: "5rem", lg: "5.5rem" }}
        bg={"white"}
      >
        <Platform />
      </Box>
      <Box
        px={{ base: "1rem", sm: "2rem", lg: "5rem" }}
        pt={{ base: "3.2rem", sm: "4.2rem", lg: "5.5rem" }}
        pb={{ base: "2rem", sm: "3rem", lg: "4rem" }}
      >
        <Grow />
      </Box>
      <Box
        px={{ base: "1rem", sm: "2rem", lg: "5rem" }}
        pt={{ base: "7rem", lg: "5rem" }}
        pb={{ base: "3.8rem", lg: "3.8rem" }}
      >
        <Creative />
      </Box>
      <Box
        pt={{ base: "3rem", sm: "3.5rem", lg: "4rem" }}
        pb={{ base: "11rem", sm: "12rem", lg: "38rem" }}
        bg={"white"}
      >
        <Creators />
      </Box>
      <Box
        px={{ base: "1rem", sm: "2rem", lg: "5rem" }}
        pt={{ base: "2rem", sm: "3rem", lg: "4rem" }}
        pb={"2rem"}
        bg="#F6EFFC"
      >
        <Footer />
      </Box>
      <Sidebar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </Box>
  );
};

export default Home;
