import React, { useState } from 'react';
import './views/cadastro.css';

function HomePage7() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupClass, setPopupClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = document.getElementById('name').value.toLowerCase();

    if (userName === 'gabriel') {
      setPopupMessage('Usuário cadastrado com sucesso!');
      setPopupClass('modal modal-success');
      setPopupVisible(true);
    } else if (userName === 'petuco') {
      setPopupMessage('Erro ao cadastrar usuário!');
      setPopupClass('modal modal-error');
      setPopupVisible(true);
    } else {
      setPopupMessage('Usuário cadastrado com sucesso!');
      setPopupClass('modal modal-success');
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
            <div className="input-container">
              <input type="text" id="name" name="name" placeholder="Nome" maxlength="50" required />
            </div>
            <div className="input-container">
              <input type="email" id="email" name="email" placeholder="Email" maxlength="50" required />
            </div>
            <div className="input-container">
              <input type="password" id="password" name="password" placeholder="Senha" maxlength="50" required />
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

      {}
      {popupVisible && (
        <div className="modal-overlay" onClick={handleClosePopup}></div>
      )}
    </div>
  );
}

export default HomePage7;
