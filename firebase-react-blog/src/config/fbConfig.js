import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "fir-react-blog.firebaseapp.com",
    databaseURL: "https://fir-react-blog.firebaseio.com",
    projectId: "fir-react-blog",
    storageBucket: "fir-react-blog.appspot.com",
    messagingSenderId: "811250927565"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase;