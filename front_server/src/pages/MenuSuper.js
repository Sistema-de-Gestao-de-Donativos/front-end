import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './views/adminAbrigo.css';
import logo from './logo.png';

function HomePage6() {
  const generateReport = () => {
    alert("Relatório gerado!");
  };

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-container">
        <div className="row">
          <Link to="/menucadcd" className="menu-button">
            Cadastrar Centros de Distribuição
          </Link>
          <Link to="/home3" className="menu-button">
            Acessar Funções do Voluntário
          </Link>
        </div>
        <div className="row">
          <Link to="/home4" className="menu-button">
            Acessar Funções do Admin CD
          </Link>
          <Link to="/home5" className="menu-button">
            Acessar Funções do Admin do Abrigo
          </Link>
        </div>
        <div className="row">
          <Link to="#" className="menu-button">
            Tutorial do Sistema
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage6;
