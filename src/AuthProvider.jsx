import { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext({
  currentUser: null,
  loading: true,
  error: null,
  isOnline: true,
});

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    currentUser: null,
    loading: true,
    error: null,
    isOnline: true, // Start with true to avoid flash of offline state
  });

  useEffect(() => {
    // More reliable online status detection
    const updateOnlineStatus = () => {
      setState(prev => ({ ...prev, isOnline: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setState({
          currentUser: user,
          loading: false,
          error: null,
          isOnline: navigator.onLine, // Update status on auth change
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
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      unsubscribe();
    };
  }, []);

  // Only show loading spinner if we're truly loading and online
  if (state.loading && state.isOnline) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show offline message only when definitely offline
  if (!state.isOnline) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-yellow-600">
          You're currently offline. Some features may be limited.
        </p>
        {/* Optionally show cached content here */}
      </div>
    );
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};