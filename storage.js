import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async(file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const getFileUrl = async(path) => {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
};