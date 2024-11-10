import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useModalContext } from './ModalContext';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';

const CadastraCD = () => {
    
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: {
            country: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: ''
        }
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
        
        if (name in formData) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (name.includes('address')) {
            const [field] = name.split('.');
            const addressField = name.replace(`${field}.`, '');
            setFormData(prevData => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    [addressField]: value
                }
            }));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to match the required format
        const submissionData = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: {
                country: formData.address.country,
                state: formData.address.state,
                city: formData.address.city,
                neighborhood: formData.address.neighborhood,
                street: formData.address.street,
                number: parseInt(formData.address.number, 10) // Make sure number is an integer
            }
        };

        // POST request to the backend to create a new CD
        try {
            const response = await fetch('http://localhost:8081/v1/cds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                const responseData = await response.json();
                //console.log('CD created successfully:', responseData);
                showModal("Cadastro efetuado com sucesso!");
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    address: {
                        country: '',
                        state: '',
                        city: '',
                        neighborhood: '',
                        street: '',
                        number: ''
                    }
                });
            } else {
                const errorData = await response.json();
                showModal(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            showModal("Error submitting the form.");
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
                                    <label htmlFor="address.country">Pais:</label>
                                    <input
                                        type="text"
                                        id="address.country"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        maxLength="50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.state">Estado:</label>
                                    <select
                                        id="address.state"
                                        name="address.state"
                                        value={formData.address.state}
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
                                    <label htmlFor="address.city">Cidade:</label>
                                    <input
                                        type="text"
                                        id="address.city"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        required
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.neighborhood">Vizinhanca:</label>
                                    <input
                                        type="text"
                                        id="address.neighborhood"
                                        name="address.neighborhood"
                                        value={formData.address.neighborhood}
                                        onChange={handleChange}
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.street">Rua:</label>
                                    <input
                                        type="text"
                                        id="address.street"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleChange}
                                        required
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address.number">Numero:</label>
                                    <input
                                        type="text"
                                        id="address.number"
                                        name="address.number"
                                        value={formData.address.number}
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
                            <button type="submit" id='btn-send'>Enviar</button>
                            <Link to={"/"}><button id='btn-home'>Voltar</button></Link> 
                        </div>
                    </form>
                </div>

                {/* Modal */}
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
