// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7hQ_cSbr5OrORuaJtvUWcVD7bC4Ig8ls",
  authDomain: "clique-client.firebaseapp.com",
  projectId: "clique-client",
  storageBucket: "clique-client.appspot.com",
  messagingSenderId: "219102668723",
  appId: "1:219102668723:web:ed9b962b64796b879b0dc6",
  measurementId: "G-8LW8RHDLK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export const customGetToken = (setTokenFound: any) => {
  return getToken(messaging, {
    vapidKey:
      "BJUohSRLcnnvvnpKhNArVAH9Ry7Bc8DudcsfsUF0KYDv_1RD7zhvGOxJXb2kFsiR2RyAmsdGCJg8zMvNqm5Xh9E",
  })
    .then((currentToken: any) => {
      if (currentToken) {
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err: any) => {
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
