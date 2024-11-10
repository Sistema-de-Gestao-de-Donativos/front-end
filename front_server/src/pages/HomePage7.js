import React, { useState } from 'react';
import './views/cadastro.css';

function HomePage7() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupClass, setPopupClass] = useState('');
  
  const [userData, setUserData] = useState({
    name: '',
    address: {
      country: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
    },
    email: '',
    phone: '',
    cpf: '',
    codEntidade: '',  // Let the user input codEntidade
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to match the expected structure
    const dataToSend = {
      name: userData.name,
      address: {
        country: userData.address.country,
        state: userData.address.state,
        city: userData.address.city,
        neighborhood: userData.address.neighborhood,
        street: userData.address.street,
        number: userData.address.number,
      },
      email: userData.email,
      phone: userData.phone,
      role: 'voluntario',  // Always 'voluntario'
      codEntidade: userData.codEntidade,  // User-provided codEntidade
      cpf: userData.cpf,
    };
  
    // Log the data to ensure it's correct
    console.log('Data to be sent:', JSON.stringify(dataToSend));
  
    try {
      // Send the POST request with the structured data
      const response = await fetch('/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      // Check if the response is successful
      if (response.ok) {
        setPopupMessage('Usuário cadastrado com sucesso!');
        setPopupClass('modal modal-success');
        console.log('User created successfully');
      } else {
        const errorData = await response.json();  // Get the error details from the server
        setPopupMessage(`Erro ao cadastrar usuário: ${errorData.message || response.statusText}`);
        setPopupClass('modal modal-error');
        console.log('Error response:', errorData);
      }
      setPopupVisible(true);
  
    } catch (error) {
      // Catch network errors or other issues during the fetch request
      console.error('Error during fetch:', error);
      setPopupMessage('Erro ao conectar com o servidor.');
      setPopupClass('modal modal-error');
      setPopupVisible(true);
    }
  };
  

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="body">
      <h2 className="center-title">Cadastro de Usuário</h2>
      <div className="container">
        <div className="form-container">
          <form id="userForm" onSubmit={handleSubmit}>
            {/* Basic Info Section */}
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
                value={userData.name}
                onChange={handleChange}
                maxLength="50"
                required
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                maxLength="50"
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Telefone"
                value={userData.phone}
                onChange={handleChange}
                maxLength="15"
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="CPF"
                value={userData.cpf}
                onChange={handleChange}
                maxLength="11"
                required
              />
            </div>
            
            {/* CodEntidade Field */}
            <div className="input-container">
              <input
                type="text"
                id="codEntidade"
                name="codEntidade"
                placeholder="Código da Entidade"
                value={userData.codEntidade}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            {/* Address Section - Boxed Layout */}
            <div className="address-box">
              <h3>Endereço</h3>
              <div className="input-container">
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="País"
                  value={userData.address.country}
                  onChange={handleAddressChange}
                  maxLength="50"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Estado"
                  value={userData.address.state}
                  onChange={handleAddressChange}
                  maxLength="50"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Cidade"
                  value={userData.address.city}
                  onChange={handleAddressChange}
                  maxLength="50"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Bairro"
                  value={userData.address.neighborhood}
                  onChange={handleAddressChange}
                  maxLength="50"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Rua"
                  value={userData.address.street}
                  onChange={handleAddressChange}
                  maxLength="50"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text" // Changed from "number" to "text" for 'Número'
                  id="number"
                  name="number"
                  placeholder="Número"
                  value={userData.address.number}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <div className="button-container">
              <button type="button" className="back-button" onClick={() => window.location.href = 'index.html'}>
                Voltar
              </button>
              <button type="submit" className="register-button">Cadastrar</button>
            </div>
          </form>

          {/* Popup logic */}
          {popupVisible && (
            <div className={popupClass} style={{ display: 'block' }}>
              <div className="modal-content">
                <div className="header"></div>
                <span className="close" onClick={handleClosePopup}>&times;</span>
                <p>{popupMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {popupVisible && (
        <div className="modal-overlay" onClick={handleClosePopup}></div>
      )}
    </div>
  );
}

export default HomePage7;
