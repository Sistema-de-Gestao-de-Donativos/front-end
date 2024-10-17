import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useModalContext } from './ModalContext';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png'

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
            <div className='outer'>
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
            </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name">Nome do CD:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                maxLength="50"
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label>Address:</label>
                            <div className="address-group">
                                <div>
                                    <label htmlFor="country">Pais:</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        maxLength="50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state">Estado:</label>
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Selecione um Estado</option>
                                        {states.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="city">Cidade:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="neighborhood">Vizinhanca:</label>
                                    <input
                                        type="text"
                                        id="neighborhood"
                                        name="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="street">Rua:</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="number">Numero:</label>
                                    <input
                                        type="text"
                                        id="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        required
                                        maxLength="50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phone">Telefone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                maxLength="50"
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
                                maxLength="50"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button type="submit">Enviar</button>
                            <Link to={"/"}><button id='btn-home'>Voltar</button></Link> 
                        </div>
                        
                    </form>
                    
                </div>

                {/* Modals */}
                {isModalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{modalMessage === "Cadastro efetuado com sucesso!" ? "Successo" : "Erro"}</h2>
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
