import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBV6vnnfRhB89PsOMSiQxWwHfaa6HeGNnM",
    authDomain: "fir-react-blog.firebaseapp.com",
    databaseURL: "https://fir-react-blog.firebaseio.com",
    projectId: "fir-react-blog",
    storageBucket: "fir-react-blog.appspot.com",
    messagingSenderId: "811250927565"
  };
  
  const fbConfig =firebase.initializeApp(config);
  
  export const fireStore = firebase.firestore().settings({ timestampsInSnapshots: true});
    // fbConfig.storage();

  export const fireAuth = firebase.auth();
  export const fireStorege = firebase.storage();
  export default fbConfig;
