import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';
import Header from '../components/Header';
import { useModalContext } from './ModalContext';

// Main component
const PesqCD = () => {
    const { submissions } = useFormContext();
    const [codQuery, setCodQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // Handle search input change for cod
    const handleCodChange = (event) => {
        setCodQuery(event.target.value);
    };

    // Handle search input change for name
    const handleNameChange = (event) => {
        setNameQuery(event.target.value);
    };

    // Handle search button click
    const handleSearchClick = () => {
        const lowercasedCodQuery = codQuery.toLowerCase();
        const lowercasedNameQuery = nameQuery.toLowerCase();

        if (lowercasedCodQuery === '' && lowercasedNameQuery === '') {
            // If both fields are empty, display all submissions
            setFilteredSubmissions(submissions);
            hideModal();
        } else {
            const results = submissions.filter(submission => {
                const cod = submission.cod || ''; // Ensure cod is used correctly
                const name = submission.name || ''; // Ensure name is used correctly

                return (
                    (cod.toLowerCase().includes(lowercasedCodQuery) || lowercasedCodQuery === '') &&
                    (name.toLowerCase().includes(lowercasedNameQuery) || lowercasedNameQuery === '')
                );
            });

            setFilteredSubmissions(results);

            if (results.length === 0) {
                showModal("No results found");
            } else {
                hideModal();
            }
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
        // Hide the modal if both search queries are cleared
        if (codQuery.length === 0 && nameQuery.length === 0) {
            setFilteredSubmissions(submissions); // Show all submissions when queries are cleared
            hideModal();
        }
    }, [codQuery, nameQuery, submissions, hideModal]);

    return (
        <div className="submissions-table">
            <Header />

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by code..."
                    value={codQuery}
                    onChange={handleCodChange}
                    onKeyDown={handleKeyDown} // Handle key press events
                />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={nameQuery}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyDown} // Handle key press events
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>

            {/* Render table only if there are results */}
            {filteredSubmissions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
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
                                <td>{submission.cod || 'N/A'}</td> {/* Display the cod field */}
                                <td>{submission.name || 'N/A'}</td> {/* Display the name field */}
                                <td>{submission.country || 'N/A'}</td>
                                <td>{submission.state || 'N/A'}</td>
                                <td>{submission.city || 'N/A'}</td>
                                <td>{submission.neighborhood || 'N/A'}</td>
                                <td>{submission.street || 'N/A'}</td>
                                <td>{submission.number || 'N/A'}</td>
                                <td>{submission.phone || 'N/A'}</td>
                                <td>{submission.email || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No submissions found</p>
            )}

            {/* Modals */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{modalMessage === "No results found" ? "No results found" : "Success"}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PesqCD;
