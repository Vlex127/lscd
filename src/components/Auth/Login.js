import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        provider: 'email',
      };

      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('Account disabled');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        default:
          setError('Failed to sign in. Please try again.');
          console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        provider: 'google',
      };

      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>

        {error && (
          <div className="auth-error">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="text-link">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" id="remember-me" />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="btn-loader">
                <span className="spinner"></span> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="google-auth-btn"
          disabled={googleLoading}
        >
          {googleLoading ? (
            <span className="btn-loader">
              <span className="spinner"></span> Signing in with Google...
            </span>
          ) : (
            <>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google logo"
                className="google-logo"
              />
              Continue with Google
            </>
          )}
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
