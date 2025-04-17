import React, { useState, useEffect } from 'react';
import { getCourses } from '../../helpers/courses';
import CourseCard from './CourseCard';

const SkeletonCard = () => {
    return ( <
        div style = {
            {
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'pulse 1.5s infinite'
            }
        } >
        <
        div style = {
            {
                height: '160px',
                backgroundColor: '#d1d5db',
                borderRadius: '8px'
            }
        } > < /div> <
        div style = {
            {
                height: '16px',
                width: '75%',
                backgroundColor: '#d1d5db',
                borderRadius: '6px'
            }
        } > < /div> <
        div style = {
            {
                height: '16px',
                width: '50%',
                backgroundColor: '#d1d5db',
                borderRadius: '6px'
            }
        } > < /div> <
        /div>
    );
};

const CourseGrid = () => {
        const [courses, setCourses] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchCourses = async() => {
                const coursesData = await getCourses();
                setCourses(coursesData);
                setLoading(false);
            };
            fetchCourses();
        }, []);

        const gridStyles = {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '10px',
        };

        return ( <
            div style = { gridStyles } > {
                loading ?
                [...Array(6)].map((_, index) => < SkeletonCard key = { index }
                    />): courses.map(course => ( <
                        CourseCard key = { course.id }
                        course = { course }
                        />
                    ))
                } <
                /div>
            );
        };

        export default CourseGrid;