import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { db, auth } from '../../firebase'; // ✅ Combine imports from firebase.js
import { signOut } from 'firebase/auth';


const HomePage = ({ darkMode, toggleDarkMode }) => {
  const { currentUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load courses
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses).slice(0, 3));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const features = [
    'Track your course progress',
    'Get personalized recommendations',
    'Premium courses with certification',
  ];

  const styles = {
    container: {
      padding: '1.5rem',
      backgroundColor: darkMode ? '#111827' : '#ffffff',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      position: 'relative'
    },
    heading: {
      fontSize: '1.875rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: darkMode ? '#60a5fa' : '#1d4ed8'
    },
    subheading: {
      color: darkMode ? '#d1d5db' : '#4b5563',
      fontSize: '1.125rem',
      marginBottom: '1.5rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '2.5rem'
    },
    primaryButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontWeight: '500'
    },
    secondaryButton: {
      backgroundColor: darkMode ? '#374151' : '#f3f4f6',
      color: darkMode ? 'white' : '#2563eb',
      padding: '0.5rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontWeight: '500'
    },
    featureSection: {
      marginBottom: '2.5rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: darkMode ? 'white' : '#1f2937'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      color: darkMode ? '#d1d5db' : '#4b5563'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      justifyContent: 'center'
    },
    checkmark: {
      color: '#10b981'
    },
    courseSection: {
      marginTop: '2rem'
    },
    courseTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: darkMode ? 'white' : '#1f2937'
    },
    courseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    courseCard: {
      backgroundColor: darkMode ? '#1f2937' : 'white',
      boxShadow: darkMode ?
        '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)' :
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '0.5rem',
      padding: '1rem',
      textAlign: 'left',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    courseName: {
      fontWeight: '700',
      fontSize: '1.125rem',
      marginBottom: '0.5rem',
      color: darkMode ? 'white' : '#1f2937'
    },
    courseDescription: {
      color: darkMode ? '#d1d5db' : '#6b7280'
    },
    themeToggle: {
      position: 'fixed',
      top: '1rem',
      right: '4rem',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      border: 'none',
      borderRadius: '50%',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    profileButton: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
      border: 'none',
      borderRadius: '50%',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      overflow: 'hidden'
    },
    profileDropdown: {
      position: 'absolute',
      top: '4rem',
      right: '1rem',
      backgroundColor: darkMode ? '#1f2937' : 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '0.5rem',
      zIndex: 10,
      minWidth: '200px'
    },
    dropdownItem: {
      padding: '0.5rem 1rem',
      color: darkMode ? 'white' : '#1f2937',
      cursor: 'pointer',
      borderRadius: '0.25rem',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: darkMode ? '#374151' : '#f3f4f6'
      }
    }
  };

  if (!currentUser) {
    return (
      <div style={styles.container}>
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.heading}
        >
          Welcome to LearnRoad
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={styles.subheading}
        >
          Please log in to access your personalized courses and features.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={styles.buttonContainer}
        >
          <Link to="/login">
            <button style={styles.primaryButton}>Login</button>
          </Link>
          <Link to="/register">
            <button style={styles.secondaryButton}>Register</button>
          </Link>
        </motion.div>

        <button 
          onClick={toggleDarkMode}
          style={styles.themeToggle}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={toggleDarkMode}
        style={styles.themeToggle}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>

      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          style={styles.profileButton}
          aria-label="Profile menu"
        >
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            currentUser.email?.charAt(0).toUpperCase() || 'U'
          )}
        </button>

        {showProfileDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={styles.profileDropdown}
          >
            <div style={{
              padding: '0.5rem 1rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              marginBottom: '0.5rem'
            }}>
              <p style={{
                fontWeight: '600',
                margin: 0,
                color: darkMode ? 'white' : '#1f2937'
              }}>
                {currentUser.displayName || 'User'}
              </p>
              <p style={{
                fontSize: '0.875rem',
                margin: 0,
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                {currentUser.email}
              </p>
            </div>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div style={styles.dropdownItem}>
                Profile
              </div>
            </Link>
            <div onClick={handleLogout} style={styles.dropdownItem}>
              Logout
            </div>
          </motion.div>
        )}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.heading}
      >
        Welcome back, {currentUser.displayName || 'User'}!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={styles.subheading}
      >
        Your personalized journey to mastering React and modern web development starts here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={styles.buttonContainer}
      >
        <Link to="/courses">
          <button style={styles.secondaryButton}>
            Browse Courses
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={styles.featureSection}
      >
        <h3 style={styles.featureTitle}>Why LearnRoad?</h3>
        <ul style={styles.featureList}>
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              style={styles.featureItem}
              whileHover={{ scale: 1.05 }}
            >
              <span style={styles.checkmark}>✔</span> {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={styles.courseSection}
      >
        <h3 style={styles.courseTitle}>Popular Courses</h3>
        <div style={styles.courseGrid}>
          {courses.map((course) => (
            <motion.div 
              key={course.id}
              style={styles.courseCard}
              whileHover={{ scale: 1.03 }}
            >
              <h4 style={styles.courseName}>{course.title}</h4>
              <p style={styles.courseDescription}>{course.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;