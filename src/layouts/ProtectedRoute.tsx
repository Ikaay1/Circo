import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";

import { useToast } from "@chakra-ui/react";
import { logout } from "redux/slices/authSlice";

const ProtectedRoute = (WrappedComponent: any) => {
  return function Auth(props: any) {
    const Router = useRouter();
    const toast = useToast();
    const accessToken = useAppSelector((state) => state.app.userReducer.token);
    const dispatch = useAppDispatch();

    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (!accessToken) {
        Router.push(`/login`);
      } else if (accessToken) {
        // check if the token is expired
        const decodedToken: any = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          toast({
            title: "Session expired ",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });

          dispatch(logout());
          window.location.href = "/login";
        }
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;
