import React, { useState } from 'react';
import './views/doador.css';

function Doador() {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [donor, setDonor] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');

  // POST request
  const handleSubmit = async (event) => {
    event.preventDefault();

    const donorData = {
      name: name,
      document: document,
      email: email,
      phone: phone,
    };

    try {
      const response = await fetch('/v1/doador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        alert('Doador added successfully!');
        // Clear form after successful submission
        setName('');
        setDocument('');
        setEmail('');
        setPhone('');
      } else {
        alert('Error adding Doador');
      }
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  // GET request by email
  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/v1/doador/${searchEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDonor(data);
      } else {
        alert('No Doador found with this email');
        setDonor(null);
      }
    } catch (error) {
      console.error('Error fetching donor:', error);
    }
  };

  return (
    <main>
      <div id="main-container" className="container">
        <div id="menu-container" className="menu-container">
          <h2 id="register-title">Cadastrar Doador</h2>
          <form id="register-form" className="form-container" onSubmit={handleSubmit}>
            <div id="name-container" className="input-container">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div id="document-container" className="input-container">
              <label htmlFor="document">Documento</label>
              <input
                type="text"
                id="document"
                name="document"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
            </div>

            <div id="email-container" className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div id="phone-container" className="input-container">
              <label htmlFor="phone">Telefone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button id="register-button" type="submit" className="menu-button">Cadastrar Doador</button>
          </form>

          <h2 id="search-title">Consultar Doador</h2>
          <form id="search-form" className="form-container" onSubmit={handleSearch}>
            <div id="search-container" className="input-container">
              <label htmlFor="search-email">Email</label>
              <input
                type="email"
                id="search-email"
                name="search-email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                required
              />
            </div>

            <button id="search-button" type="submit" className="menu-button">Buscar Doador</button>
          </form>

          <div id="donor-info" className="results-container">
            {donor ? (
              <div className="donor-info">
                <h3 id="donor-details-title">Detalhes do Doador</h3>
                <p><strong>Nome:</strong> {donor.name}</p>
                <p><strong>Documento:</strong> {donor.document}</p>
                <p><strong>Email:</strong> {donor.email}</p>
                <p><strong>Telefone:</strong> {donor.phone}</p>
              </div>
            ) : (
              searchEmail && <p id="no-results" className="no-results">Nenhum doador encontrado com o email fornecido.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Doador;
