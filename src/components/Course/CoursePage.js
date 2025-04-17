import React, { useState, useEffect } from 'react';
import { getCourses } from '../../helpers/courses';
import CourseGrid from './CourseGrid';

const SkeletonCard = () => ( <
    div className = "bg-white p-4 rounded-lg shadow animate-pulse" >
    <
    div className = "h-40 bg-gray-300 rounded mb-4" > < /div> <
    div className = "h-4 bg-gray-300 rounded w-3/4 mb-2" > < /div> <
    div className = "h-4 bg-gray-300 rounded w-1/2" > < /div> <
    /div>
);

const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async() => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return ( <
        div className = "p-6" >
        <
        h1 className = "text-2xl font-bold mb-4" > All Courses < /h1> {
            loading ? ( <
                div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" > {
                    [...Array(6)].map((_, index) => ( <
                        SkeletonCard key = { index }
                        />
                    ))
                } <
                /div>
            ) : ( <
                CourseGrid courses = { courses }
                />
            )
        } <
        /div>
    );
};

export default CoursePage;