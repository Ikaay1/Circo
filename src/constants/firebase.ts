// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);

// key pair for messaging
// BJUohSRLcnnvvnpKhNArVAH9Ry7Bc8DudcsfsUF0KYDv_1RD7zhvGOxJXb2kFsiR2RyAmsdGCJg8zMvNqm5Xh9E
