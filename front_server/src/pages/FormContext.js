import React, { createContext, useState, useContext, useEffect } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
        setSubmissions(savedSubmissions);
    }, []);

    const isDuplicateSubmission = (newSubmission) => {
        return submissions.some(submission =>
            submission.name === newSubmission.name &&
            submission.country === newSubmission.country &&
            submission.state === newSubmission.state &&
            submission.city === newSubmission.city &&
            submission.neighborhood === newSubmission.neighborhood &&
            submission.street === newSubmission.street &&
            submission.number === newSubmission.number &&
            submission.phone === newSubmission.phone &&
            submission.email === newSubmission.email
        );
    };

    const addSubmission = (submission) => {
        if (isDuplicateSubmission(submission)) {
            return false; // Indicate that the submission is a duplicate
        }

        const newSubmissions = [...submissions, submission];
        setSubmissions(newSubmissions);
        localStorage.setItem('submissions', JSON.stringify(newSubmissions));
        return true; // Indicate successful addition
    };

    return (
        <FormContext.Provider value={{ submissions, addSubmission, isDuplicateSubmission }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
