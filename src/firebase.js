import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Enable persistence
(async() => {
    try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Auth persistence enabled");

        await enableIndexedDbPersistence(db);
        console.log("Firestore persistence enabled");
    } catch (err) {
        console.warn("Persistence error:", err);
        if (err.code === 'failed-precondition') {
            console.warn("Multiple tabs open - persistence only works in one tab");
        } else if (err.code === 'unimplemented') {
            console.warn("Browser doesn't support all persistence features");
        }
    }
})();

export { app, auth, db, storage, analytics };