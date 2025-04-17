import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
            return;
        }
        
        setUser(currentUser);
        setName(currentUser.name || '');
        setEmail(currentUser.email || '');
        setPhotoURL(currentUser.photoURL || '');
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            // Update Firebase auth profile if available
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL || null
                });
            }

            // Update local storage
            const updatedUser = {
                ...user,
                name,
                email,
                photoURL
            };
            
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Update users array if exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(u => 
                u.email === user.email ? updatedUser : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            setUser(updatedUser);
            setSuccess('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#1f2937'
            }}>Your Profile</h1>
            
            {error && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    {success}
                </div>
            )}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                {user.photoURL ? (
                    <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginBottom: '1rem'
                        }}
                    />
                ) : (
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: '#6b7280',
                        marginBottom: '1rem'
                    }}>
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
                
                {editMode ? (
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Enter image URL"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem'
                        }}
                    />
                ) : null}
            </div>

            {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.375rem'
                            }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.375rem'
                            }}
                            required
                            disabled={user.provider === 'google'}
                        />
                        {user.provider === 'google' && (
                            <p style={{
                                fontSize: '0.75rem',
                                color: '#6b7280',
                                marginTop: '0.25rem'
                            }}>
                                Google-authenticated users cannot change email
                            </p>
                        )}
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '1.5rem'
                    }}>
                        <button
                            type="submit"
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#e5e7eb',
                                color: '#374151',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '0.25rem'
                        }}>Name</p>
                        <p style={{ color: '#6b7280' }}>{user.name}</p>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '0.25rem'
                        }}>Email</p>
                        <p style={{ color: '#6b7280' }}>{user.email}</p>
                    </div>
                    
                    {user.provider && (
                        <div style={{ marginBottom: '1rem' }}>
                            <p style={{
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.25rem'
                            }}>Signed in with</p>
                            <p style={{ color: '#6b7280' }}>
                                {user.provider === 'google' ? 'Google' : 'Email/Password'}
                            </p>
                        </div>
                    )}
                    
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '1.5rem'
                    }}>
                        <button
                            onClick={() => setEditMode(true)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#fef2f2',
                                color: '#b91c1c',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;