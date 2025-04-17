import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase";

// Helper for offline error handling
const handleFirestoreError = (error) => {
    if (error.code === 'unavailable') {
        console.warn("Offline mode: Using cached data or showing offline message");
        throw new Error("You're offline. Some features may be limited.");
    }
    throw error;
};

export const createUserProfile = async(userId, userData) => {
    try {
        await setDoc(doc(db, "users", userId), {
            ...userData,
            role: "student",
            createdAt: serverTimestamp(),
            enrolledCourses: []
        });
    } catch (error) {
        handleFirestoreError(error);
    }
};

export const getUserProfile = async(userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
        handleFirestoreError(error);
        return null; // Return null or cached data if available
    }
};

export const enrollUserInCourse = async(userId, courseId) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            enrolledCourses: arrayUnion({
                courseId,
                enrolledAt: serverTimestamp(),
                progress: 0
            })
        });
    } catch (error) {
        handleFirestoreError(error);
    }
};

export const getCurrentUser = () => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

export const logoutUser = async() => {
    try {
        const auth = getAuth();
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};