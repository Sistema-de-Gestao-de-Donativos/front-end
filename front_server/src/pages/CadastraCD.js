import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useModalContext } from './ModalContext';
import Header from '../components/Header';

// Function to get the next ID from local storage
const getNextId = () => {
    let currentId = parseInt(localStorage.getItem('currentId'), 10);
    if (isNaN(currentId)) {
        currentId = 0; // Initialize if not present
    }
    const nextId = currentId + 1;
    localStorage.setItem('currentId', nextId); // Update the ID in local storage
    return nextId;
};

const CadastraCD = () => {
    const { addSubmission, isDuplicateSubmission } = useFormContext();
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // State for form fields
    const [formData, setFormData] = useState({
        cod: '', // Initialize codCD
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

    // List of states
    const statesList = [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
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
    
        const newCod = `${getNextId()}`; // Generate the new code
        console.log('New Cod:', newCod); // Log the new code
        const submissionData = { ...formData, cod: newCod }; // Use 'cod' instead of 'codCD'
    
        console.log('Submission Data:', submissionData); // Log submission data
    
        if (isDuplicateSubmission(submissionData)) {
            showModal("Duplicate submission detected.");
        } else {
            addSubmission(submissionData);
            showModal("Submission successful!");
            setFormData({
                cod: '',
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
        }
    };
    

    // Close modal
    const handleClose = () => {
        hideModal();
    };

    return (
        <div>
            <Header />
            <div className='outer'>
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

                {/* Modals */}
                {isModalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{modalMessage === "Submission successful!" ? "Success" : "Error"}</h2>
                            <p>{modalMessage}</p>
                            <button onClick={handleClose}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CadastraCD;
