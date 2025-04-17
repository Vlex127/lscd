import React, { useState } from 'react';
import CreateCourseForm from './CreateCourseForm';
import { createCourse } from '../../helpers/courses';

const CreateCoursePage = () => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');

        const handleCreateCourse = async(courseData) => {
            setLoading(true);
            setError('');
            try {
                const courseId = await createCourse(courseData);
                console.log('Course created with ID:', courseId);
                // Navigate, toast, or reset if needed
            } catch (err) {
                console.error('Error creating course:', err);
                setError('Failed to create course');
            } finally {
                setLoading(false);
            }
        };

        return ( <
            div >
            <
            h1 > Create a New Course < /h1> {
                error && < p style = {
                        { color: 'red' } } > { error } < /p>} { loading ? < p > Loading... < /p> : <CreateCourseForm onSubmit={handleCreateCourse} / > } <
                    /div>
            );
        };

        export default CreateCoursePage;