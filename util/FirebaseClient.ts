import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCixuF9r0M04ExKHr7xV4lxyP1eqmPh83w",
  authDomain: "trove-backend.firebaseapp.com",
  databaseURL: "https://trove-backend.firebaseio.com/",
  storageBucket: "trove-backend.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export interface User {
  nickname: string;
  age: number;
}

export function writeUser(userId: string, user: User) {
  firebase
    .database()
    .ref(`users/${userId}`)
    .set(user);
}

export async function loadUser(userId: string): Promise<User> {
  const data = await firebase
    .database()
    .ref(`users/${userId}`)
    .once("value");
  return data.val();
}
