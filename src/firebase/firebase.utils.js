import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCbxp0DoZlC4Rh22Zoa5bcP6rEkoJYFZAQ",
    authDomain: "fryket-faa11.firebaseapp.com",
    databaseURL: "https://fryket-faa11.firebaseio.com",
    projectId: "fryket-faa11",
    storageBucket: "fryket-faa11.appspot.com",
    messagingSenderId: "143438570816",
    appId: "1:143438570816:web:be603f1c6042f2dd0646a5",
    measurementId: "G-XV3ZS29SDE"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;