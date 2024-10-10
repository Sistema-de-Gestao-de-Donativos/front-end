import React, { useState } from 'react';
import { useFormContext } from './FormContext';
import { useModalContext } from './ModalContext';
import Header from '../components/Header';
import '../styles/styleCadastraAbrigo.css'; // Import the CSS file

function CadastraAbrigoPage() {
    const { addSubmission, isDuplicateSubmission } = useFormContext();
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

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

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for duplicate entries using context
        if (isDuplicateSubmission(formData)) {
            showModal('Duplicate entry detected!');
        } else {
            addSubmission(formData); // Add the new submission
            showModal('Submission successful!');
        }

        // Clear the form data after submission
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
        });
    };

    // Handle modal close
    const handleClose = () => {
        hideModal();
    };

    return (
        <main>
            <Header />
            <h1>SGDRS</h1>
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
                        name="country"
                        value={formData.country}
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
                        name="state"
                        value={formData.state}
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
                        name="city"
                        value={formData.city}
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
                        name="neighborhood"
                        value={formData.neighborhood}
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
                        name="street"
                        value={formData.street}
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
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        required
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
                        <h2>{modalMessage === 'Submission successful!' ? 'Success' : 'Duplicate'}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default CadastraAbrigoPage;
