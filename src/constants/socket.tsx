import { store } from "redux/app/store";
import io from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BASEURL!, {
  forceNew: false,
  query: {
    token: store.getState().app.userReducer.token,
  },
});
