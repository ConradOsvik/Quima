import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZ8waXuFbeaff0SqxqphqArFgPywFIg5I",
    authDomain: "quima-6444d.firebaseapp.com",
    projectId: "quima-6444d",
    storageBucket: "quima-6444d.appspot.com",
    messagingSenderId: "547917025832",
    appId: "1:547917025832:web:2acd9fdbbe38c70c661b1d",
    measurementId: "G-DPVM6L55VZ",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export default firebase;
