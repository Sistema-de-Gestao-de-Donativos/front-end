import React, { useState } from 'react';
import { useFormContext } from './FormContext';
import { useModalContext } from './ModalContext';
import Header from '../components/Header';
import '../pages/views/cadastraAbrigo.css'; // Import the CSS file
import logo from '../components/logo.png'

function CadastraAbrigoPage() {
    const { addSubmission, isDuplicateSubmission } = useFormContext();
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        address: {
            city: '',
            country: '',
            neighborhood: '',
            number: '',
            state: '',
            street: '',
        },
        phone: '',
        email: ''
    });
    
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith('address.')) {
            // For nested address fields, extract the field name after 'address.'
            const field = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [field]: value
                }
            }));
        } else {
            // For top-level fields 
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    
    
    // Handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Check for duplicate entries using context
    //     if (isDuplicateSubmission(formData)) {
    //         showModal('Duplicate entry detected!');
    //     } else {
    //         addSubmission(formData); // Add the new submission
    //         showModal('Submission successful!');
    //     }

    //      // Clear the form data after submission
            // setFormData({
            //     name: '',
            //     address: {
            //         city: '',
            //         country: '',
            //         neighborhood: '',
            //         number: '',
            //         state: '',
            //         street: '',
            //     },
            //     phone: '',
            //     email: ''
            // });
    // }; 


    // Handle Submit usando metodo POST 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for duplicate entries using context
        if (isDuplicateSubmission(formData)) {
            showModal('Duplicate entry detected!');
            return;
        }

        try {
            // Sending POST request to the API endpoint
            const response = await fetch('http://localhost:8080/v1/abrigos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Convert form data to JSON
            });

            // Handle the response
            if (response.ok) {
                const result = await response.json();
                addSubmission(result); // Add the new submission to context
                showModal('Submission successful!'); // Show success modal
            } else {
                // Handle errors returned by the API
                const errorData = await response.json();
                showModal(`Error: ${errorData.error || 'Something went wrong!'}`);
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error('Error submitting form:', error);
            showModal('Network error or server is unavailable.');
        }

        // Clear the form data after submission
        setFormData({
            name: '',
            address: {
                city: '',
                country: '',
                neighborhood: '',
                number: '',
                state: '',
                street: '',
            },
            phone: '',
            email: ''
        });
    };

    // Handle modal close
    const handleClose = () => {
        hideModal();
    };

    return (
        <main>
            <Header />
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Cadastro de Abrigo</h2>

            {/* Form to register a new Abrigo */}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">País:</label>
                    <input
                        type="text"
                        id="country"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">Estado:</label>
                    <input
                        type="text"
                        id="state"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Cidade:</label>
                    <input
                        type="text"
                        id="city"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="neighborhood">Bairro:</label>
                    <input
                        type="text"
                        id="neighborhood"
                        name="address.neighborhood"
                        value={formData.address.neighborhood}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Rua:</label>
                    <input
                        type="text"
                        id="street"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Número:</label>
                    <input
                        type="text"
                        id="number"
                        name="address.number"
                        value={formData.address.number}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        maxLength={50}
                    />
                </div>
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>

            {/* Modal */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{modalMessage === 'Submission successful!' ? 'Success' : 'Error'}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default CadastraAbrigoPage;
