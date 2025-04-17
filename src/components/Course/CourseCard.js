import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseCard = ({ course = {} }) => {
    const safeCourse = {
        id: course.id || '',
        title: course.title || 'Untitled Course',
        description: course.description || 'No description available',
        image: course.image || 'https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        duration: course.duration || 'Duration not specified',
        level: course.level || 'Level not specified',
        category: course.category || 'General'
    };

    const [hovered, setHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    // CSS styles
    const styles = {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            width: '240px',
            minWidth: '240px',
            marginRight: '16px',
            position: 'relative',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            height: '320px',
            display: 'flex',
            flexDirection: 'column'
        },
        imageContainer: {
            position: 'relative',
            overflow: 'hidden',
            height: '120px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            position: 'absolute',
            top: 0,
            left: 0
        },
        fallbackImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '15px',
            opacity: 0.7
        },
        categoryBadge: {
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: '600',
            color: '#4f46e5',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 2
        },
        content: {
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)'
        },
        title: {
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '8px',
            color: '#1f2937',
            lineHeight: '1.3',
            minHeight: '36px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        },
        description: {
            color: '#6b7280',
            marginBottom: '12px',
            fontSize: '12px',
            lineHeight: '1.4',
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        },
        metaContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '6px'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px'
        },
        metaIcon: {
            marginRight: '4px',
            color: '#4f46e5',
            fontSize: '10px'
        },
        button: {
            backgroundColor: hovered ? '#4338ca' : '#4f46e5',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '12px',
            width: '100%',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered ? '0 2px 8px rgba(79, 70, 229, 0.3)' : '0 1px 4px rgba(79, 70, 229, 0.2)',
            marginTop: 'auto'
        },
        buttonIcon: {
            marginLeft: '6px',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'translateX(2px)' : 'none',
            fontSize: '12px'
        }
    };

    return ( <
        motion.div style = { styles.card }
        whileHover = {
            {
                scale: 1.03,
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)'
            }
        }
        transition = {
            { duration: 0.2 } } >
        <
        div style = { styles.imageContainer } > {!imageError ? ( <
                img src = { safeCourse.image }
                alt = { safeCourse.title }
                style = {
                    {
                        ...styles.image,
                            transform: hovered ? 'scale(1.05)' : 'scale(1)'
                    }
                }
                onError = {
                    () => setImageError(true) }
                />
            ) : ( <
                img src = "https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
                alt = "Course placeholder"
                style = { styles.fallbackImage }
                />
            )
        } <
        div style = { styles.categoryBadge } > { safeCourse.category } <
        /div> <
        /div>

        <
        div style = { styles.content } >
        <
        h3 style = { styles.title } > { safeCourse.title } < /h3>

        <
        p style = { styles.description } > { safeCourse.description } <
        /p>

        <
        div style = { styles.metaContainer } >
        <
        div style = { styles.metaItem } >
        <
        span style = { styles.metaIcon } > ⏱️ < /span> { safeCourse.duration } <
        /div> <
        div style = { styles.metaItem } >
        <
        span style = { styles.metaIcon } > 📊 < /span> { safeCourse.level } <
        /div> <
        /div>

        <
        Link to = { `/view-course/${safeCourse.id}` }
        style = {
            { textDecoration: 'none' } } >
        <
        button style = { styles.button }
        onMouseEnter = {
            () => setHovered(true) }
        onMouseLeave = {
            () => setHovered(false) } >
        View Course <
        span style = { styles.buttonIcon } > → < /span> <
        /button> <
        /Link> <
        /div> <
        /motion.div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        duration: PropTypes.string,
        level: PropTypes.string,
        category: PropTypes.string
    }),
};

export default CourseCard;