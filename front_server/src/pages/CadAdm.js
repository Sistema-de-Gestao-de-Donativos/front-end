import React, { useState } from 'react';
import './views/cadastroAdmin.css';

function HomePage8() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupClass, setPopupClass] = useState('');

  // State to hold form data
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
    role: '',
    codEntidade: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle address field changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      role: userData.role,
      codEntidade: userData.codEntidade,
      cpf: userData.cpf,
    };

    // Log the data for debugging
    console.log('Data to be sent:', JSON.stringify(dataToSend));

    try {
      const response = await fetch('/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setPopupMessage('Admin cadastrado com sucesso!');
        setPopupClass('modal modal-success');
        console.log('Admin created successfully');
      } else {
        const errorData = await response.json();
        setPopupMessage(`Erro ao cadastrar admin: ${errorData.message || response.statusText}`);
        setPopupClass('modal modal-error');
        console.log('Error response:', errorData);
      }
      setPopupVisible(true);
    } catch (error) {
      console.error('Error during fetch:', error);
      setPopupMessage('Erro ao conectar com o servidor.');
      setPopupClass('modal modal-error');
      setPopupVisible(true);
    }
  };

  // Handle popup close
  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="homepage8-body">
      <div className="body">
        <h2 className="center-title">Cadastro de Admin</h2>
        <div className="container">
          <div className="form-container">
            <form id="adminForm" onSubmit={handleSubmit}>
              {/* Name, Email, Phone, CPF, CodEntidade */}
              <div className="info-box">
                <h3>Info</h3>
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
                  required
                />
              </div>

              {/* Role Dropdown */}
              <div className="input-container">
                <label htmlFor="role">Função</label>
                <select
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="adminCd">Admin CD</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="adminAbrigo">Admin Abrigo</option>
                </select>
              </div>
              </div>
              {/* Address Section */}
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
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Número"
                    value={userData.address.number}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="button-container">
                <button
                  type="button"
                  className="back-button"
                  onClick={() => window.location.href = 'index.html'}
                >
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
    </div>
  );
}

export default HomePage8;
