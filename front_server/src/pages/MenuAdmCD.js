import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './views/adminCd.css';
import logo from './logo.png';

function HomePage4() {
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
          <Link to="#" className="menu-button">
            Consulta de Estoque
          </Link>
          <button className="menu-button" onClick={generateReport}>
            Gerar Relatório
          </button>
        </div>
        <div className="row">
          <Link to="/pesqprod" className="menu-button">
            Consultar Pedidos
          </Link>
          <Link to="#" className="menu-button">
            Editar Voluntários
          </Link>
        </div>
        <div className="row">
          <Link to="/cadadm" className="menu-button">
            Cadastrar Admin Abrigo
          </Link>
          <Link to="#" className="menu-button">
            Tutorial do Sistema
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage4;
