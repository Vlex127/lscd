// src/context/AuthContext.js
import { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Create context
const AuthContext = createContext({
    currentUser: null,
    loading: true,
    error: null,
    isOnline: true,
});

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        currentUser: null,
        loading: true,
        error: null,
        isOnline: navigator.onLine,
    });

    useEffect(() => {
        const handleOnline = () => setState(prev => ({...prev, isOnline: true }));
        const handleOffline = () => setState(prev => ({...prev, isOnline: false }));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setState({
                    currentUser: user,
                    loading: false,
                    error: null,
                    isOnline: navigator.onLine,
                });
            },
            (err) => {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: err,
                }));
            }
        );

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            unsubscribe();
        };
    }, []);

    return ( <
        AuthContext.Provider value = { state } > { children } <
        /AuthContext.Provider>
    );
};

// Export as named exports
export { AuthProvider, AuthContext };