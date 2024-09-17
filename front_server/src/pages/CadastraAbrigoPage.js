import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/styleCadastraAbrigo.css'; // Import the CSS file

function CadastraAbrigoPage() {
    // State to store the form fields and submission status
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        phone: '',
        email: '',
        code: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState('');

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

        // Here you would typically send a POST request to an API
        // For this example, we'll just log the data and set a success message
        console.log('Form data submitted:', formData);
        
        // Clear the form and set submission status
        setFormData({
            name: '',
            country: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            phone: '',
            email: '',
            code: ''
        });
        setSubmissionStatus('Abrigo cadastrado com sucesso!');
        setShowPopup(true);

        // Hide the popup after 4 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 4000);
    };

    // Handle back button click
    const handleBackClick = () => {
        window.history.back(); // Navigate back to the previous page
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Número:</label>
                    <input
                        type="number"
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Código:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>

            {/* Popup for submission status */}
            {showPopup && (
                <div className="popup">
                    <p>{submissionStatus}</p>
                </div>
            )}

            {/* Back button */}
            <button className="back-button" onClick={handleBackClick}>Voltar</button>
        </main>
    );
}

export default CadastraAbrigoPage;
