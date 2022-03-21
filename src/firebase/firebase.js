import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpZzEujkBvCw83wnfN4YvDqDxwyWOGI-o",

  authDomain: "reactnative-train.firebaseapp.com",

  projectId: "reactnative-train",

  storageBucket: "reactnative-train.appspot.com",

  messagingSenderId: "250334677748",

  appId: "1:250334677748:web:46d3d159bbe92b3b6daca1",

  measurementId: "G-ZM9VBMMEHB",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//firebase.initializeApp(firebaseConfig);

export { firebase };
