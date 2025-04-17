import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const ViewCourse = () => {
        const { id } = useParams();
        const [course, setCourse] = useState(null);
        const [lessons, setLessons] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchCourseData = async() => {
                setLoading(true);

                // Fetch course
                const { data: courseData, error: courseError } = await supabase
                    .from('courses')
                    .select('*')
                    .eq('id', id)
                    .single();

                // Fetch lessons
                const { data: lessonsData, error: lessonsError } = await supabase
                    .from('lessons')
                    .select('*')
                    .eq('course_id', id)
                    .order('order_index', { ascending: true });

                if (courseError) console.error('Course error:', courseError);
                if (lessonsError) console.error('Lessons error:', lessonsError);

                setCourse(courseData);
                setLessons(lessonsData);
                setLoading(false);
            };

            fetchCourseData();
        }, [id]);

        if (loading) {
            return <div style = {
                { textAlign: 'center', padding: '5rem 0', fontSize: '1.125rem', fontWeight: '500' } } > Loading course content... < /div>;
        }

        if (!course) {
            return <div style = {
                { textAlign: 'center', padding: '5rem 0', color: 'red' } } > Course not found. < /div>;
        }

        return ( <
            div style = {
                {
                    maxWidth: '1024px',
                    margin: '0 auto',
                    padding: '2rem',
                    backgroundColor: '#f9f9f9'
                }
            } >
            <
            h1 style = {
                {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '1rem'
                }
            } > { course.title } <
            /h1> <
            p style = {
                {
                    fontSize: '1.125rem',
                    color: '#666',
                    marginBottom: '2rem'
                }
            } > { course.description } <
            /p>

            <
            div style = {
                {
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '1.5rem'
                }
            } >
            <
            h2 style = {
                {
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '1rem'
                }
            } >
            Lessons <
            /h2>

            {
                lessons.length === 0 && < p style = {
                    {
                        fontSize: '1.125rem',
                        color: '#e74c3c',
                        textAlign: 'center',
                        marginTop: '2rem'
                    }
                } > No lessons available
                for this course. < /p>}

                <
                ul style = {
                        { listStyle: 'none', paddingLeft: '0' } } > {
                        lessons.map((lesson, index) => ( <
                            li key = { lesson.id }
                            style = {
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: '1rem',
                                    marginBottom: '1rem'
                                }
                            } >
                            <
                            div >
                            <
                            span style = {
                                {
                                    fontSize: '1.2rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }
                            } > { index + 1 }. { lesson.title } <
                            /span> <
                            div style = {
                                {
                                    fontSize: '0.9rem',
                                    color: '#777'
                                }
                            } > { lesson.duration || 'No duration' } <
                            /div> <
                            /div> <
                            Link to = { `/courses/${id}/lessons/${lesson.id}` }
                            style = {
                                {
                                    fontSize: '0.9rem',
                                    color: '#3b82f6',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease'
                                }
                            }
                            onMouseOver = {
                                (e) => e.target.style.color = '#1e40af' }
                            onMouseOut = {
                                (e) => e.target.style.color = '#3b82f6' } >
                            View Lesson <
                            /Link> <
                            /li>
                        ))
                    } <
                    /ul> <
                    /div> <
                    /div>
            );
        };

        export default ViewCourse;