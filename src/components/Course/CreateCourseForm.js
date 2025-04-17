import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreateCourseForm = ({ onSubmit }) => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        image: '',
        duration: '',
        level: '',
        published: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (onSubmit) {
                await onSubmit(courseData);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // CSS styles
    const styles = {
        container: {
            maxWidth: '42rem',
            margin: '0 auto',
            padding: '1.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        heading: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
        },
        label: {
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
        },
        input: {
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            outline: 'none',
        },
        inputFocus: {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
            ringWidth: '2px',
            ringColor: '#6366f1',
        },
        textarea: {
            minHeight: '6rem',
            resize: 'vertical',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
        },
        checkboxContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        checkbox: {
            width: '1rem',
            height: '1rem',
            color: '#6366f1',
            borderColor: '#d1d5db',
            borderRadius: '0.25rem',
            marginRight: '0.5rem',
        },
        button: {
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            fontWeight: '500',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.2s ease',
        },
        buttonHover: {
            transform: 'scale(1.02)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        buttonDisabled: {
            opacity: '0.7',
            cursor: 'not-allowed',
        },
        imagePreview: {
            height: '8rem',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            marginTop: '0.5rem',
        },
        spinner: {
            animation: 'spin 1s linear infinite',
            marginRight: '0.5rem',
        },
    };

    // Media query for larger screens
    if (window.innerWidth >= 768) {
        styles.grid.gridTemplateColumns = '1fr 1fr';
    }

    return ( <
        motion.div initial = {
            { opacity: 0, y: 20 } }
        animate = {
            { opacity: 1, y: 0 } }
        transition = {
            { duration: 0.3 } }
        style = { styles.container } >
        <
        h2 style = { styles.heading } > Create New Course < /h2>

        <
        form onSubmit = { handleSubmit }
        style = { styles.form } >
        <
        div style = { styles.formGroup } >
        <
        label htmlFor = "title"
        style = { styles.label } > Course Title < /label> <
        input type = "text"
        id = "title"
        name = "title"
        value = { courseData.title }
        onChange = { handleChange }
        style = { styles.input }
        placeholder = "Advanced React Development"
        required onFocus = {
            (e) => e.target.style = {...styles.input, ...styles.inputFocus } }
        onBlur = {
            (e) => e.target.style = styles.input }
        /> <
        /div>

        <
        div style = { styles.formGroup } >
        <
        label htmlFor = "description"
        style = { styles.label } > Course Description < /label> <
        textarea id = "description"
        name = "description"
        value = { courseData.description }
        onChange = { handleChange }
        style = {
            {...styles.input, ...styles.textarea } }
        placeholder = "Detailed description of what students will learn..."
        required onFocus = {
            (e) => e.target.style = {...styles.input, ...styles.textarea, ...styles.inputFocus } }
        onBlur = {
            (e) => e.target.style = {...styles.input, ...styles.textarea } }
        /> <
        /div>

        <
        div style = { styles.formGroup } >
        <
        label htmlFor = "image"
        style = { styles.label } > Cover Image URL < /label> <
        input type = "text"
        id = "image"
        name = "image"
        value = { courseData.image }
        onChange = { handleChange }
        style = { styles.input }
        placeholder = "https://example.com/image.jpg"
        onFocus = {
            (e) => e.target.style = {...styles.input, ...styles.inputFocus } }
        onBlur = {
            (e) => e.target.style = styles.input }
        /> {
            courseData.image && ( <
                div style = {
                    { marginTop: '0.5rem' } } >
                <
                p style = {
                    { fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' } } > Image Preview: < /p> <
                img src = { courseData.image }
                alt = "Preview"
                style = { styles.imagePreview }
                onError = {
                    (e) => e.target.style.display = 'none' }
                /> <
                /div>
            )
        } <
        /div>

        <
        div style = { styles.grid } >
        <
        div style = { styles.formGroup } >
        <
        label htmlFor = "duration"
        style = { styles.label } > Duration < /label> <
        input type = "text"
        id = "duration"
        name = "duration"
        value = { courseData.duration }
        onChange = { handleChange }
        style = { styles.input }
        placeholder = "e.g., 6 weeks, 30 hours"
        onFocus = {
            (e) => e.target.style = {...styles.input, ...styles.inputFocus } }
        onBlur = {
            (e) => e.target.style = styles.input }
        /> <
        /div>

        <
        div style = { styles.formGroup } >
        <
        label htmlFor = "level"
        style = { styles.label } > Difficulty Level < /label> <
        select id = "level"
        name = "level"
        value = { courseData.level }
        onChange = { handleChange }
        style = { styles.input }
        onFocus = {
            (e) => e.target.style = {...styles.input, ...styles.inputFocus } }
        onBlur = {
            (e) => e.target.style = styles.input } >
        <
        option value = "" > Select level < /option> <
        option value = "Beginner" > Beginner < /option> <
        option value = "Intermediate" > Intermediate < /option> <
        option value = "Advanced" > Advanced < /option> <
        /select> <
        /div> <
        /div>

        <
        div style = { styles.checkboxContainer } >
        <
        input type = "checkbox"
        id = "published"
        name = "published"
        checked = { courseData.published }
        onChange = { handleChange }
        style = { styles.checkbox }
        /> <
        label htmlFor = "published"
        style = {
            {...styles.label, marginBottom: 0 } } > Publish this course immediately < /label> <
        /div>

        <
        motion.button type = "submit"
        whileHover = {
            { scale: 1.02 } }
        whileTap = {
            { scale: 0.98 } }
        disabled = { isSubmitting }
        style = {
            {
                ...styles.button,
                    ...(isSubmitting ? styles.buttonDisabled : {})
            }
        } >
        {
            isSubmitting ? ( <
                span style = {
                    { display: 'flex', alignItems: 'center', justifyContent: 'center' } } >
                <
                svg style = { styles.spinner }
                xmlns = "http://www.w3.org/2000/svg"
                fill = "none"
                viewBox = "0 0 24 24"
                width = "16"
                height = "16" >
                <
                circle style = {
                    { opacity: '0.25' } }
                cx = "12"
                cy = "12"
                r = "10"
                stroke = "currentColor"
                strokeWidth = "4" > < /circle> <
                path style = {
                    { opacity: '0.75' } }
                fill = "currentColor"
                d = "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" > < /path> <
                /svg>
                Processing... <
                /span>
            ) : (
                'Create Course'
            )
        } <
        /motion.button> <
        /form> <
        /motion.div>
    );
};

export default CreateCourseForm;