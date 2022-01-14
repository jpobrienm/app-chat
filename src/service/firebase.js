import firebase from 'firebase/compat/app';
import "firebase/compat/database"
import 'firebase/compat/auth';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyDmUMGDnIwDOlsdA3I4UU1kXoVhI7fIyHE",
    authDomain: "my-chatty-4bdec.firebaseapp.com",
    projectId: "my-chatty-4bdec",
    storageBucket: "my-chatty-4bdec.appspot.com",
    messagingSenderId: "876014965328",
    appId: "1:876014965328:web:ceb721b62d5a625b79f755"
  });

export const google = new firebase.auth.GoogleAuthProvider();
export const github = new firebase.auth.GithubAuthProvider();
export const database = firebase.database();

export const readChats = () =>{
    let abc = [];
    database.ref("chats").on("value", snapshot => {
        snapshot.forEach(snap => {
            abc.push(snap.val())
        });
        return abc;
    });
}

export const writeChats = (message) =>{
    return database.ref("chats").push({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    });
}
