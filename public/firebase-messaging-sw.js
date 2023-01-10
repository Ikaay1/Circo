// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyB7hQ_cSbr5OrORuaJtvUWcVD7bC4Ig8ls",
  authDomain: "clique-client.firebaseapp.com",
  projectId: "clique-client",
  storageBucket: "clique-client.appspot.com",
  messagingSenderId: "219102668723",
  appId: "1:219102668723:web:ed9b962b64796b879b0dc6",
  measurementId: "G-8LW8RHDLK2",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
