import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Sign up new users
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in existing users
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const logout = () => {
    return signOut(auth);
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};