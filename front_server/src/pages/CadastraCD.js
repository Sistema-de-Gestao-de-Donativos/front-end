import React, { useState, useEffect } from 'react';

// Modal component
const Modal = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmation</h2>
                <p>Your form has been submitted successfully.</p>
                <button onClick={onConfirm}>OK</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const CadastraCD = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        phone: '',
        email: ''
    });

    // State for states dropdown
    const [states, setStates] = useState([]);

    // State for modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);

    // State for submissions list
    const [submissions, setSubmissions] = useState([]);

    // List of states
    const statesList = [
        "California", "Texas", "New York", "Florida", "Illinois", "Georgia"
        // Add more states as needed
    ];

    // Effect to populate states dropdown
    useEffect(() => {
        setStates(statesList);
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalVisible(true); // Show confirmation modal
    };

    // Confirm submission
    const handleConfirm = () => {
        setSubmissions(prevSubmissions => [...prevSubmissions, formData]);
        setIsModalVisible(false);
        setFormData({
            name: '',
            country: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            phone: '',
            email: ''
        }); // Reset form
    };

    // Close modal
    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div class='outer'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>Address:</label>
                        <div className="address-group">
                            <div>
                                <label htmlFor="country">Country:</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="state">State:</label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select a state</option>
                                    {states.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="neighborhood">Neighborhood:</label>
                                <input
                                    type="text"
                                    id="neighborhood"
                                    name="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="street">Street:</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="number">Number:</label>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

            {/* Modal */}
            <Modal
                isVisible={isModalVisible}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />

            {/* List of Submissions */}
            <div className="submissions-list">
                <h2>Submissions</h2>
                <ul>
                    {submissions.map((submission, index) => (
                        <li key={index}>
                            <div><strong>Name:</strong> {submission.name}</div>
                            <div><strong>Country:</strong> {submission.country}</div>
                            <div><strong>State:</strong> {submission.state}</div>
                            <div><strong>City:</strong> {submission.city}</div>
                            <div><strong>Neighborhood:</strong> {submission.neighborhood}</div>
                            <div><strong>Street:</strong> {submission.street}</div>
                            <div><strong>Number:</strong> {submission.number}</div>
                            <div><strong>Phone:</strong> {submission.phone}</div>
                            <div><strong>Email:</strong> {submission.email}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CadastraCD;
