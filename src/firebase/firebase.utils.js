import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    
        apiKey: "AIzaSyDtACo7O4Vkz_Pl1VFmSWbkORCwFiGNhVc",
        authDomain: "e-commerce-db-1994.firebaseapp.com",
        databaseURL: "https://e-commerce-db-1994.firebaseio.com",
        projectId: "e-commerce-db-1994",
        storageBucket: "e-commerce-db-1994.appspot.com",
        messagingSenderId: "433326944121",
        appId: "1:433326944121:web:80d45961389e7d94e709a8",
        measurementId: "G-H2V2K80MQK"
      
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const { displayName, email } = userAuth;
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
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;