import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCixuF9r0M04ExKHr7xV4lxyP1eqmPh83w",
  authDomain: "trove-backend.firebaseapp.com",
  databaseURL: "https://trove-backend.firebaseio.com/",
  storageBucket: "trove-backend.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export function writeUser(user) {
  firebase
    .database()
    .ref(`users/${user.id}`)
    .set({
      nickname: "anon123",
      age: 29
    });
}

export function loadUser(userId) {
  return firebase
    .database()
    .ref(`users/${userId}`)
    .once('value');
}
