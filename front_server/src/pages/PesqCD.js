import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';
import Header from '../components/Header';
import { useModalContext } from './ModalContext';

// Main component
const PesqCD = () => {
    const { submissions } = useFormContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle search button click
    const handleSearchClick = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const results = submissions.filter(submission => {
            return (
                submission.name.toLowerCase().includes(lowercasedQuery) ||
                submission.country.toLowerCase().includes(lowercasedQuery) ||
                submission.state.toLowerCase().includes(lowercasedQuery) ||
                submission.city.toLowerCase().includes(lowercasedQuery) ||
                submission.neighborhood.toLowerCase().includes(lowercasedQuery) ||
                submission.street.toLowerCase().includes(lowercasedQuery) ||
                submission.number.toLowerCase().includes(lowercasedQuery) ||
                submission.phone.toLowerCase().includes(lowercasedQuery) ||
                submission.email.toLowerCase().includes(lowercasedQuery)
            );
        });

        setFilteredSubmissions(results);

        if (results.length === 0) {
            showModal("No results found");
        } else {
            hideModal();
        }
    };

    // Handle key press event for the search input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            handleSearchClick();
        }
    };

    // Close modal
    const handleClose = () => {
        hideModal();
    };

    useEffect(() => {
        // Hide the modal if the search query is cleared
        if (searchQuery.length === 0) {
            hideModal();
        }
    }, [searchQuery, hideModal]);

    return (
        <div className="submissions-table">
            <Header />

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown} // Handle key press events
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>

            {/* Render table only if there are results */}
            {filteredSubmissions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Neighborhood</th>
                            <th>Street</th>
                            <th>Number</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((submission, index) => (
                            <tr key={index}>
                                <td>{submission.name}</td>
                                <td>{submission.country}</td>
                                <td>{submission.state}</td>
                                <td>{submission.city}</td>
                                <td>{submission.neighborhood}</td>
                                <td>{submission.street}</td>
                                <td>{submission.number}</td>
                                <td>{submission.phone}</td>
                                <td>{submission.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}

            {/* Modals */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{modalMessage === "Submission successful!" ? "Success" : "No results found"}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PesqCD;
