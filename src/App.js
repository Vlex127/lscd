import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/Pages/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProfilePage from './components/Profile/ProfilePage';
import CoursePage from './components/Course/CoursePage';
import NotFoundPage from './components/Pages/NotFoundPage';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import CreateCoursePage from './components/Course/CreateCoursePage';
import ViewCourse from './components/Course/ViewCourse'; // Ensure correct path

import CourseCard from './components/Course/CourseCard';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    // Sample course data to display in CourseCard
    const sampleCourse = {
        id: '1',
        title: 'Learn React',
        description: 'Master React and build amazing web apps.',
        image: 'https://via.placeholder.com/300x160',
        duration: '3 hours',
        level: 'Intermediate',
    };

    return ( <
            AuthProvider >
            <
            Router >
            <
            div className = { `min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-white'}` } >
            <
            Header darkMode = { darkMode }
            toggleDarkMode = { toggleDarkMode }
            /> <
            main className = "flex-grow p-4" >
            <
            Routes >
            <
            Route path = "/"
            element = { < HomePage darkMode = { darkMode }
                toggleDarkMode = { toggleDarkMode }
                />}  / >
                <
                Route
                path = "/login"
                element = { < Login darkMode = { darkMode }
                    />}  / >
                    <
                    Route
                    path = "/register"
                    element = { < Register darkMode = { darkMode }
                        />}  / >
                        <
                        Route
                        path = "/profile"
                        element = { < ProfilePage darkMode = { darkMode }
                            />}  / >
                            <
                            Route
                            path = "/courses"
                            element = { < CoursePage darkMode = { darkMode }
                                />}  / >
                                <
                                Route
                                path = "/create-course"
                                element = { < CreateCoursePage / > }
                                /> <
                                Route
                                path = "/view-course/:id"
                                element = { < ViewCourse / > }
                                /> <
                                Route
                                path = "*"
                                element = { < NotFoundPage darkMode = { darkMode }
                                    />}  / >
                                    <
                                    /Routes> < /
                                    main > <
                                    Footer darkMode = { darkMode }
                                    /> < /
                                    div > <
                                    /Router> < /
                                    AuthProvider >
                                );
                            }

                            export default App;