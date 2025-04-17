import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            if (!formData.name || !formData.email || !formData.password) {
                throw new Error('All fields are required');
            }

            // Register user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Update user display name
            await updateProfile(user, {
                displayName: formData.name
            });

            // Store minimal user data in localStorage
            const userData = {
                uid: user.uid,
                name: formData.name,
                email: user.email
            };

            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            setSuccess('Registration successful! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters');
            } else {
                setError(err.message);
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // The Google sign-in logic can stay unchanged
    const handleGoogleSignUp = async() => {
        setGoogleLoading(true);
        setError('');
        setSuccess('');

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                provider: 'google'
            };

            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            setSuccess('Google registration successful! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setGoogleLoading(false);
        }
    };


    return ( <
        div style = {
            {
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }
        } >
        <
        div style = {
            {
                width: '100%',
                maxWidth: '28rem',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            }
        } >
        <
        div style = {
            {
                backgroundColor: '#2563eb',
                padding: '1.5rem',
                color: 'white',
                textAlign: 'center'
            }
        } >
        <
        h2 style = {
            {
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.25rem'
            }
        } > Create Account < /h2> <
        p style = {
            {
                color: '#bfdbfe',
                fontSize: '0.875rem'
            }
        } > Join our community < /p> < /
        div >

        <
        div style = {
            { padding: '1.5rem' }
        } > {
            error && ( <
                div style = {
                    {
                        marginBottom: '1rem',
                        backgroundColor: '#fee2e2',
                        borderLeft: '4px solid #ef4444',
                        color: '#b91c1c',
                        padding: '1rem',
                        borderRadius: '0.25rem'
                    }
                } >
                <
                p > { error } < /p> < /
                div >
            )
        }

        {
            success && ( <
                div style = {
                    {
                        marginBottom: '1rem',
                        backgroundColor: '#dcfce7',
                        borderLeft: '4px solid #22c55e',
                        color: '#15803d',
                        padding: '1rem',
                        borderRadius: '0.25rem'
                    }
                } >
                <
                p > { success } < /p> < /
                div >
            )
        }

        <
        button onClick = { handleGoogleSignUp }
        style = {
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'white',
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s',
                ...(googleLoading && {
                    opacity: 0.75,
                    cursor: 'not-allowed'
                })
            }
        }
        disabled = { googleLoading } > {
            googleLoading ? ( <
                >
                <
                span style = {
                    {
                        display: 'inline-block',
                        width: '1rem',
                        height: '1rem',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        borderTopColor: 'white',
                        animation: 'spin 1s linear infinite',
                        marginRight: '0.5rem'
                    }
                } > < /span>
                Signing up with Google... <
                />
            ) : ( <
                >
                <
                img src = "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt = "Google logo"
                style = {
                    {
                        width: '18px',
                        height: '18px'
                    }
                }
                />
                Continue with Google <
                />
            )
        } <
        /button>

        <
        div style = {
            {
                display: 'flex',
                alignItems: 'center',
                margin: '1.5rem 0',
                color: '#6b7280',
                fontSize: '0.875rem'
            }
        } >
        <
        div style = {
            {
                flex: 1,
                height: '1px',
                backgroundColor: '#e5e7eb'
            }
        } > < /div> <
        span style = {
            { padding: '0 1rem' }
        } > OR < /span> <
        div style = {
            {
                flex: 1,
                height: '1px',
                backgroundColor: '#e5e7eb'
            }
        } > < /div> < /
        div >

        <
        form onSubmit = { handleSubmit }
        style = {
            {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }
        } >
        <
        div style = {
            {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }
        } >
        <
        label style = {
            {
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
            }
        } > Full Name < /label> <
        input type = "text"
        name = "name"
        value = { formData.name }
        onChange = { handleChange }
        style = {
            {
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '0.875rem',
                transition: 'border-color 0.2s'
            }
        }
        placeholder = "John Doe"
        required /
        >
        <
        /div>

        <
        div style = {
            {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }
        } >
        <
        label style = {
            {
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
            }
        } > Email < /label> <
        input type = "email"
        name = "email"
        value = { formData.email }
        onChange = { handleChange }
        style = {
            {
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '0.875rem',
                transition: 'border-color 0.2s'
            }
        }
        placeholder = "your@email.com"
        required /
        >
        <
        /div>

        <
        div style = {
            {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }
        } >
        <
        label style = {
            {
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
            }
        } > Password < /label> <
        input type = "password"
        name = "password"
        value = { formData.password }
        onChange = { handleChange }
        style = {
            {
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '0.875rem',
                transition: 'border-color 0.2s'
            }
        }
        placeholder = "••••••••"
        required /
        >
        <
        /div>

        <
        button type = "submit"
        disabled = { isLoading }
        style = {
            {
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s',
                ...(isLoading && {
                    opacity: 0.75,
                    cursor: 'not-allowed'
                })
            }
        } > {
            isLoading ? ( <
                >
                <
                span style = {
                    {
                        display: 'inline-block',
                        width: '1rem',
                        height: '1rem',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        borderTopColor: 'white',
                        animation: 'spin 1s linear infinite',
                        marginRight: '0.5rem'
                    }
                } > < /span>
                Creating Account... <
                />
            ) : 'Register'
        } <
        /button> < /
        form >

        <
        div style = {
            {
                marginTop: '1.5rem',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.875rem'
            }
        } >
        <
        p >
        Already have an account ? { ' ' } <
        Link to = "/login"
        style = {
            {
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '500'
            }
        } >
        Sign In <
        /Link> < /
        p > <
        /div> < /
        div > <
        /div>

        <
        style > { `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            ` } < /style> < /
        div >
    );
};

export default Register;