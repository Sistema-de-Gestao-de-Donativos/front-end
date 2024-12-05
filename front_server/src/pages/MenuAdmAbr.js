import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './views/adminAbrigo.css';
import logo from './logo.png';

function HomePage5() {
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
          <Link to="/novopedido" className="menu-button">
            Criar Pedidos
          </Link>
          <button className="menu-button" onClick={generateReport}>
            Confirmar Recebimento
          </button>
        </div>
        <div className="row">
          <Link to="/pesqprod" className="menu-button">
            Consultar Pedidos
          </Link>
          <Link to="#" className="menu-button">
            Tutorial do Sistema
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage5;
