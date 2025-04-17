import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore';

// Add a new document
export const addDocument = async(collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

// Get all documents in a collection
export const getDocuments = async(collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a document
export const updateDocument = async(collectionName, docId, data) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
};

// Delete a document
export const deleteDocument = async(collectionName, docId) => {
    await deleteDoc(doc(db, collectionName, docId));
};